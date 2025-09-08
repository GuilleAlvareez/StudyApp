import os
import uuid
from fastapi import FastAPI
from google.adk import Runner
from google.adk.agents import LlmAgent, SequentialAgent 
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.artifacts.in_memory_artifact_service import InMemoryArtifactService
from google.genai import types
from pydantic import BaseModel
from google.adk.agents.invocation_context import InvocationContext

from dotenv import load_dotenv
load_dotenv()

# ==============================
#      DEFINICIÓN DE AGENTES
# ==============================

MarkdownValidatorAgent = LlmAgent(
    model='gemini-1.5-flash',
    name='markdown_validator',
    description='Valida y corrige un resumen en Markdown para que sea perfecto para PDF.',
    instruction='''
    Has recibido un borrador de resumen en Markdown. Tu tarea es validarlo, corregirlo y formatearlo para que sea un documento profesional listo para ser convertido a PDF.

    El borrador del resumen es el siguiente:
    {draft_summary}  # <-- 3. Lee la salida del agente anterior desde el estado

    REGLAS DE VALIDACIÓN Y FORMATEO PARA PDF:
    1.  **Título Principal (H1)**: Asegúrate de que el documento comience con un único título principal claro (usando `#`). Si no existe, créalo basándote en el contenido.
    2.  **Jerarquía de Encabezados**: Verifica que los niveles de encabezados sean lógicos (no saltar de `#` a `###`).
    3.  **Sintaxis Correcta**: Corrige cualquier error en la sintaxis de listas, tablas, enlaces `[texto](url)`, bloques de código ` ``` `, y citas `>`.
    4.  **Eliminar Texto Conversacional**: Elimina cualquier frase introductoria o de cierre como "Aquí está el resumen corregido:" o "Espero que esto ayude.".
    5.  **Salida Final**: Tu salida debe ser únicamente el documento Markdown final, limpio y bien estructurado.
    ''',
)

SummarizerAgent = LlmAgent(
  model = 'gemini-1.5-flash',
  name = 'summarizer_agent',
  description = 'Resume textos largos en formato Markdown.',
  instruction= '''
    Tu única tarea es resumir el texto que recibas como entrada.
    
    REGLAS PARA EL RESUMEN:
    - El resumen debe estar en formato Markdown.
    - Debes preservar la estructura de los encabezados principales (H1, H2).
    - No elimines información crítica como tablas de datos o bloques de código esenciales.
    - El resumen debe tener entre el 40% y el 80% de la longitud del texto original.
    - La salida debe ser únicamente el texto del resumen, sin añadir comentarios conversacionales como "Aquí tienes tu resumen:".
    ''',
    output_key='draft_summary',
)

summarization_pipeline_agent = SequentialAgent(
    name='summarization_pipeline',
    # <-- 2. Esta descripción es CRUCIAL. El root_agent la usará para decidir si debe delegar aquí.
    description='Realiza un resumen de alta calidad de un documento Markdown y lo valida para su conversión a PDF.',
    sub_agents=[
        SummarizerAgent,
        MarkdownValidatorAgent
    ]
)

root_agent = LlmAgent(
  model = 'gemini-1.5-flash',
  name = 'root_agent',
  description = 'Eres el agente principal, tu objetivo es coordinar y delegar las tareas en los otros agentes',
  instruction= '''
    Eres el agente coordinador principal. Tu trabajo es analizar la petición del usuario y delegarla al sub-agente más apropiado.
    
    Tienes los siguientes sub-agentes a tu disposición:
    - **summarization_pipeline**: Úsalo cuando el usuario pida resumir un documento.
    - **billing_agent**: Úsalo cuando el usuario tenga preguntas sobre facturación o pagos.

    Analiza la intención del usuario y transfiere la tarea al agente correcto.
    ''',
  sub_agents = [summarization_pipeline_agent],
)

session_service = InMemorySessionService()
artifact_service = InMemoryArtifactService()

runner = Runner(
   app_name = "StudyApp",
   agent = root_agent,
   session_service = session_service,
   artifact_service = artifact_service,
)

# =====================
#      ENDOPOINT
# =====================
app = FastAPI()

# Define el formato de los datos de entrada (JSON)
class TextInput(BaseModel):
    text: str

# Define el formato de los datos de salida (JSON)
class TextOutput(BaseModel):
    summary: str

@app.post("/agent")
async def agent_endpoint(data: TextInput):
  user_id = os.environ.get('GOOGLE_API_KEY')
  session_id = str(uuid.uuid4())
  
  session = await session_service.create_session(
      app_name="StudyApp", user_id=user_id, session_id=session_id
  )

  # 2. Prepara el mensaje del usuario en el formato que el Runner espera.
  user_message = types.Content(
      role="user", parts=[types.Part.from_text(text=data.text)]
  )

  summary_result = ""
  
  # 3. Ejecuta el agente a través del Runner.
  # El Runner maneja la creación del InvocationContext y el flujo de ejecución.
  async for event in runner.run_async(
      user_id=user_id,
      session_id=session.id,
      new_message=user_message,
  ):
      # 4. Procesa los eventos para construir la respuesta final.
      # Un 'Event' puede contener texto, llamadas a herramientas, etc.
      if event.content and event.content.parts:
          # Concatena las partes de texto de la respuesta del agente.
          for part in event.content.parts:
              if part.text:
                  summary_result += part.text

  return {"summary": summary_result}

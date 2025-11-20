'use client';

export default function PoliticaCookies() {
  return (
    <div className="w-full bg-white">
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Política de Cookies
            </h1>
            <p className="text-slate-600 mb-8">
              Última actualización: 20 de noviembre de 2025
            </p>

            <div className="space-y-8 text-slate-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. ¿Qué son las Cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
                  Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para 
                  proporcionar información a los propietarios del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. ¿Cómo Usamos las Cookies?</h2>
                <p>
                  En StudyApp utilizamos cookies para mejorar tu experiencia de usuario, analizar el tráfico del sitio web 
                  y personalizar el contenido. Las cookies nos ayudan a entender cómo interactúas con nuestro sitio y a 
                  mejorar nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      🔧 Cookies Estrictamente Necesarias
                    </h3>
                    <p className="mb-2">
                      Estas cookies son esenciales para que puedas navegar por el sitio web y utilizar sus funciones. 
                      Sin estas cookies, los servicios que has solicitado no pueden proporcionarse.
                    </p>
                    <p className="text-sm text-slate-600 mt-3">
                      <strong>Ejemplos:</strong> Cookies de sesión, cookies de seguridad, cookies de preferencias de usuario.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Duración:</strong> Sesión o hasta 1 año
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      📊 Cookies Analíticas
                    </h3>
                    <p className="mb-2">
                      Estas cookies nos permiten reconocer y contar el número de visitantes y ver cómo se mueven los 
                      visitantes por nuestro sitio web. Esto nos ayuda a mejorar la forma en que funciona nuestro sitio web.
                    </p>
                    <p className="text-sm text-slate-600 mt-3">
                      <strong>Proveedores:</strong> Google Analytics
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Información recopilada:</strong> Páginas visitadas, tiempo en el sitio, fuente de tráfico, 
                      dispositivo utilizado.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Duración:</strong> Hasta 2 años
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      🎯 Cookies de Funcionalidad
                    </h3>
                    <p className="mb-2">
                      Estas cookies permiten que el sitio web recuerde las elecciones que haces (como tu nombre de usuario, 
                      idioma o la región en la que te encuentras) y proporcionan características mejoradas y más personales.
                    </p>
                    <p className="text-sm text-slate-600 mt-3">
                      <strong>Ejemplos:</strong> Preferencias de idioma, configuración de visualización, recordar inicio de sesión.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Duración:</strong> Hasta 1 año
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      📢 Cookies de Publicidad (si aplica)
                    </h3>
                    <p className="mb-2">
                      Estas cookies se utilizan para hacer que los mensajes publicitarios sean más relevantes para ti. 
                      Realizan funciones como evitar que el mismo anuncio reaparezca continuamente y garantizar que los 
                      anuncios se muestren correctamente.
                    </p>
                    <p className="text-sm text-slate-600 mt-3">
                      <strong>Nota:</strong> Actualmente, StudyApp no utiliza cookies de publicidad de terceros.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cookies de Terceros</h2>
                <p className="mb-4">
                  Utilizamos servicios de terceros que pueden establecer cookies en tu dispositivo cuando visitas nuestro sitio:
                </p>
                
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Google Analytics</h3>
                  <p className="text-sm mb-2">
                    Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Google Analytics genera 
                    información estadística y de otro tipo mediante cookies almacenadas en los ordenadores de los usuarios.
                  </p>
                  <p className="text-sm">
                    <strong>Más información:</strong>{' '}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 underline"
                    >
                      Política de Privacidad de Google
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cómo Gestionar las Cookies</h2>
                <p className="mb-4">
                  Tienes el derecho y la capacidad de aceptar o rechazar las cookies. Puedes gestionar tus preferencias de 
                  cookies de las siguientes maneras:
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.1 Banner de Cookies</h3>
                <p className="mb-4">
                  Cuando visitas nuestro sitio por primera vez, se te presenta un banner de cookies que te permite aceptar 
                  o rechazar el uso de cookies no esenciales.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.2 Configuración del Navegador</h3>
                <p className="mb-3">
                  La mayoría de los navegadores web permiten cierto control de la mayoría de las cookies a través de la 
                  configuración del navegador. Para obtener más información sobre las cookies, incluyendo cómo ver qué 
                  cookies se han establecido y cómo gestionarlas y eliminarlas, visita:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                      Safari
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                      Microsoft Edge
                    </a>
                  </li>
                </ul>

                <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-sm text-slate-700">
                    <strong>⚠️ Importante:</strong> Ten en cuenta que bloquear todas las cookies puede afectar negativamente 
                    a la funcionalidad de muchos sitios web, incluido el nuestro. Si bloqueas las cookies, es posible que 
                    no puedas utilizar todas las funciones de nuestro sitio web.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Consentimiento</h2>
                <p>
                  Al utilizar nuestro sitio web y aceptar nuestro banner de cookies, consientes el uso de cookies de acuerdo 
                  con esta Política de Cookies. Si no aceptas el uso de estas cookies, debes desactivarlas siguiendo las 
                  instrucciones de esta Política de Cookies o no utilizar nuestro sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Actualizaciones de esta Política</h2>
                <p>
                  Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en las cookies que 
                  utilizamos o por otras razones operativas, legales o reglamentarias. Por favor, vuelve a visitar esta 
                  Política de Cookies regularmente para mantenerte informado sobre nuestro uso de cookies.
                </p>
              </section>

              {/* <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Más Información</h2>
                <p>
                  Si tienes alguna pregunta sobre nuestra Política de Cookies o sobre cómo utilizamos las cookies, 
                  no dudes en contactarnos:
                </p>
                <p className="mt-3 font-semibold">
                  Email: cookies@studyapp.com
                </p>
                <p className="mt-4">
                  Para más información sobre cómo protegemos tu privacidad, consulta nuestra{' '}
                  <a href="/politica-privacidad" className="text-indigo-600 hover:text-indigo-800 underline">
                    Política de Privacidad
                  </a>.
                </p>
              </section> */}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <a 
                href="/" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
              >
                ← Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

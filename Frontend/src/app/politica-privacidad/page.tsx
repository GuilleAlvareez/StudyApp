'use client';
import Link from 'next/link';

export default function PoliticaPrivacidad() {
  return (
    <div className="w-full bg-white">
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-slate-600 mb-8">
              Última actualización: 20 de noviembre de 2025
            </p>

            <div className="space-y-8 text-slate-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introducción</h2>
                <p>
                  En StudyApp, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad 
                  describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Información que Recopilamos</h2>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">2.1 Información que nos proporcionas</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Documentos que subes para procesar (PDFs, archivos de texto)</li>
                  <li>Preferencias de usuario y configuraciones</li>
                  <li>Información de contacto si decides proporcionarla</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">2.2 Información recopilada automáticamente</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Datos de uso de la aplicación (páginas visitadas, funciones utilizadas)</li>
                  <li>Información del dispositivo (tipo de navegador, sistema operativo)</li>
                  <li>Dirección IP y datos de ubicación aproximada</li>
                  <li>Cookies y tecnologías similares</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Cómo Usamos tu Información</h2>
                <p className="mb-3">Utilizamos la información recopilada para:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Proporcionar y mejorar nuestros servicios de IA</li>
                  <li>Procesar tus documentos y generar resúmenes y notas</li>
                  <li>Personalizar tu experiencia de usuario</li>
                  <li>Analizar el uso de la plataforma y mejorar nuestras funcionalidades</li>
                  <li>Comunicarnos contigo sobre actualizaciones y nuevas características</li>
                  <li>Garantizar la seguridad y prevenir fraudes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Compartir Información</h2>
                <p>
                  No vendemos tu información personal a terceros. Podemos compartir información en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Con proveedores de servicios que nos ayudan a operar la plataforma (servicios de IA, hosting)</li>
                  <li>Cuando sea requerido por ley o para proteger nuestros derechos legales</li>
                  <li>Con tu consentimiento explícito</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Seguridad de los Datos</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra 
                  acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Cifrado de datos en tránsito y en reposo</li>
                  <li>Controles de acceso estrictos</li>
                  <li>Auditorías de seguridad regulares</li>
                  <li>Eliminación automática de documentos procesados después de un período determinado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Tus Derechos</h2>
                <p className="mb-3">Tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceder a tu información personal</li>
                  <li>Rectificar datos inexactos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                  <li>Solicitar la portabilidad de tus datos</li>
                  <li>Retirar tu consentimiento en cualquier momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies</h2>
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Puedes gestionar tus preferencias 
                  de cookies a través del banner de cookies que aparece en tu primera visita. Para más información, 
                  consulta nuestra <Link href="/politica-cookies" className="text-indigo-600 hover:text-indigo-800 underline">Política de Cookies</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Retención de Datos</h2>
                <p>
                  Conservamos tu información personal solo durante el tiempo necesario para cumplir con los propósitos 
                  descritos en esta política, a menos que la ley requiera o permita un período de retención más largo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Cambios a esta Política</h2>
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos sobre cambios significativos 
                  publicando la nueva política en esta página y actualizando la fecha de &quot;Última actualización&quot;.
                </p>
              </section>

              {/* <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contacto</h2>
                <p>
                  Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu información personal, 
                  puedes contactarnos en:
                </p>
                <p className="mt-3 font-semibold">
                  Email: privacy@studyapp.com
                </p>
              </section> */}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link 
                href="/" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

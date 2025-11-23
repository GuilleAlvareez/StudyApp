'use client';
import Link from 'next/link';

export default function AvisoLegal() {
  return (
    <div className="w-full bg-white">
      
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Aviso Legal
            </h1>
            <p className="text-slate-600 mb-8">
              Última actualización: 20 de noviembre de 2025
            </p>

            <div className="space-y-8 text-slate-700 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Información General</h2>
                <p>
                  En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de 
                  Comercio Electrónico (LSSI-CE), se informa a los usuarios de los datos identificativos del titular de este sitio web:
                </p>
                <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                  <p><strong>Denominación social:</strong> StudyApp</p>
                  <p><strong>Sitio web:</strong> studyapp.com</p>
                  <p><strong>Email de contacto:</strong> info@studyapp.com</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Objeto</h2>
                <p>
                  El presente aviso legal regula el uso del sitio web StudyApp (en adelante, &quot;el sitio web&quot;), del que es 
                  titular StudyApp. La navegación por el sitio web atribuye la condición de usuario del mismo e implica la 
                  aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Condiciones de Uso</h2>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">3.1 Uso del Servicio</h3>
                <p>
                  El usuario se compromete a utilizar el sitio web y los servicios de conformidad con la ley, el presente 
                  Aviso Legal, y las buenas costumbres. El usuario se obliga a no utilizar el sitio web con fines ilícitos 
                  o lesivos contra StudyApp o terceros.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">3.2 Contenido Prohibido</h3>
                <p className="mb-3">Queda expresamente prohibido:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Subir contenido ilegal, ofensivo, difamatorio o que viole derechos de terceros</li>
                  <li>Intentar acceder a áreas restringidas del sistema</li>
                  <li>Realizar ingeniería inversa o intentar descifrar el código fuente</li>
                  <li>Usar el servicio para distribuir malware o realizar ataques informáticos</li>
                  <li>Sobrecargar intencionalmente los servidores</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Propiedad Intelectual e Industrial</h2>
                <p>
                  Todos los contenidos del sitio web, incluyendo pero no limitándose a textos, fotografías, gráficos, 
                  imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una 
                  obra cuya propiedad pertenece a StudyApp, sin que puedan entenderse cedidos al usuario ninguno de los 
                  derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso del sitio web.
                </p>
                <p className="mt-3">
                  El usuario puede visualizar todos los elementos, imprimirlos, copiarlos y almacenarlos en el disco duro 
                  de su ordenador o en cualquier otro soporte físico siempre y cuando sea, única y exclusivamente, para su 
                  uso personal. El usuario debe abstenerse de suprimir, alterar, eludir o manipular cualquier dispositivo 
                  de protección o sistema de seguridad que estuviera instalado en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Exclusión de Garantías y Responsabilidad</h2>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">5.1 Disponibilidad del Servicio</h3>
                <p>
                  StudyApp no garantiza la disponibilidad y continuidad del funcionamiento del sitio web y de los servicios. 
                  Cuando ello sea razonablemente posible, StudyApp advertirá previamente las interrupciones en el funcionamiento 
                  del sitio web.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">5.2 Exactitud de la Información</h3>
                <p>
                  StudyApp no se hace responsable de la exactitud, veracidad, exhaustividad y/o actualidad de los contenidos 
                  generados por la inteligencia artificial. Los resúmenes y notas generados son herramientas de apoyo al estudio 
                  y no sustituyen la lectura completa de los materiales originales.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-4">5.3 Contenido del Usuario</h3>
                <p>
                  StudyApp no se hace responsable del contenido de los documentos que los usuarios suban a la plataforma. 
                  El usuario es el único responsable de asegurarse de que tiene los derechos necesarios para procesar dichos documentos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Enlaces</h2>
                <p>
                  El sitio web puede contener enlaces a otros sitios web. StudyApp no ejerce ningún tipo de control sobre 
                  dichos sitios y contenidos. En ningún caso StudyApp asumirá responsabilidad alguna por los contenidos de 
                  algún enlace perteneciente a un sitio web ajeno.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Protección de Datos</h2>
                <p>
                  Para más información sobre cómo tratamos tus datos personales, consulta nuestra{' '}
                  <Link href="/politica-privacidad" className="text-indigo-600 hover:text-indigo-800 underline">
                    Política de Privacidad
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Modificaciones</h2>
                <p>
                  StudyApp se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en 
                  su sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través 
                  de la misma como la forma en la que éstos aparezcan presentados o localizados.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Legislación Aplicable y Jurisdicción</h2>
                <p>
                  La relación entre StudyApp y el usuario se regirá por la normativa española vigente. Para la resolución de 
                  todas las controversias o cuestiones relacionadas con el presente sitio web o de las actividades en él 
                  desarrolladas, será de aplicación la legislación española, sometiéndose las partes a los Juzgados y Tribunales 
                  que correspondan conforme a derecho.
                </p>
              </section>

              {/* <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Contacto</h2>
                <p>
                  Para cualquier consulta relacionada con este Aviso Legal, puedes contactarnos en:
                </p>
                <p className="mt-3 font-semibold">
                  Email: legal@studyapp.com
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

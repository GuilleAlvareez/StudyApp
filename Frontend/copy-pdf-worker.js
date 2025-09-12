/* eslint-disable @typescript-eslint/no-require-imports */
// Frontend/copy-pdf-worker.js (CORREGIDO)
const fs = require('fs');
const path = require('path');

try {
  // Encuentra la ruta al paquete 'pdfjs-dist'
  const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
  
  // Construye la ruta completa al archivo del worker
  const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.min.js');
  
  // Define la carpeta 'public' de destino
  const publicDirPath = path.join(__dirname, 'public');

  // Asegúrate de que la carpeta 'public' exista
  if (!fs.existsSync(publicDirPath)) {
    fs.mkdirSync(publicDirPath, { recursive: true });
  }

  // Copia el archivo
  fs.copyFileSync(pdfWorkerPath, path.join(publicDirPath, 'pdf.worker.min.js'));

  console.log('✅ PDF.js worker file copied successfully to public directory.');

} catch (error) {
  console.error('❌ Error copying PDF.js worker file:', error);
  console.error("Please ensure you have run 'npm install pdfjs-dist' first.");
}
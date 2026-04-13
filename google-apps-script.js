// ============================================================
// INSTRUCCIONES PARA CONECTAR CON TU GOOGLE SHEET
// ============================================================
//
// 1. Abre tu Google Sheet de lista de invitados
//
// 2. Ve a: Extensiones > Apps Script
//
// 3. Borra todo el codigo que aparece y pega TODO este archivo
//
// 4. Cambia el nombre de la hoja en la linea "NOMBRE_HOJA"
//    si tu hoja no se llama "Hoja 1"
//
// 5. Haz clic en "Implementar" > "Nueva implementacion"
//    - Tipo: "Aplicacion web"
//    - Ejecutar como: "Yo"
//    - Quien tiene acceso: "Cualquier persona"
//    - Clic en "Implementar"
//
// 6. Copia la URL que te da (algo como:
//    https://script.google.com/macros/s/XXXXX/exec)
//
// 7. Pega esa URL en el index.html donde dice:
//    const GOOGLE_SCRIPT_URL = '';
//
// ============================================================

const NOMBRE_HOJA = 'Hoja 1'; // <-- Cambia si tu hoja tiene otro nombre

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);
    const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRE_HOJA);

    // Agrega una fila nueva con los datos del formulario
    hoja.appendRow([
      datos.fecha,        // Columna A: Fecha de respuesta
      datos.nombre,       // Columna B: Nombre
      datos.asistencia,   // Columna C: Asistencia (Si/No)
      datos.mensaje       // Columna D: Mensaje
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Esta funcion es necesaria para que funcione el CORS
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'activo' }))
    .setMimeType(ContentService.MimeType.JSON);
}

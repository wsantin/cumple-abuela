/**
 * Google Apps Script para Cumpleaños de MIMI - Organizador Familiar
 *
 * Este script provee una API REST para gestionar datos del organizador
 * de cumpleaños almacenados en Google Sheets.
 *
 * INSTRUCCIONES DE DEPLOY:
 * 1. Crear Google Sheet con 3 tabs: "Families", "Members", "Family_Data"
 * 2. Copiar este código en Tools > Apps Script
 * 3. Deploy > New deployment > Web app
 * 4. Execute as: "Me"
 * 5. Who has access: "Anyone"
 * 6. Copiar Web App URL y usarla en index.html
 */

// ==================== ENDPOINTS ====================

/**
 * GET endpoint - Lee datos del sheet
 * @param {Object} e - Event object con parámetros query
 * @returns {TextOutput} JSON con datos
 */
function doGet(e) {
  const action = e.parameter.action || 'getAll';

  try {
    if (action === 'getAll') {
      const data = getAllData();
      return createJsonResponse(data);
    }

    return createJsonResponse({ error: 'Unknown action' });
  } catch (error) {
    return createJsonResponse({ error: error.toString() });
  }
}

/**
 * POST endpoint - Escribe datos al sheet
 * @param {Object} e - Event object con payload en body
 * @returns {TextOutput} JSON con resultado
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;

    switch(action) {
      case 'saveAll':
        saveAllData(payload.families, payload.data);
        return createJsonResponse({ success: true, message: 'Data saved successfully' });

      case 'saveFamily':
        saveSingleFamily(payload.family);
        return createJsonResponse({ success: true, message: 'Family saved' });

      case 'saveData':
        saveFamilyData(payload.familyId, payload.data);
        return createJsonResponse({ success: true, message: 'Family data saved' });

      default:
        return createJsonResponse({ error: 'Unknown action: ' + action });
    }
  } catch (error) {
    return createJsonResponse({ error: error.toString() });
  }
}

/**
 * Crea respuesta JSON con headers CORS
 * @param {Object} data - Datos a retornar
 * @returns {TextOutput} Response formateada
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== LECTURA DE DATOS ====================

/**
 * Lee todos los datos del sheet y los combina en estructura JSON
 * @returns {Object} {families: Array, data: Object}
 */
function getAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Leer Families
  const families = readFamilies(ss);

  // Leer Members agrupados por familia
  const membersByFamily = readMembers(ss);

  // Leer Family Data
  const familyData = readFamilyData(ss, membersByFamily);

  // Asegurar que todas las familias tengan entrada en data
  families.forEach(f => {
    if (!familyData[f.id]) {
      familyData[f.id] = {
        members: [],
        contributions: {},
        confirmed: false,
        notes: ''
      };
    }
  });

  return {
    families: families,
    data: familyData
  };
}

/**
 * Lee tab "Families"
 * @param {Spreadsheet} ss - Spreadsheet object
 * @returns {Array} Array de objetos familia
 */
function readFamilies(ss) {
  const sheet = ss.getSheetByName('Families');
  if (!sheet) {
    Logger.log('Warning: "Families" tab not found');
    return [];
  }

  const data = sheet.getDataRange().getValues();

  // Saltar header (fila 1) y mapear
  return data.slice(1)
    .filter(row => row[0]) // Filtrar filas vacías
    .map(row => ({
      id: String(row[0]),
      name: String(row[1]),
      color: String(row[2]),
      emoji: String(row[3])
    }));
}

/**
 * Lee tab "Members" y agrupa por family_id
 * @param {Spreadsheet} ss - Spreadsheet object
 * @returns {Object} Object con arrays de members por family_id
 */
function readMembers(ss) {
  const sheet = ss.getSheetByName('Members');
  if (!sheet) {
    Logger.log('Warning: "Members" tab not found');
    return {};
  }

  const data = sheet.getDataRange().getValues();
  const membersByFamily = {};

  // Saltar header (fila 1)
  data.slice(1).forEach(row => {
    const familyId = String(row[0]);
    if (!familyId) return; // Skip filas vacías

    if (!membersByFamily[familyId]) {
      membersByFamily[familyId] = [];
    }

    membersByFamily[familyId].push({
      id: String(row[1]),
      name: String(row[2])
    });
  });

  return membersByFamily;
}

/**
 * Lee tab "Family_Data"
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} membersByFamily - Members agrupados por familia
 * @returns {Object} Object con data por family_id
 */
function readFamilyData(ss, membersByFamily) {
  const sheet = ss.getSheetByName('Family_Data');
  if (!sheet) {
    Logger.log('Warning: "Family_Data" tab not found');
    return {};
  }

  const data = sheet.getDataRange().getValues();
  const familyData = {};

  // Saltar header (fila 1)
  data.slice(1).forEach(row => {
    const familyId = String(row[0]);
    if (!familyId) return; // Skip filas vacías

    familyData[familyId] = {
      members: membersByFamily[familyId] || [],
      contributions: {
        money: row[1] !== '' ? String(row[1]) : '',
        food: row[2] !== '' ? String(row[2]) : '',
        drinks: row[3] !== '' ? String(row[3]) : '',
        snacks: row[4] !== '' ? String(row[4]) : '',
        dessert: row[5] !== '' ? String(row[5]) : '',
        decoration: row[6] !== '' ? String(row[6]) : '',
        transport: row[7] !== '' ? String(row[7]) : '',
        other: row[8] !== '' ? String(row[8]) : ''
      },
      confirmed: row[9] === true || row[9] === 'TRUE' || row[9] === true,
      notes: row[10] !== '' ? String(row[10]) : ''
    };
  });

  return familyData;
}

// ==================== ESCRITURA DE DATOS ====================

/**
 * Guarda todos los datos (families y data) en el sheet
 * @param {Array} families - Array de objetos familia
 * @param {Object} data - Object con data por family_id
 */
function saveAllData(families, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Guardar Families
  writeFamilies(ss, families);

  // Guardar Members
  writeMembers(ss, data);

  // Guardar Family Data
  writeFamilyData(ss, data);

  Logger.log('All data saved successfully');
}

/**
 * Escribe tab "Families"
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Array} families - Array de objetos familia
 */
function writeFamilies(ss, families) {
  let sheet = ss.getSheetByName('Families');

  // Crear tab si no existe
  if (!sheet) {
    sheet = ss.insertSheet('Families');
  }

  // Limpiar contenido
  sheet.clear();

  // Escribir header
  sheet.appendRow(['id', 'name', 'color', 'emoji']);

  // Escribir datos
  families.forEach(f => {
    sheet.appendRow([f.id, f.name, f.color, f.emoji]);
  });

  Logger.log('Families written: ' + families.length);
}

/**
 * Escribe tab "Members"
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} data - Object con data (incluye members)
 */
function writeMembers(ss, data) {
  let sheet = ss.getSheetByName('Members');

  // Crear tab si no existe
  if (!sheet) {
    sheet = ss.insertSheet('Members');
  }

  // Limpiar contenido
  sheet.clear();

  // Escribir header
  sheet.appendRow(['family_id', 'member_id', 'member_name']);

  // Escribir datos - expandir members de cada familia
  let memberCount = 0;
  Object.keys(data).forEach(familyId => {
    const family = data[familyId];
    if (family.members && family.members.length > 0) {
      family.members.forEach(m => {
        sheet.appendRow([familyId, m.id, m.name]);
        memberCount++;
      });
    }
  });

  Logger.log('Members written: ' + memberCount);
}

/**
 * Escribe tab "Family_Data"
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {Object} data - Object con data por family_id
 */
function writeFamilyData(ss, data) {
  let sheet = ss.getSheetByName('Family_Data');

  // Crear tab si no existe
  if (!sheet) {
    sheet = ss.insertSheet('Family_Data');
  }

  // Limpiar contenido
  sheet.clear();

  // Escribir header
  sheet.appendRow([
    'family_id', 'money', 'food', 'drinks', 'snacks',
    'dessert', 'decoration', 'transport', 'other',
    'confirmed', 'notes'
  ]);

  // Escribir datos
  let familyCount = 0;
  Object.keys(data).forEach(familyId => {
    const family = data[familyId];
    const contribs = family.contributions || {};

    sheet.appendRow([
      familyId,
      contribs.money || '',
      contribs.food || '',
      contribs.drinks || '',
      contribs.snacks || '',
      contribs.dessert || '',
      contribs.decoration || '',
      contribs.transport || '',
      contribs.other || '',
      family.confirmed || false,
      family.notes || ''
    ]);
    familyCount++;
  });

  Logger.log('Family data written: ' + familyCount);
}

// ==================== FUNCIONES INCREMENTALES ====================

/**
 * Guarda o actualiza una sola familia
 * @param {Object} family - Objeto familia {id, name, color, emoji}
 */
function saveSingleFamily(family) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Families');

  if (!sheet) {
    sheet = ss.insertSheet('Families');
    sheet.appendRow(['id', 'name', 'color', 'emoji']);
  }

  const data = sheet.getDataRange().getValues();

  // Buscar fila existente
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === family.id) {
      rowIndex = i + 1; // +1 porque getRange usa índice 1-based
      break;
    }
  }

  // Actualizar o agregar
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, 4).setValues([[
      family.id, family.name, family.color, family.emoji
    ]]);
    Logger.log('Family updated: ' + family.id);
  } else {
    sheet.appendRow([family.id, family.name, family.color, family.emoji]);
    Logger.log('Family added: ' + family.id);
  }
}

/**
 * Guarda datos de una familia específica (members + contributions + notes)
 * @param {String} familyId - ID de la familia
 * @param {Object} familyData - Data de la familia {members, contributions, confirmed, notes}
 */
function saveFamilyData(familyId, familyData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Actualizar Members
  updateMembers(ss, familyId, familyData.members || []);

  // Actualizar Family Data
  updateFamilyDataRow(ss, familyId, familyData);

  Logger.log('Family data saved for: ' + familyId);
}

/**
 * Actualiza members de una familia específica
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {String} familyId - ID de la familia
 * @param {Array} members - Array de members
 */
function updateMembers(ss, familyId, members) {
  let sheet = ss.getSheetByName('Members');

  if (!sheet) {
    sheet = ss.insertSheet('Members');
    sheet.appendRow(['family_id', 'member_id', 'member_name']);
  }

  const data = sheet.getDataRange().getValues();

  // Eliminar members existentes de esta familia
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === familyId) {
      sheet.deleteRow(i + 1);
    }
  }

  // Agregar nuevos members
  members.forEach(m => {
    sheet.appendRow([familyId, m.id, m.name]);
  });
}

/**
 * Actualiza fila de Family_Data para una familia
 * @param {Spreadsheet} ss - Spreadsheet object
 * @param {String} familyId - ID de la familia
 * @param {Object} familyData - Data de la familia
 */
function updateFamilyDataRow(ss, familyId, familyData) {
  let sheet = ss.getSheetByName('Family_Data');

  if (!sheet) {
    sheet = ss.insertSheet('Family_Data');
    sheet.appendRow([
      'family_id', 'money', 'food', 'drinks', 'snacks',
      'dessert', 'decoration', 'transport', 'other',
      'confirmed', 'notes'
    ]);
  }

  const data = sheet.getDataRange().getValues();
  const contribs = familyData.contributions || {};

  const rowData = [
    familyId,
    contribs.money || '',
    contribs.food || '',
    contribs.drinks || '',
    contribs.snacks || '',
    contribs.dessert || '',
    contribs.decoration || '',
    contribs.transport || '',
    contribs.other || '',
    familyData.confirmed || false,
    familyData.notes || ''
  ];

  // Buscar fila existente
  let rowIndex = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === familyId) {
      rowIndex = i + 1;
      break;
    }
  }

  // Actualizar o agregar
  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, 11).setValues([rowData]);
  } else {
    sheet.appendRow(rowData);
  }
}

// ==================== UTILIDADES DE TESTING ====================

/**
 * Función de test para verificar lectura de datos
 * Ejecutar desde editor para probar
 */
function testGetAllData() {
  const data = getAllData();
  Logger.log('Families: ' + data.families.length);
  Logger.log('Data keys: ' + Object.keys(data.data).length);
  Logger.log(JSON.stringify(data, null, 2));
}

/**
 * Función de test para verificar escritura de datos
 * Ejecutar desde editor para probar
 */
function testSaveData() {
  const testData = {
    families: [
      { id: 'test1', name: 'Test Family 1', color: '#FF0000', emoji: '🔥' },
      { id: 'test2', name: 'Test Family 2', color: '#00FF00', emoji: '🌟' }
    ],
    data: {
      'test1': {
        members: [
          { id: '1', name: 'Member 1' },
          { id: '2', name: 'Member 2' }
        ],
        contributions: {
          money: '100',
          food: 'Pizza'
        },
        confirmed: true,
        notes: 'Test note'
      },
      'test2': {
        members: [],
        contributions: {},
        confirmed: false,
        notes: ''
      }
    }
  };

  saveAllData(testData.families, testData.data);
  Logger.log('Test data saved. Check your sheets.');
}

/**
 * Inicializa tabs vacíos con headers
 * Ejecutar una vez para setup inicial
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Families
  let familiesSheet = ss.getSheetByName('Families');
  if (!familiesSheet) {
    familiesSheet = ss.insertSheet('Families');
    familiesSheet.appendRow(['id', 'name', 'color', 'emoji']);
  }

  // Members
  let membersSheet = ss.getSheetByName('Members');
  if (!membersSheet) {
    membersSheet = ss.insertSheet('Members');
    membersSheet.appendRow(['family_id', 'member_id', 'member_name']);
  }

  // Family_Data
  let dataSheet = ss.getSheetByName('Family_Data');
  if (!dataSheet) {
    dataSheet = ss.insertSheet('Family_Data');
    dataSheet.appendRow([
      'family_id', 'money', 'food', 'drinks', 'snacks',
      'dessert', 'decoration', 'transport', 'other',
      'confirmed', 'notes'
    ]);
  }

  Logger.log('Sheets initialized successfully');
}

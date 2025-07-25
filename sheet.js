const SHEET_ID = '1jfBgcipHpXikHg7_-64SCrcBX147n4x0mzmMNj1_Uns';
const RANGE = 'Foglio1!A1';

function inviaSuSheets(dati) {
  const row = [
    dati.cognome, dati.nome, dati.nascita, dati.sesso,
    dati.statura, dati.cittadinanza, dati.emissione,
    dati.scadenza, dati.id, new Date().toLocaleString()
  ];

  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: [row] }
  }).then(() => {
    alert('✅ Dati inseriti correttamente!');
  }).catch(err => {
    console.error(err);
    alert('❌ Errore invio dati su Sheets.');
  });
}

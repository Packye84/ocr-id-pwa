function extractDataFromText(text) {
  const data = {
    cognome: '',
    nome: '',
    dataNascita: '',
    luogoNascita: '',
    sesso: '',
    statura: '',
    cittadinanza: '',
    scadenza: '',
    timestamp: new Date().toLocaleString('it-IT')
  };

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 3);
  const raw = lines.join(' ');

  const getMatch = (regex) => {
    const m = raw.match(regex);
    return m ? m[1].trim() : '';
  };

  data.dataNascita = getMatch(/(\d{2}[./]\d{2}[./]\d{4})/); // prende la prima data
  data.scadenza = getMatch(/(\d{2}[./]\d{2}[./]\d{4})$/); // prende l’ultima data

  // cerca per parole note con tolleranza errori OCR
  const extractLineFor = (keywords) => {
    return lines.find(l => keywords.some(k => l.toUpperCase().includes(k)));
  };

  const nomeRiga = extractLineFor(['NOME', 'NAME', 'NME']);
  const cognomeRiga = extractLineFor(['COGNOME', 'SURNAME', 'CGN', 'GNME']);
  const sessoRiga = extractLineFor(['SESSO', 'SEX']);
  const luogoRiga = extractLineFor(['LUOGO', 'GROSSETO', 'COMUNE', 'BIRTH']);
  const cittadinanzaRiga = extractLineFor(['CITTADINANZA', 'NATIONALITY']);
  const altezzaRiga = extractLineFor(['STATURA', 'HEIGHT']);

  if (cognomeRiga) data.cognome = cognomeRiga.split(' ').pop();
  if (nomeRiga) data.nome = nomeRiga.split(' ').pop();
  if (sessoRiga) data.sesso = sessoRiga.match(/[MF]/) ? sessoRiga.match(/[MF]/)[0] : '';
  if (luogoRiga) data.luogoNascita = luogoRiga;
  if (cittadinanzaRiga) data.cittadinanza = cittadinanzaRiga.match(/ITA\w*/i)?.[0] ?? '';
  if (altezzaRiga) data.statura = altezzaRiga.match(/\d{2,3}/)?.[0] ?? '';

  return data;
}

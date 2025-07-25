const CLIENT_ID = '824806863280-mh67kvc52llf1514s3ftcggdaruf9u2u.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
let tokenClient, gapiInited = false, gisInited = false;

function gapiLoaded() { gapi.load('client', initializeGapiClient); }
async function initializeGapiClient() {
  await gapi.client.init({ discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'] });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponse) => {
      if (tokenResponse.access_token) {
        document.getElementById('authorizeBtn').style.display = 'none';
        document.getElementById('signoutBtn').style.display = 'block';
      }
    },
  });
  gisInited = true;
}

window.onload = () => {
  const gapiScript = document.createElement('script');
  gapiScript.src = 'https://apis.google.com/js/api.js';
  gapiScript.onload = gapiLoaded;
  document.head.appendChild(gapiScript);

  const gisScript = document.createElement('script');
  gisScript.src = 'https://accounts.google.com/gsi/client';
  gisScript.onload = gisLoaded;
  document.head.appendChild(gisScript);
};

document.getElementById('authorizeBtn').onclick = () => {
  if (gapiInited && gisInited) tokenClient.requestAccessToken();
};
document.getElementById('signoutBtn').onclick = () => {
  google.accounts.oauth2.revoke(tokenClient.access_token);
  document.getElementById('authorizeBtn').style.display = 'block';
  document.getElementById('signoutBtn').style.display = 'none';
};

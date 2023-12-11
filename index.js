const { google } = require('googleapis');
const fb = require('facebook-nodejs-business-sdk');
const axios = require('axios');

// Set up Facebook API
const accessToken =
  'EAAJOiz3G0e0BO99LsvhYA6YYlUuxDk7NDnVqYJcaBOxrYTXCSmh3VauM1x9CV9g2KJf7OLtz6USb7ZAmQ2yS8si7FZCbw7aHVqEyh7vdVs8rh9SEL9FkIK93lZCFiXVr1Y7wKeXBYGfNR2fZBe3UWQs6aPAkJeX5XqV8wM1gzNjYErUKZCI5VFCSfBA6WIJKKMn4HRy8C5H5VO9f6y3nVx7zrNyxpFhdeacZCZCidBVuBIZD';
const api = fb.FacebookAdsApi.init(accessToken);

// Set up Google Sheets API
const sheets = google.sheets('v4');
const oauth2Client = new google.auth.OAuth2(
  '109158458053-9lmliub68u1a73h5u9lb61h33bf9q4ua.apps.googleusercontent.com',
  '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',
  'https://ahmedrubix.onrender.com/'
);

// Fetch data from Facebook
async function fetchFacebookData() {
  try {
    // Example: Fetch data from a specific endpoint
    const response = await axios.get(
      'https://adsmanager.facebook.com/adsmanager/manage/campaigns?act=396545775179129&business_id=876005783288351&global_scope_id=876005783288351&nav_entry_point=am_local_scope_selector&date=2021-10-15_2023-12-05%2Cmaximum&comparison_date&insights_date=2021-10-15_2023-12-05%2Cmaximum&insights_comparison_date&breakdown_regrouping=1&nav_source=no_referrer',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Facebook:', error);
  }
}

// Write data to Google Sheets
async function writeToGoogleSheets(data) {
  oauth2Client.setCredentials({
    refresh_token:
      '1//04fXKTMBUoBslCgYIARAAGAQSNwF-L9IrL16cfXNOOVcUfpYZjle_vXTcDmOa5ct6XlnDYgQxDU8vB0_l4EnBP914ape5HTiTHHE',
  });

  const spreadsheetId =
    'https://docs.google.com/spreadsheets/d/1-ymAXtFBUVYpenOsYD2u0fpxHEr_qy7WMor8NnET5EE/edit#gid=0';

  try {
    await sheets.spreadsheets.values.append({
      auth: oauth2Client,
      spreadsheetId: spreadsheetId,
      range: 'Sheet1', // Change as per your sheet name
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [data], // Data should be in a 2D array format
      },
    });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
  }
}

// Main function
async function main() {
  const fbData = await fetchFacebookData();
  await writeToGoogleSheets(fbData);
}

main();

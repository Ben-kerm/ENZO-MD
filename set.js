const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkNGTml5WUxmSjkrUU03dWZVck9iWGRmcU1iaGR2Mk1TZWRoWlFuREExTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDUyaWZtSC9lREV3Q1hMZ0ZTazUwVXRqTkZhR1pFeUlkTkE0OUhvRnhIND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRGlLUjFCMHIxc1drMDI5U1dRUGYyN0hialB5M0dsQUJMSjBtYm1HYWxBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPbFRReDhUVW9DeThDRHpUVVpLZjg1TXB5Q1VqN3lrckxJM2pDNWRwZHlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVLY1EyWUFWYTRHWGRJUFh0RWlXRUtDaG43cHl5di9iUHFCS3NJMVNzR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNidEJpWEliMUFZZURsY2F2V29KZStBMGd4RTRCdHMvZ041SUlPaTNvRXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU5kb3cxYnJocVErQ1JOOHo4aDR6aTV0TFN4NkVFMEs0T0NDNThGdzVsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1JBOFlRWHAwWlJDWWtxZjhjK2J2WE5CZ2pPamdubHlCZ3BxWWdRR1RHOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndHbmVtZE53eFhzNE5yQytHd2FJbDNWVlVyRllHdWlKdWFIUGw5YlVoNXlHVVU1ckFLMHFORi9KVXM3SmhHSWlYV2I1enQ1WFQwU01zRWVXcm1aSWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJJbjVObWFnazd3dkxrOWk2SWtXYUdnb2U0Z2xueTR6U1NCczFFeGpYQVFRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0MjA2ODE3MDk0NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2MkVDRDAxNzY1OEE2NzUyOUY2RDFEOEI0QTAwMjk0OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzMzNzE4ODUwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJV1hWejNoM1FvU2Y1Q29XRHIxNFNRIiwicGhvbmVJZCI6ImFjMzdmYTkwLWQ1YzQtNDgxYS1hMDU1LWIzYjAwMWVlOGM1NyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJycytzckt6bUtFZWhySFZuL3QwUE16RW9qK1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjlrbHF3OWRiVjI1TjZ2b3pmTXhTN0wrLzV3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjkzUzhQRkdGIiwibWUiOnsiaWQiOiIyNDIwNjgxNzA5NDQ6NjJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tmeDd1RUVFSy9tMmJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InViaUYvaXJ0OGJBZzJpa084REswMk16UzJyVkk3Q0FlQzlmYkI3ei9pM3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJNbzVKNU1HaHY5aTRndlNnQVBXbkxIWlBQNElrTVEyZU1lc1cwNkZGcStyUTc0VFRrYUNmVDFtU0kxRmFnSEdQYnJzVnJ2U2RodGt2aXMyeUNHRENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaWWlJZ0Y4Mzhyb3J6TElLVGREMEI0a3kvUHpJaWQ2U0ZXSWRxdElGSHFsd1owT0xDOFN4ZUdqdTVvTVFMWDgrWmZyR1krbHZkR0pUaUdmVUZxNzZqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI0MjA2ODE3MDk0NDo2MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJibTRoZjRxN2ZHd0lOb3BEdkF5dE5qTTB0cTFTT3dnSGd2WDJ3ZTgvNHQ4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNzE4ODQ1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFHSiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "okay",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 242068170944",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

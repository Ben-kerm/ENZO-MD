const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ08vVU9mQ0VSNHI3Z0M5WDdEYmlHMWp4SmFUVkFjVHRyK1BFb1BPSDlGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczA2cVNUK0F1SmYxZzhDbnBDNDNkcERlQWh3dFhOZ1hrMmdMbzFTMTBFaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXRXVEaGk3K1kzVFFvYlJsUmUwalZqV1FlZTN4cTJxbVdmZVJTWWVHVEdJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQY21TenEvQmlHN2JRUzIrd0tpRmFBWjRDTERicmpjTHlyR3NqVFlCdVVzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitFaWx4NUtKSkl5Y0tiRGIzQWxRQUYwdXVxMDZ3c0tFeHBLdTJIUVpIbk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1QR0c1ZnZlMjNCRVdFcG44R1o0WTBYb0RkZVZTL2pzaVhzN2xsdGNuU2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtzL1p3dFpaeGR3Y0k2Szh2dHdrWEVvdEhINkJpTCtqVVBmRHQvdVAxND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQk95TVI5c2pwMGs0RUFLdmVUbGRxUG02bjMwdEV0Ui9ndzhMZFRaYjhHYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImwvdEMzRTF6Zzg3NXhZUmJHdGhoOXF1TTRSeE1pcG5hVzFZMUhDSDNKWDArdTRNOTNhZHJkbzB0MXNmajJaUGZNaVBIM01tbFZXSEdNMXpyTG8yVERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OSwiYWR2U2VjcmV0S2V5IjoiN0hGWjhhOUF2c2phNkN2RzBZcy82dm5ibzhXeloyQTB2bXJ2eVEvenJLST0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiVXk5NXc3MXFTaDZhWFI3WUNMVWxfUSIsInBob25lSWQiOiJhYjQxNTdmMC1iZDlkLTQxM2EtYTZjYS00YTZkMzFjMTkxZjgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWtySXhCN2hkaEppdENMVkx5eTA4eTRFV3JZPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw0bnVXbUR0SE5VMWU4TTh3enJ0UEFOUURocz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJDUk1ITkhNQyIsIm1lIjp7ImlkIjoiMjQyMDY4MTcwOTQ0OjQxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Im9rIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLYUIrcjBIRU56OXQ3b0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJmallQcXNSN1NBZXdMRkRseGQzRFVvRElzQTRZdzBaaFlDaDhrVHd2d0M0PSIsImFjY291bnRTaWduYXR1cmUiOiI5U20raWwzYXlaYjgrS3BzNEdaeUF6amEwNUFzTGpPR0YxVUhRR3RwRGo4Z0hqZHZmcHlIdTJuUnVQNEtzUE5OMzl0LzdpM1R2Qk4wbElKWFNhMW5Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVlZCMXlkQ082ZDhwNEc1MVhKelE2bHFjTXBkK1lUUTJqN29kNjc5cDFZVm1yTnJrZGhkNGhxdnFXaVVuUC9BRDRyOS96aGRJUU5YMDNlTFVRbHFVQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNDIwNjgxNzA5NDQ6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWDQyRDZyRWUwZ0hzQ3hRNWNYZHcxS0F5TEFPR01OR1lXQW9mSkU4TDhBdSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzE2NDc3NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFQNzYifQ==',
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

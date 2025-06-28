// config/firebase.js
const admin = require('firebase-admin');

const serviceAccount = require('../serviceAccountKey.json'); 
// Make sure you have your Firebase service account JSON in the project

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

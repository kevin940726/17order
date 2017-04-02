import firebase from 'firebase';
import dateFormat from 'dateformat';

export const today = dateFormat(new Date(), 'yyyy-mm-dd');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC8g0kpkVOx6cuX53YDpUjUHhGNd6xT_JQ",
  authDomain: "bot-6f5f1.firebaseapp.com",
  databaseURL: "https://bot-6f5f1.firebaseio.com",
  projectId: "bot-6f5f1",
  storageBucket: "bot-6f5f1.appspot.com",
  messagingSenderId: "65831300907"
};

firebase.initializeApp(config);

const db = firebase.database();

export default db;

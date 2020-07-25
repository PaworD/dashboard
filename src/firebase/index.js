import * as fb from 'firebase/app'
import 'firebase/storage';  
import 'firebase/database';

export const db = fb.initializeApp({
    apiKey: "AIzaSyArty6DlTrb1J7Kj98c7A2Qrl1pDwikS90",
    authDomain: "personalblog-270216.firebaseapp.com",
    databaseURL: "https://personalblog-270216.firebaseio.com",
    projectId: "personalblog-270216",
    storageBucket: "personalblog-270216.appspot.com",
    messagingSenderId: "933847974020",
    appId: "1:933847974020:web:689a97cadc7298b4ef42d1",
    measurementId: "G-ED2EHG2TG9"
  }).database();

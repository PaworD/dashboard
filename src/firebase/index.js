import * as fb from 'firebase/app'
import 'firebase/storage';  
import 'firebase/database';

export const db = fb.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }).database();

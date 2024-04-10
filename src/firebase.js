


import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDT9gPLsfzv38IhJ2Jf5VE7Kw_SFeEZJhs",
    authDomain: "cardvending.firebaseapp.com",
    databaseURL: "https://cardvending-default-rtdb.firebaseio.com",
    projectId: "cardvending",
    storageBucket: "cardvending.appspot.com",
    messagingSenderId: "1050263331422",
    appId: "1:1050263331422:web:e7a7e1e9a5bde6984dcacf",
    measurementId: "G-HL8RF9DRHY"
  };

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { firebaseApp, database };

import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef } from "firebase/database";
import { useDatabaseList } from "vuefire";

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_DB_APIKEY,
  authDomain: import.meta.env.VITE_DB_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  projectId: import.meta.env.VITE_DB_PROJECTID,
  storageBucket: import.meta.env.VITE_DB_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_DB_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_DB_APPID,
});
const db = getDatabase(firebaseApp);

const chatroomRefList = useDatabaseList(dbRef(db, "/messages/"));

export { chatroomRefList, db };

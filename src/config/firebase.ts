// Importamos solo lo que necesitamos
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6HFCEp5EM62SKcM064hUomOjnewPmjr4",
  authDomain: "bomberos-calama.firebaseapp.com",
  projectId: "bomberos-calama",
  storageBucket: "bomberos-calama.appspot.com",
  messagingSenderId: "862302877160",
  appId: "1:862302877160:web:c9082da8df9af7f89be05d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

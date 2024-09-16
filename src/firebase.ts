import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Importa o Firestore
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA1L5YpxM8Bt2YDAp43dCIIaVW-hVVC9YY',
  authDomain: 'finesnap-da7ac.firebaseapp.com',
  projectId: 'finesnap-da7ac',
  storageBucket: 'finesnap-da7ac.appspot.com',
  messagingSenderId: '6599417445',
  appId: '1:6599417445:web:9737c683e0556f525f708c',
  measurementId: 'G-2N9EL8Q689',
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exporta a autenticação e o Firestore para uso em outros arquivos
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;

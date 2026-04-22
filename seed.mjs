import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPvwuA7wMDE7-tq-Bn5TmcpdJ3GnOJ9Ac",
  authDomain: "canarymed-9d526.firebaseapp.com",
  projectId: "canarymed-9d526",
  storageBucket: "canarymed-9d526.firebasestorage.app",
  messagingSenderId: "816032465149",
  appId: "1:816032465149:web:86c6d1eb068c4bc8bc3e94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const especialidades = [
  { name: "Quimioterapia", desc: "Oncología Médica", src: "assets/Quimio.png" },
  { name: "Traumotología", desc: "Quirúrgico", src: "assets/Traumotologia.png" },
  { name: "Cardiología", desc: "No Quirúrgico", src: "assets/Cardiologia.png" },
  { name: "Radiodiagnóstico", desc: "Diagnóstico", src: "assets/Radiodiagnóstico.png" },
  { name: "Enfermedades Crónicas", desc: "Medicina General", src: "assets/EC.png" },
  { name: "Neumología", desc: "Respiratorio", src: "assets/Neumología.png" }
];

async function seed() {
  const ref = collection(db, 'specialities');

  const snapshot = await getDocs(ref);
  for (const d of snapshot.docs) {
    await deleteDoc(doc(db, 'specialities', d.id));
  }

  for (const esp of especialidades) {
    await setDoc(doc(db, 'specialities', esp.name), esp);
  }

  console.log('¡Hecho!');
}

seed();

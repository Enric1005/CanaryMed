/*const { initializeApp } = require('firebase/app')
const { getFirestore, doc, setDoc } = require('firebase/firestore')

// ❌ NO uses export
// ✅ usa const normal
const firebaseConfig = {
  apiKey: "AIzaSyCPvwuA7wMDE7-tq-Bn5TmcpdJ3GnOJ9Ac",
  authDomain: "canarymed-9d526.firebaseapp.com",
  projectId: "canarymed-9d526",
  storageBucket: "canarymed-9d526.firebasestorage.app",
  messagingSenderId: "816032465149",
  appId: "1:816032465149:web:86c6d1eb068c4bc8bc3e94"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const specialities = [
  {
    name: "Quimioterapia",
    description: "Tratamiento oncológico para combatir el cáncer mediante fármacos especializados.",
    desc: "Oncología Médica",
    src: "../Assets/Quimio.png",
    centers: [
      {
        name: "Hospital San José",
        location: "Oncología Médica",
        price: "40.00€",
        doctor: "Dr. Sergio.A Bañol",
        image: "../Assets/San_jose.jpg"
      }
    ]
  },
  {
    name: "Traumatología",
    description: "Especialidad médica dedicada al estudio y tratamiento de lesiones del sistema musculoesquelético.",
    desc: "Quirúrgico",
    src: "../Assets/Traumotologia.png",
    centers: [
      {
        name: "Hospital San José",
        location: "Quirúrgico",
        price: "50.00€",
        doctor: "Dr. Enrique Sosa",
        image: "../Assets/San_jose.jpg"
      },
      {
        name: "Hospital San Roque",
        location: "Quirúrgico",
        price: "130.00€",
        doctor: "Dr. Sergio.A Bañol",
        image: "../Assets/San_roque.webp"
      }
    ]
  },
  {
    name: "Cardiología",
    description: "Diagnóstico y tratamiento de enfermedades del corazón.",
    desc: "No Quirúrgico",
    src: "../Assets/Cardiologia.png",
    centers: [
      {
        name: "Hospital San José",
        location: "No Quirúrgico",
        price: "60.00€",
        doctor: "Dr. Erick Justo",
        image: "../Assets/San_jose.jpg"
      },
      {
        name: "Hospital Perpetuo Socorro",
        location: "No Quirúrgico",
        price: "100.00€",
        doctor: "Dr. Sergio.A Bañol",
        image: "../Assets/Perpetuo_socorro.jpg"
      }
    ]
  },
  {
    name: "Radiodiagnóstico",
    description: "Técnicas de diagnóstico por imagen para detectar enfermedades.",
    desc: "Diagnóstico",
    src: "../Assets/Radiodiagnóstico.png",
    centers: [
      {
        name: "Hospital Vithas",
        location: "Diagnóstico",
        price: "70.00€",
        doctor: "Dr. Sergio.A Bañol",
        image: "../Assets/Vithas.webp"
      },
      {
        name: "Hospital Perpetuo Socorro",
        location: "Diagnóstico",
        price: "110.00€",
        doctor: "Dr. Enrique Sosa",
        image: "../Assets/Perpetuo_socorro.jpg"
      }
    ]
  },
  {
    name: "Enfermedades Crónicas",
    description: "Tratamiento y seguimiento de enfermedades de larga duración.",
    desc: "Medicina General",
    src: "../Assets/EC.png",
    centers: [
      {
        name: "Hospital Vithas",
        location: "Medicina General",
        price: "80.00€",
        doctor: "Dr. Enrique Sosa",
        image: "../Assets/Vithas.webp"
      },
      {
        name: "Hospital San Roque",
        location: "Medicina General",
        price: "140.00€",
        doctor: "Dr. Enrique Sosa",
        image: "../Assets/San_roque.webp"
      }
    ]
  },
  {
    name: "Neumología",
    description: "Especialidad médica centrada en el aparato respiratorio.",
    desc: "Respiratorio",
    src: "../Assets/Neumología.png",
    centers: [
      {
        name: "Hospital Vithas",
        location: "Respiratorio",
        price: "90.00€",
        doctor: "Dr. Erick Justo",
        image: "../Assets/Vithas.webp"
      },
      {
        name: "Hospital Perpetuo Socorro",
        location: "Respiratorio",
        price: "120.00€",
        doctor: "Dr. Erick Justo",
        image: "../Assets/Perpetuo_socorro.jpg"
      },
      {
        name: "Hospital San Roque",
        location: "Respiratorio",
        price: "150.00€",
        doctor: "Dr. Erick Justo",
        image: "../Assets/San_roque.webp"
      }
    ]
  }
]

async function seed() {
  console.log('Importando especialidades...')

  for (const item of specialities) {
    await setDoc(doc(db, 'specialities', item.name), item)
    console.log(`✅ ${item.name} importado`)
  }

  console.log('¡Listo! Todas las especialidades importadas')
}

seed()
*/

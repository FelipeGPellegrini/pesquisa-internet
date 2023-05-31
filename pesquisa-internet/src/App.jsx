import './App.css'

import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore"
import { useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyAJwz2UNkmh558BVvJqobfEFPUcgKs1LWY",
  authDomain: "pesquisainternet-97c7d.firebaseapp.com",
  projectId: "pesquisainternet-97c7d",
  storageBucket: "pesquisainternet-97c7d.appspot.com",
  messagingSenderId: "283016719918",
  appId: "1:283016719918:web:7f588fd5bd226fb40af9bf"
};


function App() {

  const [ap, setAp] = useState("")
  const [bl, setBl] = useState("")
  const [internet, setInternet] = useState("")
  const [nota, setNota] = useState(0)

  const app = initializeApp(firebaseConfig);
  const db = getFirestore()
  const apartamentosCollectionRef = collection(db, 'apartamentos')

  async function receberNota() {
    const apartamentos = await addDoc(apartamentosCollectionRef, {
      ap,
      bl,
      internet,
      nota,
    });
  }

  function verificarNota(e) {
    if (nota > 10) {
      e.target.value = 5
    }

  }

  return (
    <>
      <h1>Pesquisa Internet</h1>
      <div className='containerInputs'>
        <label htmlFor="ap">Apartamento <input type="number" name="ap" id="ap" value={ap} onChange={(e) => setAp(e.target.value)} /></label>
        <label htmlFor="bl">Bloco <input type="number" name="bl" id="bl" value={bl} onChange={(e) => setBl(e.target.value)} /></label>
        <label htmlFor="net"> Internet <br />
          <select name="net" id="net" value={internet} onChange={(e) => setInternet(e.target.value)}>
            <option value="flex">Flex</option>
            <option value="digitel">Digitel</option>
          </select>
        </label>
        <label htmlFor="nota">Nota <br /><input type="number" max={10} min={0} name="nota" id="nota" value={nota} onBlur={verificarNota} onChange={(e) => setNota(e.target.value)} /></label>
        <button onClick={receberNota}>Enviar</button>
      </div>
    </>
  )
}

export default App

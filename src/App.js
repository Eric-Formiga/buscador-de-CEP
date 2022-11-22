import { useState } from 'react';

import { FiSearch } from 'react-icons/fi'
import './styles.css';

import api from "./services/api.js"

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})



 async function handleSearch(){
  if(input === ""){
  alert("Preencha algum cep!")
  return
  }
  try{
    const response = await api.get(`${input}/json`)
    setCep(response.data)
    setInput("")
    console.log(cep)
  }
  catch{
    alert("Ops, erro ao buscar!")
    setInput("")
  }

 }


  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="conatainerInput">
        <input type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e)=> setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch color='#fff' size={25} />
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>Rua {cep.logradouro}</span>
        <span>Bairro: {cep.bairro}</span>
        <span>Complemento: {cep.complemento}</span>
        <span>Localidade: {cep.localidade}</span>
        <span>UF: {cep.uf}</span>
        <span>DDD: {cep.ddd}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;

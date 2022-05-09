import { FormEvent, useState } from 'react';
import { Loading } from './component/Loading';
import { api } from './lib/api';
import * as React from 'react';
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

interface DataDividers{ 
  data: {
    number: number;
    dividers: [];
    primeDividers: [];
  }
} 

export function App() {
  const [number, setNumber] = useState('')
  const [isSendingNumber, setIsSendingNumber] = useState(false)
  const [dividers, setDividers] = useState<any>(); 

  async function handleSubmitNumber(event: FormEvent) {
    event.preventDefault();

    setIsSendingNumber(true);
        
    await api.post(`/v1/${number}`, {
      number
    }).then(response => {       
      setDividers(response.data)     

      console.log(response.data)
    })
    .catch(error => {
        console.log(error.response)
    });

    setIsSendingNumber(false);
  }
  
  return (
    <>
      <div className="grid place-items-center h-screen">
        <form className="w-full max-w-sm" onSubmit={handleSubmitNumber}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input onChange={event => setNumber(event.target.value)} className="appearance-none bg-transparent border-none w-full text-white-500 mr-3 py-1 px-2 leading-tight focus:outline-none" placeholder="Coloque aqui seu número" aria-label="Full name"/>
            <button disabled={isSendingNumber} className="flex-shrink-0 bg-white hover:bg-gray-300 border-white hover:border-gray-600 text-sm border-4 text-gray-600 py-1 px-2 rounded" type="submit">
            { isSendingNumber ? <Loading/> : 'Enviar Número' }
            </button>           
          </div>
          <div className="grid place-items-center h-screen">
            <React.Fragment>
              <JsonView data={dividers} shouldInitiallyExpand={(level) => true} style={darkStyles} />
            </React.Fragment>
          </div>  
        </form>
      </div>             
    </>
  )
}

import React from 'react'

export function Formulario({variable, Saludar}) {
  return (
    <div className='items-center text-center p-3'>
        <h2>Nombre: {variable}</h2>
        <button onClick={Saludar} className='bg-blue-500 text-white rounded-2xl '>Saludar</button>
    </div>
  )
}

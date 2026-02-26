import {React} from "react"

export function Formulario({variable, Saludar}){
    return (
        <div>
        <h2>Nombre: {variable}</h2>
        <button onClick={Saludar}>Saludar</button>
        </div>
    )
}
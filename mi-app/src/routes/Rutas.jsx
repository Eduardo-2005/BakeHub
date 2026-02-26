import React from "react"
import {Rutas, Route} from "react-router-dom";
import {Home, Gestion} from "../pages"

function Rutas() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/gestion" element={<Gestion/>}/>
            <Redirect path="/*"/>
        </Routes>
    )
     
}

export default Rutas;
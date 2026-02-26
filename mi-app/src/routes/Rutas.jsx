import React from "react"
import {Routes, Route} from "react-router-dom";
import {Home, Gestion, Resultados, Dashoard} from "../pages"
import {} from "../layouts"


function Rutas() {

const Layout = (Layout, pages) => {
    return (
        <Layout>
            <pages/>
        </Layout>
    )
}
    return (
        <Routes>
            <Route path="/" element={LoadLayout=(AdminLayouts, Dashoard)}/>
            <Route path="/" element={<Dashoard/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/gestion" element={<Gestion/>}/>
            <Route path="/resultados" element={<Resultados/>}/>
        </Routes>
    )
     
}

export default Rutas;
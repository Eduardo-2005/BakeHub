import React from "react"
import {Routes, Route} from "react-router-dom";
import {ListProductos, FormProductos} from "../pages/productos"
import {Home} from "../pages"
import {Layout} from "../layouts"


function Rutas() {

const plantillas = (Layout, Page) => (
        <Layout>
            <Page />
        </Layout>
    );

    return (
        <Routes>
            <Route path="/" element={plantillas(Layout, Home)}/>
            <Route path="/productos" element={plantillas(Layout, ListProductos)}/>
            <Route path="/productos/form" element={plantillas(Layout, FormProductos)}/>
        </Routes>
    )
     
}

export default Rutas;
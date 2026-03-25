
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayouts from "../layouts/AdminLayout/AdminLayouts";
import Home from "../pages/Home/Home";
import Dashoard from "../pages/Dashboard/Dashoard";
import Gestion from "../pages/Gestion/Gestion";
import Resultados from "../pages/Resultados/Resultados";

 export function Rutas() {

  const loadLayout=(Layout, Page)=>{
    return(
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
        <Route path="/" element={loadLayout(AdminLayouts, Dashoard)}/>

        <Route path="/home" element={loadLayout(AdminLayouts, Home)}/>
        <Route path="/gestion" element={loadLayout(AdminLayouts, Gestion)}/>
        <Route path="/resultados" element={loadLayout(AdminLayouts, Resultados)}/>

        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  
  )
}

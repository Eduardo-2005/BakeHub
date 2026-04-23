import { Trash } from 'lucide-react';
import {useState, useEffect} from "react";
import ApiDatos from "../../services/ApiDatos";
import Swal from "sweetalert2"
import { useNavigate } from 'react-router';


export function Dashoard() {
  const [datos, setDatos] = useState([]);
/*   const stats = [
    { id: 1, label: 'Alumnos interesados', value: '48', icon: <Users />, color: 'blue' },
    { id: 2, label: 'Desean seguir estudiando Sistemas', value: '6', icon: <Clock />, color: 'amber' },
    { id: 3, label: 'Promedio de estudiantes de EMS', value: '8.5', icon: <Activity />, color: 'emerald' },
  ]; */
const navigate=useNavigate();
  const datosBd=async()=>{
    const datosbd= await ApiDatos.getDatos();
    setDatos(datosbd.data);
   console.log(datosbd.data);
  }

  const eliminarPerson=(id)=>{
    Swal.fire({
    title: "¿Estás seguro de eliminar este dato?",
    text: "Se borrará de la BD",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then(async (result) => { 
    if (result.isConfirmed) {
      try {
        await ApiDatos.deletePersona(id);
        datosBd();
        Swal.fire({
          title: "¡Eliminado!",
          text: "El registro ha sido borrado con éxito.",
          icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el registro.",
          icon: "error"
        });
      }
    }
  });
  }

  useEffect(() => {
  datosBd();
  }, [])
  

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Resumen de Actividad</h1>
        <p className="text-slate-500 text-sm">Monitorea de estudiantes visitados semanales.</p>
      </div>

      {/* Cards de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/*  {datos.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-${item.color}-50 text-${item.color}-600`}>
              {item.icon}
            </div>
            <p className="text-sm text-slate-500 font-medium">{item.nombre}</p>
            <p className="text-3xl font-bold text-slate-800">{item.value}</p>
          </div>
        ))}  */}
      </div>

      {/* Tabla de últimas consultas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Personas</h2>
          <button type="button" onClick={()=>navigate("/persona")} className="bg-blue-700 px-2 py-1 rounded-2xl hover:bg-blue-500 text-white font-bold">
            Nuevo personal
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Correo</th>
                <th className="px-6 py-4">Telefono</th>
                <th className="px-6 py-4">Eliminar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {datos.map((datos, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-700">{datos.nombre}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{datos.correo}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold">
                      {datos.telefono}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button type="button" onClick={()=>eliminarPerson(datos._id)}className="bg-blue-500 rounded-2xl text-red-500 hover:bg-gray-400"><Trash size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

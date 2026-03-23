import { useEffect, useState } from "react";
import axios from "axios";

export function Resultados() {
    const [interesados, setInteresados] = useState([]);
  const [noInteresados, setNoInteresados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/interesado/list")
      .then((res) => {
      const data = res.data;
/* console.log(data);
const filterDaInt=data.filter(i => i.estudiarSistemas === true);
console.log(filterDaInt); */
        setInteresados(data.filter(i => i.estudiarSistemas === true)); 
        setNoInteresados(data.filter(i => i.estudiarSistemas === false));
      })
      .catch((err) => console.log(err));
  }, []);

  const Card = ({persona,positivo}) => {
    return (
    <div className={`p-5 rounded-2xl shadow-lg mb-4 transition transform hover:scale-105
      ${positivo ? "bg-linear-to-br from-green-100 to-green-200" 
                  : "bg-linear-to-br from-red-100 to-red-200"}`}>
      
      <h3 className="font-bold text-lg text-gray-800">
        {persona.nombre}
      </h3>

      <p className="text-sm text-gray-700">
        📚 {persona.escuela}
      </p>

      <p className="text-sm text-gray-700">
        📧 {persona.email}
      </p>

      <p className="text-sm text-gray-700">
        📱 {persona.telefono}
      </p>

      <div className="mt-2">
        <p className="text-xs font-semibold text-gray-600">Intereses:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {persona.gustos.map((g, index) => (
            <span
              key={index}
              className="text-xs bg-white px-2 py-1 rounded-full shadow"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
    );
  };
  return (
     <div className="min-h-screen bg-linear-to-br from-indigo-500 to-purple-600 p-8">

      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Resultados del Registro 📊
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Interesados */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-bold text-green-600 mb-4">
            ✅ Quieren estudiar Sistemas ({interesados.length})
          </h2>

          {interesados.length === 0 && (
            <p className="text-gray-500 text-sm">Aún no hay registros.</p>
          )}

          {interesados.map((persona) => (
            <>
            <h1>{persona.nombre}</h1>
            <Card key={persona._id} persona={persona} positivo={true} />
            </>
          ))}
        </div>

        {/* No interesados */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            ❌ No desean estudiar Sistemas ({noInteresados.length})
          </h2>

          {noInteresados.length === 0 && (
            <p className="text-gray-500 text-sm">Aún no hay registros.</p>
          )}

          {noInteresados.map((persona) => (
            <>
            <h1>{persona.nombre}</h1>
            <Card key={persona._id} persona={persona} positivo={false} />
            </>
          ))}
        </div>

      </div>
    </div>
  )
}
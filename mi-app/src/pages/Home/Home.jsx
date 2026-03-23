import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import {useNavigate} from "react-router";

export function Home() {
  const initValue = {
    nombre: "",
    escuela: "",
    email: "",
    telefono: "",
    gustos: [],
    estudiarSistemas: null,
  };
  const [formData, setFormData] = useState(initValue);

  const navigate=useNavigate();

  const gustosOpciones = [
    "Programación",
    "Videojuegos",
    "Robótica",
    "Diseño Web",
    "Inteligencia Artificial",
    "Ciberseguridad",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleGusto = (gusto) => {
    setFormData((prev) => ({
      ...prev,
      gustos: prev.gustos.includes(gusto)
        ? prev.gustos.filter((g) => g !== gusto)
        : [...prev.gustos, gusto],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://localhost:4000/api/interesado/create",
        formData,
      );

      if (data.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      initialValues();
    } catch (error) {
      if (!error.response.data.ok) {
        return Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      console.error(error);
    }
  };

  const initialValues=()=>{
    setFormData(initialValues);
      navigate("/gestion",{ state: { nombre: formData.nombre, estudiarSistemas:formData.estudiarSistemas }});
  }

  const progreso = () => {
    let total = 6;
    let completos = 0;

    if (formData.nombre) completos++;
    if (formData.escuela) completos++;
    if (formData.email) completos++;
    if (formData.telefono) completos++;
    if (formData.gustos.length > 0) completos++;
    if (formData.estudiarSistemas !== null) completos++;

    return (completos / total) * 100;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-6 transition-all duration-500"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Formulario de Interés Académico
        </h2>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progreso()}%` }}
          ></div>
        </div>

        {/* Nombre */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />

        {/* Escuela */}
        <input
          type="text"
          name="escuela"
          placeholder="Escuela de procedencia"
          value={formData.escuela}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />

        {/* Teléfono */}
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
        />

        {/* Gustos */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">
            ¿Cuáles son tus intereses?
          </p>
          <div className="flex flex-wrap gap-2">
            {gustosOpciones.map((gusto) => (
              <button
                type="button"
                key={gusto}
                onClick={() => toggleGusto(gusto)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  formData.gustos.includes(gusto)
                    ? "bg-indigo-500 text-white scale-105"
                    : "bg-gray-100 hover:bg-indigo-100"
                }`}
              >
                {gusto}
              </button>
            ))}
          </div>
        </div>

        {/* Pregunta Sistemas */}
        <div>
          <p className="font-semibold text-gray-700 mb-2">
            ¿Te gustaría estudiar Sistemas Computacionales?
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, estudiarSistemas: true })
              }
              className={`flex-1 py-2 rounded-xl transition ${
                formData.estudiarSistemas === true
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-green-200"
              }`}
            >
              Sí
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, estudiarSistemas: false })
              }
              className={`flex-1 py-2 rounded-xl transition ${
                formData.estudiarSistemas === false
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-red-200"
              }`}
            >
              No
            </button>
          </div>
        </div>

        {/* Botón enviar */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          Enviar Información
        </button>
      </form>
    </div>
  );
}
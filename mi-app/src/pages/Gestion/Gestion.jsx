import { useLocation, useNavigate } from "react-router";

export function Gestion() {
  const location = useLocation();
  const navigate = useNavigate();

  const nombre = location.state?.nombre || "Estudiante";
  const respuesta=location.state?.estudiarSistemas;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 relative overflow-hidden">

      {/* Fondo animado decorativo */}
      <div className="absolute w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse bottom-10 right-10"></div>

      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transform transition-all duration-500 hover:scale-105">
        
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4 animate-bounce">
          🎉 ¡Gracias!
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          <span className="font-bold text-indigo-700">{nombre}</span>, tu información fue enviada correctamente.
        </p>
{
  respuesta===true?(<>
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-4 animate-bounce">
        🎉 ¡Excelente decisión!
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-bold text-indigo-700">{nombre}</span>, estamos emocionados de que quieras formar parte del mundo de los Sistemas Computacionales 💻✨
      </p>
      <p className="text-gray-600 mb-6">
        Prepárate para innovar, crear y transformar el futuro 🚀
      </p>
    </>):(<>
      <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
        🙌 ¡Gracias por tu sinceridad!
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        <span className="font-bold text-purple-700">{nombre}</span>, apreciamos mucho que hayas compartido tu opinión.
      </p>
      <p className="text-gray-600 mb-6">
        Aunque hoy no estés pensando en Sistemas Computacionales, recuerda que la tecnología está presente en todas las áreas 🌎💡  
        Siempre será una herramienta poderosa sin importar la carrera que elijas.
      </p>
      <p className="text-indigo-600 font-semibold mb-6">
        ¡Te deseamos mucho éxito en tu camino académico! 🚀
      </p>
    </>)
}
        

        <div className="text-5xl mb-6">
          🚀💡🤖
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-all duration-300 transform hover:scale-110 shadow-lg"
        >
          Volver al Inicio
        </button>

      </div>
    </div>
  )
}
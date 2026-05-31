import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../../components/productos";
import DatosBD from "../../service/apiDatos";

export function Home() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carritoBakeHub");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  const [cargando, setCargando] = useState(true);

  // CORRECCIÓN: "Pasteles" cambiado a "Pasteles" para coincidir con la base de datos
  // Ojo con los acentos o diferencias en mayúsculas/minúsculas.
  const categorias = [
    "Todos",
    "Pasteles",
    "Cupcakes",
    "Waffles",
    "Postres",
    "Bebidas",
  ];

  const obtenerIdProducto = (producto) => {
    return producto.id || producto._id;
  };

  const obtenerProductos = async () => {
    try {
      setCargando(true); // Aseguramos que inicie en true al recargar
      const respuesta = await DatosBD.getProductos();

      if (respuesta.data && respuesta.data.ok) {
        setProductos(respuesta.data.productos);
      }
    } catch (error) {
      console.log(error);
      // Cambiado a consola para evitar alerts intrusivos que congelen el renderizado
      console.error("No se pudieron cargar los productos del menú.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    localStorage.setItem("carritoBakeHub", JSON.stringify(carrito));
  }, [carrito]);

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      ?.toLowerCase()
      .includes(busqueda.toLowerCase());

    // Normalizamos a minúsculas o comparamos directo garantizando que coincidan con tus opciones
    const coincideCategoria =
      categoriaSeleccionada === "Todos" ||
      producto.categoria?.toLowerCase() === categoriaSeleccionada.toLowerCase();

    return coincideBusqueda && coincideCategoria;
  });

  const agregarAlCarrito = (producto) => {
    const idProducto = obtenerIdProducto(producto);

    const productoExiste = carrito.find(
      (item) => obtenerIdProducto(item) === idProducto
    );

    if (productoExiste) {
      const carritoActualizado = carrito.map((item) =>
        obtenerIdProducto(item) === idProducto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setCarrito(carritoActualizado);
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const verCarrito = () => {
    navigate("/resultados");
  };

  const totalProductos = carrito.reduce((total, producto) => {
    return total + producto.cantidad;
  }, 0);

  return (
    <div className="space-y-6">
      <section className="bg-white shadow-md rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pink-700">BakeHub</h1>
          <p className="text-gray-600">
            Menú digital de postres y alimentos
          </p>
        </div>

        <button
          onClick={verCarrito}
          className="bg-pink-600 text-white px-5 py-3 rounded-xl hover:bg-pink-700 transition font-semibold"
        >
          Ver carrito ({totalProductos})
        </button>
      </section>

      <section className="bg-white rounded-2xl shadow-md p-5">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`px-4 py-2 rounded-full border transition ${
                categoriaSeleccionada === categoria
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 hover:bg-pink-100 text-gray-700"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      {cargando ? (
        <section className="bg-white rounded-2xl shadow-md p-8 text-center">
          <p className="text-gray-500 animate-pulse">Cargando productos...</p>
        </section>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <ProductCard
                key={obtenerIdProducto(producto)}
                producto={producto}
                onAgregarCarrito={agregarAlCarrito} // Conectado con la propiedad requerida por la Card
              />
            ))
          ) : (
            <div className="col-span-full bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500">
                No se encontraron productos con esa búsqueda o categoría.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
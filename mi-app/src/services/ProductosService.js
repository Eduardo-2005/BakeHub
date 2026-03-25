import clienteAxios from './Axios';

export const obtenerProductos = () => clienteAxios.get('/productos');
export const crearProducto = (datos) => clienteAxios.post('/productos', datos);
export const actualizarProducto = (id, datos) => clienteAxios.put(`/productos/${id}`, datos);
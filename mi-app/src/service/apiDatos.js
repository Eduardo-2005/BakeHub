import api from "../api/connectionAxios";

class DatosBD {
  async getProductos() {
    return await api.get("/producto/buscar");
  }

  async postProducto(data) {
    return await api.post("/producto/create", data);
  }

    async updateProducto(id, data) {
    return await api.put(`/producto/editar/${id}`, data);
  }

  async deleteProducto(id) {
    return await api.delete(`/producto/eliminar/${id}`);
  }

  // Guardar pedido en la BD
  async postPedido(data) {
    return await api.post("/pedido/create", data);
  }

  // Obtener pedidos de la BD
  async getPedidos() {
    return await api.get("/pedido/buscar");
  }
}

export default new DatosBD();
import { useEffect, useState } from "react";
import clienteAxios from "../../../services/Axios";
import { Stack, Row, Col } from "react-bootstrap";
import { ItemProductos } from "../ItemProductos";
import { Productos } from "../../../utils";

import "./ListProductos.scss";

const ListProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await clienteAxios.get("/productos");
        setProductos(res.data);
      } catch (err) {
        console.error("Error al traer productos", err);
      }
    };
    fetchProductos();
  }, []);
}

export function ListProductos() {
  return (
    <Stack gap={12} className="container">
      <h1>Lista de productos</h1>
      <Row xs={1} sm={2} md={3} lg={4} xl={5}>
        {Productos.map((producto) => (
          <Col className="p-2">
            <ItemProductos producto={producto} />
          </Col>
        ))}
      </Row>
    </Stack>
  );
}
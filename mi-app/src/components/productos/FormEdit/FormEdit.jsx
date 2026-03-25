import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "../FormProductos/FormProductos.form";
import { Producto } from "../../../api/Producto";

const ctrProducto = new Producto();

export function FormEdit({ dato, close, onReload, Reload }) {
  
  const formik = useFormik({
    initialValues: initialValues(dato),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!dato) {
          await ctrProducto.createProducto(formValue);
          alert("¡Producto creado!");
          if (onReload) onReload(); 
        } else {
          await ctrProducto.updateProducto(dato._id, formValue);
          alert("¡Cambios guardados en BakeHub!");
          if (Reload) Reload();
        }
        close();
      } catch (error) {
        console.error("Error en la petición:", error);
        alert("Error al conectar con el servidor");
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>Nombre Producto</Form.Label>
          <Form.Control
            name="nombre"
            type="text"
            placeholder="Ej. Croissant de Chocolate"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.nombre}
          />
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            name="descripcion"
            type="text"
            placeholder="Descripción breve"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.descripcion}
          />
        </Form.Group>

        <Form.Group as={Col} md="4">
          <Form.Label>Precio</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              name="precio"
              type="number"
              value={formik.values.precio}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.precio}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <Button variant="success" type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? "Cargando..." : (!dato ? "Guardar" : "Actualizar")}
      </Button>
    </Form>
  );
}

export default FormEdit;
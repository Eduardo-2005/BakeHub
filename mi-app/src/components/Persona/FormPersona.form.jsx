import * as YUP from 'yup'

export function InitialValues(){
    return{
        nombre: "",
        telefono: "",
        correo: "",
        nomuser: "",
    }
}

export function ValidationSchema(){
    return YUP.object().shape({
        nombre: YUP.string().required("No puede ir vacio"),
        telefono: YUP.string().required("El telefono es requerido").min(2).max(10),
        correo: YUP.string().email("No tiene formato de correo"),
        nomuser: YUP.string(),
    })
}

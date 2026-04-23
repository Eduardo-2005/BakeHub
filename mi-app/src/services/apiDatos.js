import api from "../api/connectioAxios";

class DatosBD{
    //Peticion get para Datos de la bd
async getDatos(){
return await api.get('/persona/buscar')
}
//Peticion para guardar informacion en la BD
async postDatos(data){
    return await api.post('/persona/create',data);
}

//Método para eliminar
async deletePersona(id){
    return await api.delete(`/persona/eliminar/${id}`);
}
}

export default new DatosBD();
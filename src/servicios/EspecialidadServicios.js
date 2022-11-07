import axios from "axios";

const especialidadServicios = {};

especialidadServicios.obtenerEspecialidades = () => {
    return axios.get("http://localhost:8000/especialidades");
}

especialidadServicios.buscarEspecialidadPorCriterio = (criterio) => {
    return axios.get("http://localhost:8000/especialidades?q="+criterio);
}

especialidadServicios.cargarEspecialidad = (id) => {
    return axios.get("http://localhost:8000/especialidades/"+id);
}

especialidadServicios.guardarEspecialidad = (especialidad) => {
    return axios.post("http://localhost:8000/especialidades", especialidad);
}

especialidadServicios.modificarEspecialidad = (id, especialidad) => {
    return axios.put("http://localhost:8000/especialidades/"+id, especialidad);
}

especialidadServicios.borrarEspecialidad = (id) => {
    return axios.delete("http://localhost:8000/especialidades/"+id);
}

export default especialidadServicios;

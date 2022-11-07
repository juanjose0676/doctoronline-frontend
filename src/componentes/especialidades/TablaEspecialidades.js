import especialidadServicios from "../../servicios/EspecialidadServicios";
import Estados from "../../enums/Estados";
import { useEffect, useState } from "react";

const TablaEspecialidades = () => {

    const [ listaEspecialidades, setListaEspecialidades ] = useState([]);
    const [ estado, setEstado ] = useState(Estados.CARGANDO);
    const [ criterio, setCriterio ] = useState("");
    const [ idBorrar, setIdBorrar ] = useState("");
    const [ especialidadBorrar, setEspecialidadBorrar ] = useState("");

    const cargarPagina = async () => {
        try {
            const respuesta = await especialidadServicios.obtenerEspecialidades();
            console.log(respuesta.data);
            setListaEspecialidades(respuesta.data);
            if (respuesta.data.length === 0) {
                setEstado(Estados.VACIO);
            }
            else {
                setEstado(Estados.OK);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    useEffect(() => {
        cargarPagina();
    }, [])

    const buscarEspecialidad = async (event) => {
        event.preventDefault();
        try {
            const respuesta = await especialidadServicios.buscarEspecialidadPorCriterio(criterio);
            console.log(respuesta.data);
            setListaEspecialidades(respuesta.data);
            if (respuesta.data.length === 0) {
                setEstado(Estados.VACIO);
            }
            else {
                setEstado(Estados.OK);
            }
        } catch (error) {
            setEstado(Estados.ERROR);
        }
    }

    const cambiarCriterio = (event) => {
        setCriterio(event.target.value);
    }

    const confirmarBorrado = (id, nombre) => {
        setIdBorrar(id);
        setEspecialidadBorrar(nombre);
    }

    const borrarEspecialidad = async () => {
        await especialidadServicios.borrarEspecialidad(idBorrar);
        cargarPagina();
    }

    return (
        <div className="container">
            <h3>Lista de especialidades <a href="/especialidades/form" className="btn btn-sm btn-success">Agregar nuevo</a></h3>
            <form action="">
                <input type="text" onChange={cambiarCriterio} value={criterio} id="criterio" name="criterio" placeholder="Buscar por"/>
                <button onClick={buscarEspecialidad} className="btn btn-sm btn-primary">Buscar</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Atiende solo mujeres</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    (estado === Estados.CARGANDO) ? 
                        (<tr>
                            <td align="center" colSpan="4">
                                <strong>Cargando...</strong>
                                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
                            </td>
                        </tr>) : 
                    estado === Estados.VACIO ?
                        (<tr>
                            <td align="center" colSpan="4">No hay datos</td>
                        </tr>) :
                    estado === Estados.ERROR ?
                        (<tr>
                            <td align="center" colSpan="4">Ocurrió un error. Intente más tarde</td>
                        </tr>) 
                    :  
                    (
                        listaEspecialidades.map((especialidad) => (
                            <tr key={especialidad._id}>
                                <td>{especialidad.nombre}</td>
                                <td>{especialidad.descripcion}</td>
                                <td>{especialidad.atiende_solo_mujeres ? "Sí" : "No"}</td>
                                <td>
                                    <a href={"/especialidades/form/?id="+especialidad._id} className="btn btn-primary btn-sm me-2">Editar</a>
                                    <button onClick={()=> confirmarBorrado(especialidad._id, especialidad.nombre)} className="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalBorrar">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )
                }
                </tbody>
            </table>

            <div className="modal fade" id="modalBorrar" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Alerta de eliminación</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">    
                            Desea borrar la especialidad {especialidadBorrar}? 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" onClick={borrarEspecialidad} className="btn btn-danger" data-bs-dismiss="modal">Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TablaEspecialidades;
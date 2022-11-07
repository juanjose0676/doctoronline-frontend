import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import especialidadServicios from "../../servicios/EspecialidadServicios";

const FormEspecialidades = () => {

    const navigateTo = useNavigate();
   //const { id } = useParams();
   const [idParams] = useSearchParams();
   const id = idParams.get("id");
    console.log (id);
    const [ nombre, setNombre ] = useState("");
    const [ descripcion, setDescripcion ] = useState("");
    const [ atiende_solo_mujeres, setAtiende_solo_mujeres ] = useState(false);
    const [ titulo, setTitulo ] = useState("");

    const guardarEspecialidad = async (event) => {
        event.preventDefault();
        try {
            const datosEspecialidad = {
                nombre: nombre,
                descripcion: descripcion,
                atiende_solo_mujeres: atiende_solo_mujeres
            }
            console.log(datosEspecialidad);
            if (id == null) {
                const respuesta = await especialidadServicios.guardarEspecialidad(datosEspecialidad);
            }
            else {
                const respuesta = await especialidadServicios.modificarEspecialidad(id, datosEspecialidad);
            }
            navigateTo("/especialidades");
        } catch (error) {
            console.log(error);
        }
    }

    const cargarEspecialidad = async () => { 
        
        try {
            const respuesta = await especialidadServicios.cargarEspecialidad(id);
           
            if (respuesta.status === 200) {
                setNombre(respuesta.data.nombre);
                setDescripcion(respuesta.data.descripcion);
                setAtiende_solo_mujeres(respuesta.data.atiende_solo_mujeres);
            }
        } catch (error) {
            console.log("Ocurrió un error. "+error);
        }
    }

    useEffect(()=> {
        if (id != null) {
            setTitulo("Editar");
            cargarEspecialidad();
        }
        else {
            setTitulo("Nueva");
        }
    }, [])

    const cambiarNombre = (event) => {
        setNombre(event.target.value);
    }

    const cambiarDescripcion = (event) => {
        setDescripcion(event.target.value);
    }

    const cambiarAtencion = (event) => {
        setAtiende_solo_mujeres(event.target.checked);
    }

    return (
        <div className="container">
            <h3>{titulo} especialidad</h3>
            <form action="">
                <div className="row">
                    <div className="col-3">
                        <input className="form-control form-control-sm" type="text" onChange={cambiarNombre} value={nombre} name="nombre" id="nombre" placeholder="Ingrese especialidad" required />
                    </div>
                    <div className="col-6">
                        <input className="form-control form-control-sm" type="text" onChange={cambiarDescripcion} value={descripcion} name="descripcion" id="descripcion" placeholder="Ingrese descripción" />
                    </div>
                    <div className="col-3 mt-1">
                        <input className="form-check-input form-check-sm me-2" onChange={cambiarAtencion} checked={atiende_solo_mujeres} type="checkbox" name="atiende_solo_mujeres" id="atiende_solo_mujeres"/>
                        <label htmlFor="atiende_solo_mujeres form-control-sm">Atiende solo mujeres</label>
                    </div>
                </div>
                <div className="mt-3">
                    <button className="btn btn-sm btn-primary me-2" onClick={guardarEspecialidad} >Guardar</button>
                    <a href="/especialidades" className="btn btn-sm btn-light">Cancelar</a>
                </div>
            </form>
        </div>
    )
}

export default FormEspecialidades;
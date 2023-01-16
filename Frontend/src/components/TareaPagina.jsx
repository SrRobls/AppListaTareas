import React from 'react'
import {useState, useEffect} from 'react'
import TiempoTareas from './TiempoTareas'

const TareaPagina = ({match, history}) => {

    // con la funcion de macth obtenemos el parametro mandado de la url,, es decirl el :id
    // const history = useHistory()
    let tareaId = match.params.id
    let id_user_log = window.localStorage.getItem('id')
    let token_user_log = window.localStorage.getItem('token')
    if (!token_user_log){
        history.push('/')
      }

    let [tarea, setTarea] = useState([null])
    let [valorTiempo, setValorTiempo] = useState([])
    let [tiempoTarea, setTiempoTarea] = useState([])
    let [error, setError] = useState(null)

    useEffect(() => {
        getTarea()
    }, [tareaId])

    useEffect(() => {
        getTiempoTareas()
    }, [])

    let getTiempoTareas = async () => {
        let response = await fetch('/api/tiempo_tareas',{
            headers: {
                Authorization: 'Token ' + token_user_log
            }
        })
        let data = await response.json()
        setTiempoTarea(data)
    }

    let getTarea = async ()=> {

        if (tareaId === 'nuevo') return
        let response = await fetch(`/api/tareas/${tareaId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token_user_log
              },
            body: JSON.stringify({"id_user": id_user_log})
            
        })
        let data = await response.json()
        setTarea(data)
    }

    let manejandoCambio = (cambio) => {
        setTarea( tarea => ({...tarea, 'descripcion': cambio}) )
        console.log('Camabio hecho a:', tarea)

    }

    let manejandoCambioTitulo = (cambio) => {
        setTarea( tarea => ({...tarea,'titulo': cambio}) )
        console.log('Camabio hecho a:', tarea)
    }

    let manejandoCambioTiempo = (cambio) => {
        setTarea( tarea => ({...tarea,'tiempo_tarea': cambio}) )
        console.log('Camabio hecho a:', tarea)
    }

    let actualizarTarea = async () =>{
        fetch(`/api/tareas/${tareaId}/update`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json', 
                Authorization: 'Token ' + token_user_log
            },
            body: JSON.stringify(tarea)})
    }

    let actualizar = () =>{
        console.log("Actualizando")
        actualizarTarea()
        history.push("/tareas")
    }

    let eliminar = () => {
        console.log(tareaId)
        fetch(`/api/tareas/${tareaId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token_user_log
            },
            body: JSON.stringify({"id_user": id_user_log})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
        history.push('/tareas')
    }

    let crear = () =>{

        let textValorTiempo = document.getElementById('TiempoTarea').value
        let textoTitulo = document.getElementById('titulo').value
        let textoDescripcion = document.getElementById('descripcion').value

        if (textValorTiempo === 'Selecciona el tiempo de tarea' | textoTitulo === '' | textoDescripcion === ''){
            setError('Debes seleccionar todos los campos')
            return
        }

        let tarea_json = {
            "titulo": document.getElementById("titulo").value ,
            "descripcion": tarea.descripcion,
            "tiempo_tarea": valorTiempo,
            "fk_idUsuario": id_user_log
        }

        console.log(tarea_json)

        fetch('/api/tareas/create', {
            method: "POST",
            body: JSON.stringify(tarea_json),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token_user_log
            }
        })
        history.push('/tareas')
    }

    function obtenerValorTiempo(valor){
        setValorTiempo(valor)
    }

    let handleClick = (e) =>{
        manejandoCambioTiempo(e)

    }

  return (
    <div className='d-flex align-items-center justify-content-center'>
        <div className='paginaTarjeta form-control'>
            <input id="titulo" type="text" value={tarea?.titulo} onChange={(e) => {manejandoCambioTitulo(e.target.value)}}  placeholder='Titulo' />
            <h3>
                <textarea id='descripcion' onChange={(e) => {manejandoCambio(e.target.value)}} value={tarea?.descripcion} placeholder='Descripción'></textarea>
                {/* Cada vez que hay un cambio en el text area, se ejecuta la funcion maneandCambio que toma como parametro el valor del objetivo con el que intractuamos
                y el valor del text area en un principio sera etraido de la informacion de la instancia tarea (si tiene), si no, entonces ser una cadena vacia */}
            </h3>
            {tareaId !== 'nuevo' ?(
                <>
                    <select name="TiempoTarea" id="TiempoTarea" onChange={(e) => handleClick(e.target.value)} value={tarea.tiempo_tarea}>
                        {tiempoTarea.map(tiempo => (
                            <option key={tiempo.id} value={tiempo.id}>
                                {tiempo.tiempo}
                            </option>
                        ))}
                    </select>
                    <button onClick={eliminar}>Eliminar</button>
                    <button onClick={actualizar}>Actualizar</button>
                </>
            ) : (
                    <><TiempoTareas valorTiempo = {obtenerValorTiempo}/><button onClick={crear}>Crear</button></>
            )}
        {error && <p className="error">{error}</p>}
        </div>
    </div>
  )
}

export default TareaPagina
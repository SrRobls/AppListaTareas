import React from 'react'
import {useState, useEffect} from 'react'



const TiempoTareas = (props) => {

    let token_user_log = window.localStorage.getItem('token')

    const {valorTiempo} = props;
    let [tiempoTarea, setTiempoTarea] = useState([])

    useEffect(() => {
        getTiempoTareas()
    }, [])

    let getTiempoTareas = async () => {
        let response = await fetch('/api/tiempo_tareas', {
            headers:{
                Authorization: 'Token ' + token_user_log
            }
        })
        let data = await response.json()
        setTiempoTarea(data)
    }
    
    let handleClick = () =>{
        valorTiempo(document.getElementById('TiempoTarea').value)
    }


  return (
    <div>
        <select name="TiempoTarea" id="TiempoTarea" onClick={handleClick}>
            <option>Selecciona el tiempo de tarea</option>
            {tiempoTarea.map(tiempo => (
                <option key={tiempo.id} value={tiempo.id}>
                    {tiempo.tiempo}
                </option>
            ))}
        </select>

    </div>
  )
}

export default TiempoTareas
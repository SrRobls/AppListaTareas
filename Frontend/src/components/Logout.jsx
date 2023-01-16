import React from 'react'
import { useHistory } from 'react-router-dom';

const Logout = () => {

    const history = useHistory()

    let id_user = window.localStorage.getItem('id') 
    let token = window.localStorage.getItem('token')

    let cerrarSesion = async () => {
       try{
        let response = await fetch('api/autenticacion/logout', {
            method: 'POST',
            headers:{
            Authorization: 'Token ' + token,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id_user})
        })
        let data = await response.json()
        console.log(data)
        window.localStorage.removeItem('id')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('token')
        history.push('/')
       }catch(error){
        console.log(error)
       }
    }

  return (
    <div>
        <button onClick={cerrarSesion} >Cerras Sesión</button>
    </div>
  )
}

export default Logout
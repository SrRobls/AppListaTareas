import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom';


const Login = () => {
    let [user, setUser] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let username = window.localStorage.getItem('username')
        let id = window.localStorage.getItem('id')
        let token = window.localStorage.getItem('token')
        if (username){
            setUser({
                "username": username,
                "id": id,
                "token": token
            })
        }
    }, [])
    
    let getUser = async (usuario_json) => {
        let response = await fetch('/api/autenticacion/login',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario_json)
        })
        let data = await response.json()
        if (data === 'Usuario no existente'){
            setError('Este usuario no existe')
            return
        }else{
            if (data === 'Contraseña invalida'){
                setError('Contraseña incorrecta')
                return
            }
        }

        window.localStorage.setItem('username', await data['username'])
        window.localStorage.setItem('id', await data['id'])
        window.localStorage.setItem('token', await data['token'])
        await setIsAuthenticated(true)
    }

    let handleClick = () => {

        let username = document.getElementById('usuario').value
        let password = document.getElementById('password').value

        if (username === '' | password === ''){
            setError('Debes rellenar todos los campos')
            return
        }else{
            let usuario_json = {
                "username": document.getElementById('usuario').value,
                "password": document.getElementById('password').value
            }
    
            getUser(usuario_json)
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/tareas" />;
    }
    

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'>
        {error && <p className="error">{error}</p>}
        <form className='d-flex flex-column align-items-center justify-content-center' action="" method="POST">
            <label className='conLabel'>
                <span className='mb-4 my-3'>Username: </span><br />
                <input className='' type="text" name="usuario" id = "usuario" required />
            </label>
            <br />
            <label className='mb-4 my-3 conLabel'>
                <span className=''>Password: </span><br />
                <input className='' type="password" name="password" id="password" required />
            </label>
            <br />
        </form>
        <div>
                <button onClick={handleClick}>Iniciar sesión</button>
                <Link to={'/registrarse'}><button>Registrarse</button></Link>
        </div>
    </div>
    

  )
}

export default Login
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'


const Registro = () => {

    
    const history = useHistory()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setError("Las contraseñas no coinciden")
            return
            }

        const data = { username, email, password };

        try {
        // Hacer una petición HTTP para registrar al usuario
        const response = await fetch('api/autenticacion/crearUsuario', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            let res = await response.json()

            if (res === 'nombre de usuario existente') {
                setError('Este nombre de usaurio ya está en uso. Intenta con otro')
                return
            }else{
              setError('Usuario Creado!')
              setTimeout(irLogin, 800)
            }
            } catch (err) {
                setError(err.message);
            }
    };

    let irLogin = () => {
      history.push('/')
    }
  return (
    <div className='formRegistro d-flex flex-column align-items-center justify-content-center'>

    <form className='d-flex flex-column align-items-center justify-content-center' onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <label className='' htmlFor="username">
        <span className='mb-2 my-1' >Username</span><br />
        <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} required/>
      </label>

      <label className='mb-2 my-1' htmlFor="email">
      <span className='mb-2 my-1' >Email</span><br />
      <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required/>
      </label>

      <label className='mb-2 my-1' htmlFor="password">
        <span className='mb-2 my-1' >Contraseña</span><br />
        <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required/>
      </label>
      
      <label className='mb-2 my-1' htmlFor="passwordConfirmation">
        <span className='mb-2 my-1' > Confirmar Contraseña</span><br />
        <input type="password" id="passwordConfirmation" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} required/>
      </label>
      <br />
      <button type="submit">Registrarse</button>
    </form>

    </div>
  )
}

export default Registro
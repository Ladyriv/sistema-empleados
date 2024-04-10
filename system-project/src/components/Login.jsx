//import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './style.css'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Inicio de sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"> <strong>Correo:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Ingresa un correo' 
                    className='form-control rounded-0'
                    onChange={(e) => setValues({...values, email : e.target.value})} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Contraseña:</strong></label>
                    <input type="password" name='password' placeholder='Ingresa contraseña' 
                    className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, password : e.target.value})}/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Ingresar</button>
                <div className='mb-1'>
                    <input type="checkbox" name="tick" id="tick" className='me-2' />
                    <label htmlFor="password">Estas de acuerdo con los terminos</label>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
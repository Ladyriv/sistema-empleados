/* eslint-disable react-hooks/rules-of-hooks */
//import React from 'react'
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const addCategory = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_category', {category})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/category')
            } else{
                alert(result.data.Error)
            }
        })
            //console.log(result.data))
        .catch(err => console.log(err))
    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Agregar categoría</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="category"> <strong>Categoría:</strong></label>
                    <input type="text" name='category' placeholder='Ingresa un categoría' 
                    className='form-control rounded-0'
                    onChange={(e) => setCategory(e.target.value)} />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Ingresar Categoría</button>
            </form>
        </div>
    </div>
  )
}

export default addCategory

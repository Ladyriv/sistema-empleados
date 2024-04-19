import React from 'react'
import { Link } from 'react-router-dom'

const Empleado = () => {
  return (
    <div className="px-5 mt-5 ">
        <div className="d-flex justify-content-center ">
            <h3>Empleados</h3>
        </div>
        <Link to="/dashboard/add_employee"
            className="btn btn-success ">Agregar Empleado
        </Link>
        <div className='mt-3'></div>
    </div>
  )
}

export default Empleado

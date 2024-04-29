import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

const Empleado = () => {
  const [employee, setEmployee] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.post('http://localhost:3000/auth/employee')
        .then(result => {
            if(result.data.Status){
                setEmployee(result.data.Result)
                    window.location.reload()
            } else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
  })

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee'+ id)
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/employee')
      } else {
          alert(result.data.Error)
      }
    })
  }

  return (
    <div className="px-5 mt-5 ">
        <div className="d-flex justify-content-center ">
            <h3>Empleados</h3>
        </div>
        <Link to="/dashboard/add_employee"
            className="btn btn-success ">Agregar Empleado
        </Link>
        <div className="mt-3">
          <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th>Salario</th>
                </tr>
              </thead>
              <trbody>
                {
                  employee.map(e => {
                    <tr>
                      <td>{e.nombre}</td>
                      <td><img src={`http://localhost:3000/Images/` + e.image} className='employee_image' /></td>
                      <td>{e.correo}</td>
                      <td>{e.direccion}</td>
                      <td>{e.salario}</td>
                      <td>
                        <Link to={`/dashboard/edit_employee`+e.id} className='btn btn-info btn-sm me-2' >Editar</Link>
                        <button className='btn btn-warning btn-sm' onClick={() => handleDelete(e.id)}>Eliminar</button>
                      </td>

                    </tr>
                  })
                }
              </trbody>
          </table>
        </div>
    </div>
  )
}

export default Empleado

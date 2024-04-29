import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
    const {id} = useParams()

    const [employee, setEmployee] = useState({
        nombre: '',
        correo: '',
        direccion: '',
        salario: '',
        categoria_id: ''
    });

    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
          if(result.data.Status){
            setCategory(result.data.Status);
          } else {
            alert(result.data.Error)
          }    
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee' +id)
        .then(result => {
          if(result.data.Status){
            setEmployee({
                ...employee,
                nombre: result.data.Result[0].nombre,
                correo: result.data.Result[0].correo,
                direccion: result.data.Result[0].direccion,
                salario: result.data.Result[0].salario,
                categoria_id: result.data.Result[0].categoria_id
            });
          } else {
            alert(result.data.Error)
          }    
        }).catch(err => console.log(err))
      }, [])

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/add_employee/'+ id, employee)
        .then(result => {
          if(result.data.Status){
            navigate('/dashboard/emloyee')
          } else {
            alert(result.data.Error)
          }
        }).catch(err => console.log(err))
      }


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border loginForm">
        <h3 className="text-center">Agregar Empleado</h3>
        <form className="rowg-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Ingresa nombre"
              value={employee.nombre}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, nombre: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Ingresa correo"
              value={employee.correo}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, correo: e.target.value })
              }
            />
          </div>
          <div className="col-12">            
            <label htmlFor="inputSalary" className="form-label">
              Salario
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Ingresa Salario"
              autoComplete="off"
              value={employee.salario}
              onChange={(e) =>
                setEmployee({ ...employee, salario: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Ingresa dirección"
              value={employee.direccion}
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, direccion: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Categoría
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.categoria}
              onChange={(e) =>
                setEmployee({ ...employee, categoria_id: e.target.value })
              }
            >
              {category.map((c) => {
                return <option value={c.id}>{c.nombre} </option>;
              })}
            </select> </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Agregar empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee


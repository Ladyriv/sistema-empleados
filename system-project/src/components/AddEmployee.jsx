import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {

  const [employee, setEmployee] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    contraseña: '',
    salario: '',
    categoria_id: '',
    image: ''
  })
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
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new formData()
    formData.append('nombre', employee.nombre);
    formData.append('correo', employee.correo);
    formData.append('direccion', employee.direccion);
    formData.append('contraseña', employee.contraseña);
    formData.append('salario', employee.salario);
    formData.append('categoria_id', employee.categoria_id);
    formData.append('image', employee.image);

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/employee')
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-3 rounded w-25 border loginForm">
        <h3 className="text-center">Agregar Empleado</h3>
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
            Nombre
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Ingresa nombre"
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
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, correo: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword"
              placeholder="Ingresa contraseña"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, contraseña: e.target.value })
              }
            />
            <label htmlFor="inputSalary" className="form-label">
              Salario
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Ingresa Salario"
              autoComplete="off"
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
              type="email"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="Ingresa dirección"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, direccion: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, categoria_id: e.target.value})}>
              {category.map((c) => {
                return <option value= {c.id}>{c.nombre} </option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Seleccionar imagen
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image: e.target.files[0]})}
            />
          </div>
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

export default AddEmployee

import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Home from './components/Home'
import Employee from './components/Empleado'
import Profile from './components/Profile'
import Category from './components/Categoria'
import Dashboard from './components/Dashboard'
import AddCategory from './components/AddCategory'
import AddEmployee from './components/AddEmployee'
import Start from './components/Start'

import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import './App.css'
import EditEmployee from './components/EditEmployee'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/verify')
    .then(result => {
      if(result.data.Status){
        if(result.data.role === "admin"){
          navigate('/dashboard')
        } else{
          navigate('/employee/'+ result.data.id)
        }
      } else {
        navigate('/start')
      }
    }).catch(err => console.log(err))
  }, [navigate])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}>Home</Route>
          <Route path='/dashboard/employee' element={<Employee />}>Empleado</Route>
          <Route path='/dashboard/category' element={<Category />}>Categoria</Route>
          <Route path='/dashboard/profile' element={<Profile />}>Perfil</Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}>Agregar categoria</Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}>Agregar Empleado</Route>
          <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}>Editar Empleado</Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

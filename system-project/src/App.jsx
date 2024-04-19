import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/Login'
import Home from './components/Home'
import Employee from './components/Empleado'
import Profile from './components/Profile'
import Category from './components/Categoria'
import Dashboard from './components/Dashboard'
import AddCategory from './components/AddCategory'
import AddEmployee from './components/AddEmployee'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />}>Home</Route>
          <Route path='/dashboard/employee' element={<Employee />}>Empleado</Route>
          <Route path='/dashboard/category' element={<Category />}>Categoria</Route>
          <Route path='/dashboard/profile' element={<Profile />}>Perfil</Route>
          <Route path='/dashboard/add_category' element={<AddCategory />}>Agregar categoria</Route>
          <Route path='/dashboard/add_employee' element={<AddEmployee />}>Agregar Empleado</Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

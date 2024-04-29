/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'


const Dashboard = () => {

  const navigate = useNavigate()
  axios.defaults.withCredentials = true

  const handleLogout = () => {
    axios.get('http//localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status){
        navigate('/adminLogin')
      }
    })
  }



  return (
    <div className='container-fluid'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
            <Link to='/dashboard'
              className='d-flex align-items-center pb-3 mb-md-1 mt-d-3 me-md-auto text-white'>
              <span className='fs-5 fw-bolder d-done d-sm-inline'>Primera pagina</span></Link>
            <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start'>
              <li className='w-100'>
                <Link to='/' data-bs-toggle='collapse'
                      className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-4 bi-speedmeter2 ms-2'></i>
                  <span className='ms-2 d-done d-sm-inline'>Administración</span> </Link>
              </li>
              <li className='w-100'>
                <Link to='/employee'
                      className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-4 bi-people ms-2'></i>
                  <span className='ms-2 d-done d-sm-inline'>Perfil</span> </Link>
              </li>
              <li className='w-100' onClick={handleLogout}>
                <Link to='/dashboard'
                      className='nav-link text-white px-0 align-middle'
                >
                  <i className='fs-4 bi-power ms-2'></i>
                  <span className='ms-2 d-done d-sm-inline'>Cerrar sesión</span> </Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Sistema de empleados</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
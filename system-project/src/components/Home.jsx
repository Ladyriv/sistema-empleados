import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminCount] = useState()
  const [employeeTotal, setEmployeeCount] = useState()
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    adminList();
  },[])

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status){
          setAdminCount(result.data.Result[0].admin)
      } 
  })
  }

  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status){
          setEmployeeCount(result.data.Result[0].employee)
      } else{
          alert(result.data.Error)
      }
  }).catch(err => console.log(err))
  }

  const adminList = () => {
    axios.get('http://localhost:3000/auth/admin_list')
    .then(result => {
      if(result.data.Status){
          setAdmins(result.data.Result)
      } 
  })
  }

  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className=''>
          <h5>Total:</h5>
          <h5>{adminTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className=''>
          <h5>Total:</h5>
          <h5>{employeeTotal}</h5>

        </div>
      </div>
    </div>

    {/* List of admin  */}
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(a => {
            <tr>
              <td>{a.correo}</td>
              <td>
                <button className='btn btn-info btn-sm me-2' >Editar</button>
                <button className='btn btn-warning btn-sm'>Eliminar</button>
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Home

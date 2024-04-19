//import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Categoria = () => {

  const [category, setCategory] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/auth/category')
    .then(result => {
      //console.log(result.data)
      if(result.data.Status){
        setCategory(result.data.Status);
      } else {
        alert(result.data.Error)
      }

    }).catch(err => console.log(err))
  }, [])



  return (
    
    <div className="px-5 mt-5 ">
        <div className="d-flex justify-content-center ">
            <h3>Categoria Lista</h3>
        </div>
        <Link to="/dashboard/add_category"
            className="btn btn-success ">Agregar categoria 
        </Link>
        <div className="mt-3">
          <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                </tr>
              </thead>
              <trbody>
                {
                  category.map(c => {
                    <tr>
                      <td>{c.name}</td>
                    </tr>
                  })
                }
              </trbody>
          </table>
        </div>
        
    </div>
  )
}

export default Categoria

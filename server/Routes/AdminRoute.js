import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    //console.log(req.body)
      const sql = " SELECT * from admin Where email = ? and password = ? "
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({ loginStatus: false, Error: "Query error"})
        if(result.length > 0 ){
            const email = result[0].email;
            const token = jwt.sign(
                {role: "admin", email: email}, 
                "jwt_secret_key", 
                { expiresIn: '1d'}
            );
            res.cookie('token', token)
            return res.json({loginStatus: true});
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password"})
        }
    });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql,(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO categoria (`nombre`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

router.post('/add_employee', (req, res) => {
    const sql = "INSERT INTO empleado \ (`nombre`, `correo`, `contraseña`, `direccion`, `salario`, `image`, `categoria_id`) \ VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({ loginStatus: false, Error: "Query error"})
        const values = [
            req.body.nombre,
            req.body.correo,
            hash,
            req.body.direccion,
            req.body.salario,
            req.body.image,
            req.body.categoria_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({ loginStatus: false, Error: "Query error"})
            return res.json({Status: true})

        })
    })
})

export { router as adminRouter }
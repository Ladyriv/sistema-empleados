import express from 'express'
import con from '../utils/db.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import multer from 'multer';
import path from 'path';

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

// upload image

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})


router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = "INSERT INTO empleado \ (`nombre`, `correo`, `contraseña`, `direccion`, `salario`, `image`, `categoria_id`) \ VALUES (?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if(err) return res.json({ loginStatus: false, Error: "Query error"})
        const values = [
            req.body.nombre,
            req.body.correo,
            hash,
            req.body.direccion,
            req.body.salario,
            //req.body.image,
            req.file.filename,
            req.body.categoria_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({ loginStatus: false, Error: "Query error"})
            return res.json({Status: true})

        })
    })
})


router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM empleado";
    con.query(sql,(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM empleado WHERE id = ?";
    con.query(sql,[id],(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE * set nombre= ?, correo= ?, salario= ?, direccion= ?, categoria_id= ? where id = ?`;
    const values = [
        req.body.nombre,
        req.body.correo,
        req.body.direccion,
        req.body.salario,
    ]
    con.query(sql,[...values, id],(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+ err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE from employee where id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_list', (req, res) => {
    const sql = "select * from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


export { router as adminRouter }
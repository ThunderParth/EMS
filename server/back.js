import express from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json())
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"ems"
})
app.get('/',(req,res)=>{
    const sql="select * from ems.crud;";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Error"})
        else return res.json(result);
    })
})
app.post('/',(req,res)=>{
    const sql="insert into crud(`id`,`name`,`email`) values(?);";
    const values=[
        req.body.id,
        req.body.name,
        req.body.email
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})
app.get('/read/:id',(req,res)=>{
    const sql="select * from ems.crud where id=?;";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"error"})
        else return res.json(result);
    })
})
app.put('/edit/:id', (req, res) => {
    const sql = "UPDATE ems.crud SET `name`=?, `email`=?, `id`=? WHERE `id`=?";
    const Id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, req.body.id, Id], (err, result) => {
        if (err) return res.json({ Message: "error" });
        else return res.json(result);
    });
});
app.delete('/delete/:id',(req,res)=>{
    const sql="delete from ems.crud where id=? ;"
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"ErRor"})
        return res.json(result);
    })
})
app.listen(8081,()=>{
    console.log("listening");
})
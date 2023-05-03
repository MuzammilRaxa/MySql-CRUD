import express from "express"
import mysql from "mysql"

const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "razamysql12A@",
    database: "test"
})

app.get("/",(req,res)=>{
    res.json("Hello I'm Get result!")
})

app.get("/books",(req,res)=>{
    const qr = "SELECT * FROM books"
    db.query(qr,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800,()=>{
    console.log('Connected!!')
})
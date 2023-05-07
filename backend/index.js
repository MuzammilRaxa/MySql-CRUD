import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "razamysql12A@",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Hello I'm Get result!")
})

app.get("/books", (req, res) => {
    const qr = "SELECT * FROM books"
    db.query(qr, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const qr = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(qr, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been created")
    })
})


app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const qr = "DELETE FROM books WHERE id =?"

    db.query(qr, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Book has been deleted")
    })
})


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const qr = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    db.query(qr, values, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
});

app.listen(8800, () => {
    console.log('Connected!!')
})
const express = require('express');
const exxpress = require('express');
const mysql = require('mysql');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// create a connection to our database

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port' + listener.address().port)
})

// implementing CRUD

app.get("/reviews", (req, res) => {
    db.query("SELECT * FROM book_reviews", (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

// SQL query to save new books into the the db
app.post("/reviews", (req, res) => {
    const insertQuery = "INSERT INTO tkhbooks SET ?";
    db.query(insertQuery, (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send("Review Added to Database")
        }
    })
})

app.put("/reviews", (req, res) => {
    const updateQuery = "UPDATE tkhbooks SET book_review = ?, book_raiting = ?"
    db.query(updateQuery, [req.body.book_review, req.body.book_raiting, req.body.id], (err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    } ) 
})

app.delete('/reviews/:id', (req, res) => {
    db.query("DELET FROM book_reviews WHERE id = ?", req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
})
import express from "express"
import mysql from "mysql2"
// var express = require('express')
var app = express()

// const mysql = require('mysql2');

// creating the connection between mysql and our project

app.use(express.json())

// Enable CORS for all routes (instead of installing cors )
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
  });

  //if there is a auth problem
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newPassword';

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

//showing data 
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM thebooks"
    db.query(q, (err, data)=>{
        if (err) {
            console.error(err);
            return res.json(err);
        }
        return res.json(data)
    })
})

//creating data using post

app.post("/books", (req, res)=>{
    console.log("Received data:", req.body);
    const q = "INSERT INTO thebooks( `title`, `desc`, `cover`, `price`) VALUES (?)";
    
  const values = [
    // req.body.id,
    req.body.title,
    req.body.desc,
   
    req.body.cover,
    req.body.price,
  ];
    // db.query(q, [values], (err, data)=>{
    //     if(err) return res.json(err)
    //     return res.json(data)
    // })
    db.promise().query(q, [values])
        .then(([rows]) => {
            return res.json(rows);
        })
        .catch((err) => {
            console.error(err);
            return res.json(err);
        });
})

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM thebooks WHERE id = ?"
    db.query(q, [bookId], (err, data)=>{
        if (err) {
            console.error(err);
            return res.json(err);
        }
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id
    // the order is changable 
    const q = "UPDATE thebooks SET `title`=? , `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?"

    const values = [
        // req.body.id,
        req.body.title,
        req.body.desc,
       
        req.body.cover,
        req.body.price,
      ];

    db.query(q, [...values,bookId], (err, data)=>{
        if (err) {
            console.error(err);
            return res.json(err);
        }
        return res.json("Book has been updated successfully")
    })
})


app.listen(8800, ()=>{
    console.log("connected to backendkk")
})
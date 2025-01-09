let express = require('express');
const req = require('express/lib/request');
let app = express();
require('dotenv').config();

// console.log("Hello World");


// app.get("/", (req, res) => {
//     res.send("Hello Express")
// })

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
})

app.use("/public", express.static(__dirname + "/public"));

// app.get("/json", (req, res) => {
//     res.json({"message": "Hello json"})
// })

app.get("/json", (req, res) => {
    if (process.env["MESSAGE_STYLE"] == "uppercase"){
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    }
})

// Chain Middleware
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next()
}, (req, res) => {
    res.json({"time": req.time})
})

// Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
    res.json({echo: req.params.word})
})

// req.query

app.get("/name", (req, res) => {
    res.json({name: req.query.first + " " + req.query.last})
})

// Use body-parser to Parse POST Requests








 module.exports = app;

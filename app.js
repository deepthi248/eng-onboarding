var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");
const todoRouter = require('./routes/todoRouter')
const mongoose = require('mongoose')

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRouter)


//connection to mongodb
const dbURI = 'mongodb+srv://Deepthi:Deepu%402406@cluster0.cxfee.mongodb.net/todoDB?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(() => {
        console.log("database connected")
        app.listen(5000, () => {
            console.log("app is reflected in 5000")
        })
    })
    .catch((err) => console.log(err))



module.exports = app;

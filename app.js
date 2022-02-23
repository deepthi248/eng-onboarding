//express module
const flash = require('connect-flash');
const session = require('express-session')
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
//router import 
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users');


const passport = require('passport');


//CREATE APP------------------------------------------------------------------ 
const app = express();

require('./config/passport')(passport)

//MONGO CONNECTION------------------------------------------------------------------

const dbURI = 'mongodb+srv://Deepthi:Deepu%402406@cluster0.cxfee.mongodb.net/Users?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(() => {
        console.log("database connected")
        app.listen(5000, () => {
            console.log("app is reflected in 5000")
        })
    })
    .catch((err) => console.log(err))

//MIDDLEWARE------------------------------------------------------------------ 
//bosy parser
app.use(express.urlencoded({ extended: false }))
//layouts and view Engines
app.use(expressLayouts);
app.set('view engine', 'ejs')

//session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
//passport middleware 
app.use(passport.initialize())
app.use(passport.session())
//flash 
app.use(flash())


//Global Variables 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error');
    next();
})


//routes
app.use('/', indexRouter);
app.use('/users', userRouter);


//setup port 
const PORT = process.env.PORT || 5000;

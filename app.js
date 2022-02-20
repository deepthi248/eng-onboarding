const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
var path = require('path');
const urlencode = require('urlencode')
const blogController = require('./controllers/blogController')
const app = express();
const blogroutes = require('./routes/BlogRoutes')

app.set('view engine', 'ejs')

const dbURI = 'mongodb+srv://Deepthi:Deepu%402406@cluster0.cxfee.mongodb.net/Node_crashcourse?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(() => {
        console.log("database connected")
        app.listen(3000)
    })
    .catch((err) => console.log(err))

//incase another folder
// app.set('views','myViews')

// app.use(express.static(path.join(__dirname, '/public')));

//middleware
//without 3rd party -logging  && next is used to say middleware to stop and go to next function
// app.use((req, res, next) => {
//     console.log(req.hostname)
//     console.log(req.path)
//     console.log(req.method)
//     next();
// })
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('dev'));



//getting all blogs  -- THIS IS TO CREATE DISPLAY DATA AT THE PARTICULAR PATH
/*app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => res.send(result))
        .catch(err => { res.send(err) })
})

//getting single blog 
app.get('/single-blog', (req, res) => {
    Blog.findById('620f27360eef2f40515f4274')
        .then(result => res.send(result))
        .catch(err => { res.send(err) })
})
*/


app.get('/', (req, res) => {
    //REDIRECT TO THE BLOGS/ALLBLOGS 
    res.redirect('/blogs');
    //NORMAL WAY OF SENDING THE DATA 
    // const blogs = [
    //     { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    //     { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    // ];
    // res.render('index', { 'title': 'Home', blogs }); //sending the data to the index.ejs 
})

app.use('/blogs', blogroutes)

app.get('/about', (req, res) => {
    res.render('about', { 'title': 'About' })
})

app.use((req, res) => {
    res.status(400).render('404', { title: '404 page' })
})


const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
var path = require('path');
const Blog = require('./models/Blogs');

const app = express();
app.set('view engine', 'ejs')

const dbURI = 'mongodb+srv://Deepthi:Deepu%402406@cluster0.cxfee.mongodb.net/Node_crah_course?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err))

//adding into the database 


//incase another folder
// app.set('views','myViews')

// app.use(express.static(path.join(__dirname, '/public')));

//middleware
app.use(morgan('tiny'))
//without 3rd party -logging  && next is used to say middleware to stop and go to next function
// app.use((req, res, next) => {
//     console.log(req.hostname)
//     console.log(req.path)
//     console.log(req.method)
//     next();
// })

// app.use(express.static('public'))

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'abc',
        snippet: 'abc',
        body: 'body'
    })

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch(err => { res.send(err) })
})


app.get('/', (req, res) => {
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { 'title': 'Home', blogs }); //sending the data to the index.ejs 
})

app.get('/about', (req, res) => {
    res.render('about', { 'title': 'About' })
})
app.get('/blogs/create', (req, res) => {
    res.render('newBlog', { title: 'Create Blog' })
})

app.use((req, res) => {
    res.status(400).render('404', { title: '404 page' })
})


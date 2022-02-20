const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
var path = require('path');
const Blog = require('./models/Blogs');
const urlencode = require('urlencode')

const app = express();
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


app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new Blog 2 ',
        snippet: 'abc',
        body: 'abc'
    })

    blog.save()
        .then((result) => {
            res.send(result);
            console.log("inside blog save")
        })
        .catch(err => { res.send(err) })
})

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

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => console.log(err))
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => console.log(error))
})


app.get('/blogs/create', (req, res) => {
    res.render('newBlog', { title: 'Create Blog' })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => res.render('details', { title: 'Blog Details', blog: result }))
        .catch()
})


app.get('/about', (req, res) => {
    res.render('about', { 'title': 'About' })
})


app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => res.json({ redirect: '/blogs' })
        ).catch(err => console.log(err))
})
app.use((req, res) => {
    res.status(400).render('404', { title: '404 page' })
})


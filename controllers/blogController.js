const Blog = require("../models/Blogs");
const blog_all_blogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => console.log(err))

}

const blog_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(error))
}
const blog_create = (req, res) => {
    res.render('newBlog', { title: 'Create Blog' })
}
const blog_get_by_id = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => res.render('details', { title: 'Blog Details', blog: result }))
        .catch()
}
const blog_delete_by_id = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => res.json({ redirect: '/' })
        ).catch(err => console.log(err))
}

module.exports = {
    blog_all_blogs,
    blog_post,
    blog_create,
    blog_get_by_id,
    blog_delete_by_id
}
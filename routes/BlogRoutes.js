const express = require('express')
const { blog_all_blogs, blog_post, blog_create, blog_get_by_id, blog_delete_by_id } = require('../controllers/blogController')
const router = express.Router()
const Blog = require('../models/Blogs')

router.get('/', blog_all_blogs)
router.post('/', blog_post)
router.get('/create', blog_create)
router.get('/:id', blog_get_by_id)
router.delete('/:id', blog_delete_by_id)


module.exports = router;
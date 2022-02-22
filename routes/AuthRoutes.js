var express = require('express');
var router = express.Router();
const { home_display, signUp_display, login_display, view_smoothies, signUp_post, login_post } = require('../controllers/smoothieController')
/* GET home page. */
router.get('/', home_display);
router.get('/signUp', signUp_display)
router.post('/signUp', signUp_post)
router.get('/logIn', login_display)
router.post('/logIn', login_post)
router.get('/smoothies', view_smoothies)

module.exports = router;

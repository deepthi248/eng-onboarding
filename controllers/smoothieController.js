const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const home_display = (req, res, next) => {
    res.render('Home', { title: 'Home' })
};
const signUp_display = (req, res, next) => {
    res.render('signUp', { title: 'SignUp' })
}
const login_display = (req, res, next) => {
    res.render('Login', { title: 'Log In' })
}

const view_smoothies = (req, res, next) => {
    res.render('smoothies', { title: 'view Recipies' })
}
//handle errors
const handleErrors = (err) => {
    console.log(err);
    let error_message = { userName: '', password: '' };
    // duplicate email error
    if (err.code === 11000) {
        error_message.userName = 'The entered email is already registered';
        return error_message;
    }
    else {
        if (err.message.includes('user validation failed')) {

            Object.values(err.errors).forEach(({ properties }) => {
                console.log("inside the for")
                error_message[properties.path] = properties.message
            })
        }
        return error_message
    }


}
//jwt token handling -- id is payload
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
        expiresIn: maxAge
    });
};



// Checking the error and sending th appropriate error message from the properties 
//the error sent by the req has certain properties - which stores all the information about the 
//path, message etc - by using required properties we define the error message
const signUp_post = async (req, res, next) => {
    const { userName, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.create({ userName }) //send back the db doc
        const token = createToken(user._id);
        console.log(token, "token")
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id }); // send back the doc as json object

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(404).send({ errors })
    }
}
const login_post = async (req, res, next) => {
    res.send('login post')
}
module.exports = {
    home_display,
    signUp_display,
    login_display,
    view_smoothies,
    login_post,
    signUp_post
}

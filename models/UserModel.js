const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "please enter your Email ID"],
            unique: true,
            lowercase: true,
            validate: [isEmail, 'please enter valid email']
        },
        password: {
            type: String,
            required: [true, "please enter your password"],
            minlength: [6, "please enter atleast 6 letters"]
        },
    }

)

//mongoose hook is used to fire a function after specific operation is done 

//fire a funciton before a doc is saved to the document 
//hashing before saving the document
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    console.log(this.password, " ", salt)
    this.password = bcrypt.hashSync(this.password, salt); //if hash doesnt work use hashSync
    console.log(this.password)
    next();
})


// here right after a new user is created evrytime -- this post = after this event fire this 
userSchema.post('save', (doc, next) => {
    console.log("new user is created", doc)
    next(); //should always be added after mongoose hook
})



const User = mongoose.model('user', userSchema);
module.exports = User;
const mongoose = require('mongoose')
const { Schema } = mongoose
const { hash } = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [{validator: isUnique, message:'email already registered'}]
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

function isUnique(value) {
    return User.findOne({email: value}) 
        .then (found => {
            if (found) return false
            else return true
        })
}

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
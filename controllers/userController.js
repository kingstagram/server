const User = require('../models/user')
const { check } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {

    static register(req, res, next) {
        User.create(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) throw {message: 'invalid email/password'}
                let isPassword = check(req.body.password, user.password)
                if (!isPassword) throw {message: 'invalid email/password'}
                let payload = {
                    _id : user._id,
                    username : user.username,
                    email : user.email
                }
                let token = generateToken(payload)
                res.status(200).json(token)
            })
            .catch(next)
    }

}

module.exports = UserController
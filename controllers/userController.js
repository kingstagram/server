const User = require('../models/user');
const {check} = require('../helpers/bcrypt');
const {generateToken} = require('../helpers/jwt');

class UserController {

    static viewUser(req, res, next) {
        User.find({}).then(user => {
            res.status(200).json(user)
        }).catch(next)
    }

    static findUser(req, res, next) {
        User.findOne({
            _id: req.params.id
        }).then(user => {
            res.status(200).json(user)
        }).catch(next)
    }

    static myProfile(req, res, next) {
        User.findById(req.loggedUser._id)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    static register(req, res, next) {
        console.log(req.body)
        User.create(req.body)
            .then(user => {
                let payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                };
                let token = generateToken(payload);
                let username = user.username;
                res.status(200).json({token, username});
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) throw {message: 'invalid email/password'};
                let isPassword = check(req.body.password, user.password);
                if (!isPassword) throw {message: 'invalid email/password'};
                let payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email
                };
                let token = generateToken(payload);
                let username = user.username;
                res.status(200).json({token, username});
            })
            .catch(next)
    }

}

module.exports = UserController
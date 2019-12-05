const { verifyToken } = require('./jwt')
const User = require('../models/user')

function authentication (req, res, next){
    console.log('masuk authentication')
  try {
    console.log('masuk try')
    let decodedToken = verifyToken(req.headers.token)
    console.log(decodedToken)
    User.findById(decodedToken.id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          console.log('log' + req.loggedUser.id)
          next()
        }
        else{
          next({ status: 401, message: 'Authentication Failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}


module.exports = { authentication }
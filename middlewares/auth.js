const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Post = require('../models/post')

function authentication (req, res, next){
    console.log('masuk authentication')
  try {
    let decodedToken = verifyToken(req.headers.token)
    User.findById(decodedToken._id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
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


function authorization (req, res, next){

  let _id = req.params.postId;
  Post.findById(_id)
    .then(post => {
      if(!post){
        next({ status: 404, message: 'Not Found' })
      }
      else if(post.userId == req.loggedUser._id){
        next()
      }
      else{
        next({ status: 403, message: 'Not Authorize' })
      }
    })
    .catch(err => {
      next({ status: 403, message: err })
    })
}

module.exports = { authentication, authorization }

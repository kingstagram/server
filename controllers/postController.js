const Post = require('../models/post')
const gcsDelete = require('../helpers/gcsDelete')

class PostController {

    static addPost(req, res, next) {
        let userId = req.loggedUser.id
        let { caption } = req.body
        let imageUrl = req.file.cloudStoragePublicUrl
    
        Post.create({
          userId, caption, imageUrl
        })
          .then(post => {
            res.status(201).json(post)
          })
          .catch(next)
    }

    static showAll(req, res, next) {
        Post.find()
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(next)
    }

    static showPostUser(req, res, next) {
        Post.find({userId: req.loggedUser._id})
            .then(posts => {
                res.status(200).json(posts)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const _id = req.params.postId
        const obj = req.bdoy
        Post.findByIdAndUpdate({_id}, obj, {new: true})
            .then(post => {
                res.status(200).json(post)
            })
            .catch(next)
    }

    static likeDislike(req, res, next) {
        const _id = req.params.postId;
        const loginUser = req.loggedUser.id
        let pass = true
        Post.findById(_id)
          .then(post => {
            for (let i = 0; i < post.likes.length; i++) {
              if (post.likes[i] == req.loggedUser.id) pass = false;
            }
            if (!pass) {
              return Post.findByIdAndUpdate(id, { $pull: { likes: loginUser } });
            } else {
              return Post.findByIdAndUpdate(id, { $push: { likes: loginUser } });
            }
          })
          .then(() => {
            if (!pass) res.status(200).json({ msg: 'UnLike succes' })
            else res.status(200).json({ msg: 'Like succes' })
          })
          .catch(next)
    }

    static delete(req, res, next) {
        let _id = req.params.postId
        Post.findById(_id)
          .then(result => {
            gcsDelete(result.imageUrl)
            return Post.findByIdAndDelete(id)
          })
          .then(() => {
            res.status(200).json("Delete post Success!")
          })
          .catch(next);
    }
}

module.exports = PostController
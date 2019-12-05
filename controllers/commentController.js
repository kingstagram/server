const Comment = require('../models/comment')

class CommentController {

    static add(req, res, next) {
        const obj = req.body
        obj.postId = req.params.postId
        obj.userId = req.loggedUser._id
        Comment.create(obj)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(next)
    }

    static showBasedPost(req, res, next) {
        Comment.find({postId: req.params.postId})
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        Comment.findByIdAndDelete(req.params.commentId)
            .then(result => {
                res.status(200).json(result)
            })
            .catch(next)
    }
}

module.exports = CommentController
const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = {
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: [true, 'content is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
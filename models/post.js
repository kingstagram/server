const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    imageUrl: {
        type: String,
        required: [true, 'image url is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    caption: {
        type: String,
        required: [true, 'caption is required']
    }
})

postSchema.pre('save', function(next){
    this.Likes = [];
    next()
  })

const Post = mongoose.model('Post', postSchema)

module.exports = Post
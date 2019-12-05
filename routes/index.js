const router = require('express').Router()
const userRouter = require('./user')
const postRouter = require('./post')
const commentRouter = require('./comment')


router.get('/', (req, res) => {
    res.send('hello')
})
router.use('/users', userRouter)
router.use('/post', postRouter)
router.use('/comments', commentRouter)

module.exports = router
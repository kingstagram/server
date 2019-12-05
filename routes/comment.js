const router = require('express').Router()
const CommentController = require('../controllers/commentController')
const { authentication, authorization } = require('../middlewares/auth')

router.use(authentication)
router.post('/add/:postId', CommentController.add)
router.get('/all/:postId', CommentController.showBasedPost)
router.delete('/:commentId', CommentController.delete)

module.exports = router
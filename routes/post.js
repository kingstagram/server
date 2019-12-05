const router = require('express').Router()
const PostController = require('../controllers/postController')

router.post('/add', PostController.addPost)
router.get('/user', PostController.showAll)
router.get('');


module.exports = router
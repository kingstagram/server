const router = require('express').Router()
const PostController = require('../controllers/postController')
const gcsUpload = require('gcs-upload')
const { authentication, authorization } = require('../middlewares/auth')

<<<<<<< HEAD
router.post('/add', PostController.addPost)
router.get('/user', PostController.showAll)
router.get('');
=======
const upload = gcsUpload({
    limits: {
      fileSize: 1e6 // in bytes
    },
    gcsConfig: {
      keyFilename: './keyfile.json',
      bucketName: process.env.BUCKET_NAME
    }
  })
>>>>>>> origin/server


router.use( authentication )
router.post('/add', upload.single('file'), PostController.addPost)
router.get('/all', PostController.showAll)
router.get('/mine', PostController.showPostUser)
router.put('/like/:postId', PostController.likeDislike)
router.put('/:postId', authorization, PostController.update)
router.delete('/:postId', authorization, PostController.delete)

module.exports = router
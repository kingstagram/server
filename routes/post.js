const router = require('express').Router();
const PostController = require('../controllers/postController');
const gcsUpload = require('gcs-upload');
const {authentication, authorization} = require('../middlewares/auth');

const upload = gcsUpload({
    limits: {
        fileSize: 1e6 // in bytes
    },
    gcsConfig: {
        keyFilename: './keyfile.json',
        bucketName: process.env.BUCKET_NAME
    }
});

router.use(authentication);
router.post('/add', upload.single('file'), PostController.addPost);
router.get('/mine', PostController.showPostUser);
router.get('/all', PostController.showAll);
router.put('/like/:postId', PostController.likeDislike);
router.put('/:postId', authorization, PostController.update);
router.delete('/:postId', authorization, PostController.delete);

module.exports = router;
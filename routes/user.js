const router = require('express').Router();
const userController = require('../controllers/userController');
const {authentication, authorization} = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.viewUser);
<<<<<<< HEAD
router.get('/:id', userController.findUser);
=======
router.get('/user', authentication, userController.myProfile)
>>>>>>> fc26a03bc92b4326b8fabea697da81e17af1b316


module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/userController');
const {authentication, authorization} = require('../middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.viewUser);
router.get('/:id', userController.findUser);
router.get('/user', authentication, userController.myProfile)


module.exports = router;
const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.viewUser);
router.get('/:id', userController.findUser);


module.exports = router;
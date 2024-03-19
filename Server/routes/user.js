const ControllerUser = require('../controllers/controllerUser');
const { authorizationAddUser, authentication } = require('../middlewares');
const router = require('express').Router();

router.post('/login', ControllerUser.login);
router.use(authentication);
router.post('/register', ControllerUser.addUser);

module.exports = router;

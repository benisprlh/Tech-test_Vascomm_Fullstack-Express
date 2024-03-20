const ControllerUser = require('../controllers/controllerUser');
const { authentication, authorization } = require('../middlewares');
const router = require('express').Router();

router.post('/login', ControllerUser.login);

router.post('/register', ControllerUser.register);

router.use(authentication, authorization);

router.put('/update/:id', ControllerUser.updateUser);

router.get('/getall', ControllerUser.getUsers)

router.get('/active', ControllerUser.getActive)

router.delete('/delete/:id', ControllerUser.deleteUser)

router.get('/:id', ControllerUser.getUserById)



module.exports = router;

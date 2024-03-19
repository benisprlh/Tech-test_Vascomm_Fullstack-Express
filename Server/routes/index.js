const router = require('express').Router();
const users = require('./user');
const products = require('./product');
const { errorHandler, authentication } = require('../middlewares');

router.use('/users', users);
router.use('/products', products);
router.use(errorHandler);

module.exports = router;

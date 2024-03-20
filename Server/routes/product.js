const router = require('express').Router();
const ControllerProduct = require('../controllers/controllerProduct');
const { authorization, authentication } = require('../middlewares');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('', ControllerProduct.getProducts);

router.get('/product/:id', ControllerProduct.getProduct);

router.use(authentication, authorization)

router.put('/:id',  upload.single('image'),ControllerProduct.updateProduct);

router.post('', upload.single('image'), ControllerProduct.addProduct);

router.delete('/:id', authorization, ControllerProduct.deleteProduct);


module.exports = router;

const router = require('express').Router();
const ControllerProduct = require('../controllers/controllerProduct');
const { authorization } = require('../middlewares');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// router.post('/', ControllerPost.addPost);

// router.get('/', ControllerPost.getPosts);

// router.get('/:id', ControllerPost.getPost);

// router.put('/:id', authorization, ControllerPost.updatePost);

// router.delete('/:id', authorization, ControllerPost.deletePost);

// router.patch('/:id', authorization, upload.single('image'), ControllerPost.updateUrlImage);

module.exports = router;

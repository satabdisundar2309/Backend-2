const express = require('express')
const router = express.Router()

const commentController = require('../controllers/commentsController')
const { postControllerGet, postControllerPost } = require('../controllers/postsController')
const { likeControllerLike, likeControllerUnlike } = require('../controllers/likesController')

router.post('/comments/create',commentController)
router.get('/posts/get', postControllerGet)
router.post('/posts/create', postControllerPost)
router.post('/likes/likePost', likeControllerLike)
router.post('/likes/unlikePost', likeControllerUnlike)
module.exports = router;
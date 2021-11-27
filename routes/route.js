const router = require('express').Router()
const AuthController = require('../controller/AuthController')


router.post('/register', AuthController.signUp)

router.post('/login', AuthController.signIn)

router.post('/amrx/:id', AuthController.User)
router.post('/amitier/:id', AuthController.Users)
router.post('/upd/:id', AuthController.Ans)
router.post('/upds/:id', AuthController.An)
router.get('/get/amrx/:id', AuthController.Response)
router.get('/get/amitier/:id', AuthController.Respond)
router.get('/get/listamrx/:id', AuthController.friendAmrx)
router.get('/get/listamitier/:id', AuthController.friendAmitier)
module.exports = router;
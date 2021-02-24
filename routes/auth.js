/**
 * Auth routes 
 * host + /api/auth
 */

const {Router} = require('express')
const router = Router();
const {createUser, login, refreshToken} = require('../controllers/authController');

router.post('/signup', createUser )
router.post('/', login)
router.get('/refresh/token', refreshToken)

module.exports = router;
const router = require('express').Router();
const {registration, login, getCurrentUserInfo} = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.post('/signup', registration);
router.post('/login', login);
router.get('/me', auth, getCurrentUserInfo);

module.exports = router;
const router = require('express').Router();
const {registration, login, getCurrentUserInfo} = require('../controllers/userController');

router.post('/signup', registration);
router.post('/login', login);
router.get('/me', getCurrentUserInfo);

module.exports = router;
const router = require('express').Router();
const {create, getAll, remove, getOne} = require('../controllers/deviceController');
const auth = require('../middlewares/auth');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, create);
router.delete('/:id', auth, remove);

module.exports = router;
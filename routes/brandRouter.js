const router = require('express').Router();
const { create, getAll, remove } = require('../controllers/brandController');
const auth = require('../middlewares/auth');

router.get('/', getAll);
router.post('/', auth, create);
router.delete('/:id', auth, remove);

module.exports = router;
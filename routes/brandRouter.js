const router = require('express').Router();
const { create, getAll, remove } = require('../controllers/brandController');
const checkRole = require('../middlewares/checkRole');

router.get('/', getAll);
router.post('/', checkRole, create);
router.delete('/:id', checkRole, remove);

module.exports = router;
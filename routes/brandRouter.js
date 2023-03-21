const router = require('express').Router();
const { create, getAll, remove } = require('../controllers/brandController');

router.get('/', getAll);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;
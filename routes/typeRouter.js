const router = require('express').Router();
const { create, getAll, remove } = require('../controllers/typeController');

router.get('/', getAll);
router.post('/', create);
router.delete('/', remove);

module.exports = router;
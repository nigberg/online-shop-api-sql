const router = require('express').Router();
const {create, getAll, remove, getOne} = require('../controllers/deviceController');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.delete('/:id', remove);

module.exports = router;
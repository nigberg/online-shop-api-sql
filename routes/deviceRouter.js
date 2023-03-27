const router = require('express').Router();
const {create, getAll, remove, getOne} = require('../controllers/deviceController');
const checkRole = require('../middlewares/checkRole');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', checkRole, create);
router.delete('/:id', checkRole, remove);

module.exports = router;
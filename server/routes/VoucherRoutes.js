const VoucherController = require('../controller/VoucherController');
const router = require('express').Router();

router.post('/', VoucherController.add);
router.get('/', VoucherController.get);
router.delete('/:id', VoucherController.remove);
router.put('/:id', VoucherController.update);

module.exports = router;

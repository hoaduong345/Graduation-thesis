const VoucherController = require('../controller/VoucherController');
const router = require('express').Router();

router.post('/', VoucherController.add);
router.get('/', VoucherController.get);
router.delete('/:id', VoucherController.remove);
router.put('/:id', VoucherController.update);


router.post('/savevoucher/:voucherId', VoucherController.SaveVoucher);


router.get('/getUser/:id',VoucherController.getSavedUser);

router.post('/usevoucher/:voucherId', VoucherController.UseVoucher);



module.exports = router;

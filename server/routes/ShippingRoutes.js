const ShippingController = require('../controller/ShippingController');
const router = require('express').Router();

router.post('/setStatus', ShippingController.setStatus);
router.post('/', ShippingController.getAllStatusForDelivery);
router.post('/manager', ShippingController.getAllStatusForAdmin)


router.post('/delete', ShippingController.requestDeleteOrder);
router.post('/confirmdelete', ShippingController.confirmDeleteOrder);

module.exports = router;

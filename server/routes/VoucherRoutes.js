const VoucherController = require('../controller/VoucherController');
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');

router.post('/', VoucherController.add);
router.get('/', VoucherController.get);
router.delete('/:id', VoucherController.remove);
router.put('/:id', VoucherController.update);
router.get('/pageUser', VoucherController.getUser);

router.get('/getSavedUser', VoucherController.getSavedUser);

router.get('/savevoucher/:voucherId', VoucherController.SaveVoucher);


router.post('/usevoucher', VoucherController.UseVoucher);

router.get('/VoucherExpired', VoucherController.VoucherExpired);

// router.post('/translate', VoucherController.translate);


module.exports = router;

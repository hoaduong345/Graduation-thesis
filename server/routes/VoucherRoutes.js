const VoucherController = require('../controller/VoucherController');
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cron = require('node-cron');

router.post('/', VoucherController.add);
router.get('/', VoucherController.get);
router.delete('/:id', VoucherController.remove);
router.put('/:id', VoucherController.update);


router.post('/savevoucher/:voucherId', VoucherController.SaveVoucher);


router.get('/getUser/:id',VoucherController.getSavedUser);

router.post('/usevoucher/:voucherId', VoucherController.UseVoucher);




router.get('/VoucherExpired',VoucherController.VoucherExpired);
    
  


module.exports = router;

const StatisticsController = require('../controller/Statistics_Controller');
const router = require('express').Router();

router.get('/', StatisticsController.getStatictics);

module.exports = router;

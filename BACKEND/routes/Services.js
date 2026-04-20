const express = require('express');
const auth = require('../middleware/auth');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', serviceController.getServices);
router.get('/:slug', serviceController.getServiceBySlug);

router.use(auth); // All below routes require auth
router.post('/', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
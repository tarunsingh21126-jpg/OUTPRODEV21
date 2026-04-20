const express = require('express');
const auth = require('../middleware/auth');
const testimonialController = require('../controllers/testimonialController');

const router = express.Router();

router.get('/', testimonialController.getTestimonials);
router.get('/:id', testimonialController.getTestimonialById);

router.use(auth); // All below routes require auth
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;

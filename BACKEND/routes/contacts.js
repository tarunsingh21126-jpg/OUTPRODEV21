const express = require('express');
const auth = require('../middleware/auth');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Public routes
router.post('/', contactController.createContact);
router.get('/:id', contactController.getContactById);

router.use(auth); // All below routes require auth
router.get('/', contactController.getContacts);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
router.patch('/:id/mark-read', contactController.markAsRead);

module.exports = router;

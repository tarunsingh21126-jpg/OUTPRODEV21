const express = require('express');
const auth = require('../middleware/auth');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.use(auth); // All routes require authentication

// Protected routes
router.post('/', contactController.createContact);
router.get('/', contactController.getContacts);
router.get('/:id', contactController.getContactById);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
router.patch('/:id/mark-read', contactController.markAsRead);

module.exports = router;

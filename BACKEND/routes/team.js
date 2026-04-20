const express = require('express');
const auth = require('../middleware/auth');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', teamController.getTeamMembers);
router.get('/:id', teamController.getTeamMemberById);

router.use(auth); // All below routes require auth
router.post('/', teamController.createTeamMember);
router.put('/:id', teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;

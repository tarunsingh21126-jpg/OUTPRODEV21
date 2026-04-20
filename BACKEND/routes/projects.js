const express = require('express');
const auth = require('../middleware/auth');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.get('/:slug', projectController.getProjectBySlug);

router.use(auth); // All below routes require auth
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;

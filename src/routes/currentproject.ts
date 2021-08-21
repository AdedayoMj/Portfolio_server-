import express from 'express';
import controller from '../controllers/currentproject';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:currentID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:currentID', controller.update);
router.delete('/:currentID', controller.deleteProject);

export = router;
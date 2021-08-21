import express from 'express';
import controller from '../controllers/about';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:aboutID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:aboutID', controller.update);
router.delete('/:aboutID', controller.deleteAboutInfo);

export = router;
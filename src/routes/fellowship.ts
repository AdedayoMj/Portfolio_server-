import express from 'express';
import controller from '../controllers/fellowship';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:fellowID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:fellowID', controller.update);
router.delete('/:fellowID', controller.deleteFellowship);

export = router;
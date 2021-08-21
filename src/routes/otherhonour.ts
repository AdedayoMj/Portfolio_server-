import express from 'express';
import controller from '../controllers/otherhonour';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:otherID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:otherID', controller.update);
router.delete('/:otherID', controller.deleteOtherHonour);

export = router;
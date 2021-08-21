import express from 'express';
import controller from '../controllers/member';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:memberID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:memberID', controller.update);
router.delete('/:memberID', controller.deleteMembership);

export = router;
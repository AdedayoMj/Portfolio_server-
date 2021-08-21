import express from 'express';
import controller from '../controllers/award';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:awardID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:awardID', controller.update);
router.delete('/:awardID', controller.deleteAward);

export = router;
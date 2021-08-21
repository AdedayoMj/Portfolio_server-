import express from 'express';
import controller from '../controllers/sightandsounds';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:sightID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:sightID', controller.update);
router.delete('/:sightID', controller.deleteSightSound);

export = router;
import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/read/:articleID', controller.read);
router.post('/create', controller.create);
router.post('/query', controller.query);
router.patch('/update/:articleID', controller.update);
router.delete('/:articleID', controller.deleteArticle);

export = router;
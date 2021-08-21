import express from 'express';
import multer from 'multer';
import controller from '../controllers/sightandsounds';

const router = express.Router();
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        const path =process.cwd() +'/uploads/';
        cb(null, path)
    },
    
    filename: function (req: any, file: any, cb: any) {
        const fileName=file.originalname.toLowerCase().split(' ').join('-')
        cb(null,+ Date.now()+'-' +fileName)
    }
})

const fileFilter = (req: any,file: any,cb: any) => {
    if(!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)){
        cb(new Error("Only image files are allowed"),false);
    }
     
    cb(null, true);

     
}
const upload = multer({storage: storage,limits:{fileSize:1024*1024*5}, fileFilter : fileFilter});

router.get('/', controller.readAll);
router.get('/read/:sightID', controller.read);
router.post('/create',upload.single('picture'), controller.create);
router.post('/query', controller.query);
router.patch('/update/:sightID', controller.update);
router.delete('/:sightID', controller.deleteSightSound);

export = router;
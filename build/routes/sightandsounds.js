"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sightandsounds_1 = __importDefault(require("../controllers/sightandsounds"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const path = process.cwd() + '/uploads/';
        cb(null, path);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, +Date.now() + '-' + fileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(JPG|jpg|jpeg|png|gif)$/)) {
        cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
};
const upload = multer_1.default({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 }, fileFilter: fileFilter });
router.get('/', sightandsounds_1.default.readAll);
router.get('/read/:sightID', sightandsounds_1.default.read);
router.post('/create', upload.single('picture'), sightandsounds_1.default.create);
router.post('/query', sightandsounds_1.default.query);
router.patch('/update/:sightID', sightandsounds_1.default.update);
router.delete('/:sightID', sightandsounds_1.default.deleteSightSound);
module.exports = router;
//# sourceMappingURL=sightandsounds.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const about_1 = __importDefault(require("../controllers/about"));
const router = express_1.default.Router();
router.get('/', about_1.default.readAll);
router.get('/read/:aboutID', about_1.default.read);
router.post('/create', about_1.default.create);
router.post('/query', about_1.default.query);
router.patch('/update/:aboutID', about_1.default.update);
router.delete('/:aboutID', about_1.default.deleteAboutInfo);
module.exports = router;
//# sourceMappingURL=about.js.map
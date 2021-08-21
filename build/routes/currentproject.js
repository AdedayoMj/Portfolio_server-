"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const currentproject_1 = __importDefault(require("../controllers/currentproject"));
const router = express_1.default.Router();
router.get('/', currentproject_1.default.readAll);
router.get('/read/:currentID', currentproject_1.default.read);
router.post('/create', currentproject_1.default.create);
router.post('/query', currentproject_1.default.query);
router.patch('/update/:currentID', currentproject_1.default.update);
router.delete('/:currentID', currentproject_1.default.deleteProject);
module.exports = router;
//# sourceMappingURL=currentproject.js.map
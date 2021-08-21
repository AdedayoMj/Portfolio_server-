"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const otherhonour_1 = __importDefault(require("../controllers/otherhonour"));
const router = express_1.default.Router();
router.get('/', otherhonour_1.default.readAll);
router.get('/read/:otherID', otherhonour_1.default.read);
router.post('/create', otherhonour_1.default.create);
router.post('/query', otherhonour_1.default.query);
router.patch('/update/:otherID', otherhonour_1.default.update);
router.delete('/:otherID', otherhonour_1.default.deleteOtherHonour);
module.exports = router;
//# sourceMappingURL=otherhonour.js.map
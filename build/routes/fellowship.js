"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const fellowship_1 = __importDefault(require("../controllers/fellowship"));
const router = express_1.default.Router();
router.get('/', fellowship_1.default.readAll);
router.get('/read/:fellowID', fellowship_1.default.read);
router.post('/create', fellowship_1.default.create);
router.post('/query', fellowship_1.default.query);
router.patch('/update/:fellowID', fellowship_1.default.update);
router.delete('/:fellowID', fellowship_1.default.deleteFellowship);
module.exports = router;
//# sourceMappingURL=fellowship.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const member_1 = __importDefault(require("../controllers/member"));
const router = express_1.default.Router();
router.get('/', member_1.default.readAll);
router.get('/read/:memberID', member_1.default.read);
router.post('/create', member_1.default.create);
router.post('/query', member_1.default.query);
router.patch('/update/:memberID', member_1.default.update);
router.delete('/:memberID', member_1.default.deleteMembership);
module.exports = router;
//# sourceMappingURL=member.js.map
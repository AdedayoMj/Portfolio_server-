"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const award_1 = __importDefault(require("../controllers/award"));
const router = express_1.default.Router();
router.get('/', award_1.default.readAll);
router.get('/read/:awardID', award_1.default.read);
router.post('/create', award_1.default.create);
router.post('/query', award_1.default.query);
router.patch('/update/:awardID', award_1.default.update);
router.delete('/:awardID', award_1.default.deleteAward);
module.exports = router;
//# sourceMappingURL=award.js.map
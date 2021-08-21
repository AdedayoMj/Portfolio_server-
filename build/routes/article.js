"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const article_1 = __importDefault(require("../controllers/article"));
const router = express_1.default.Router();
router.get('/', article_1.default.readAll);
router.get('/read/:articleID', article_1.default.read);
router.post('/create', article_1.default.create);
router.post('/query', article_1.default.query);
router.patch('/update/:articleID', article_1.default.update);
router.delete('/:articleID', article_1.default.deleteArticle);
module.exports = router;
//# sourceMappingURL=article.js.map
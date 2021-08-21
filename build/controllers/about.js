"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const logging_1 = __importDefault(require("../config/logging"));
const about_1 = __importDefault(require("../models/about"));
const mongoose_1 = __importDefault(require("mongoose"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer_1.default({ storage: storage, fileFilter: fileFilter });
const create = (upload.array('picture', 1), (req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, content, resume, picture } = req.body;
    const about = new about_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        content,
        resume,
        picture
    });
    return about
        .save()
        .then((newAbout) => {
        logging_1.default.info(`New Bio info created`);
        return res.status(201).json({ about: newAbout });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.aboutID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    about_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((about) => {
        if (about) {
            return res.status(200).json({ about });
        }
        else {
            return res.status(404).json({
                error: 'Information not found.'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            error: error.message
        });
    });
};
const readAll = (req, res, next) => {
    logging_1.default.info('Returning all About page information ');
    about_1.default.find()
        .populate('author')
        .exec()
        .then((about) => {
        return res.status(200).json({
            count: about.length,
            about: about
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const query = (req, res, next) => {
    logging_1.default.info('Query route called');
    about_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((aboutID) => {
        return res.status(200).json({
            count: aboutID.length,
            aboutID: aboutID
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const update = (req, res, next) => {
    logging_1.default.info('Update route called');
    const _id = req.params.aboutID;
    about_1.default.findById(_id)
        .exec()
        .then((about) => {
        if (about) {
            about.set(req.body);
            about.save()
                .then((savedAbout) => {
                logging_1.default.info(`About with id ${_id} updated`);
                return res.status(201).json({
                    about: savedAbout
                });
            })
                .catch((error) => {
                logging_1.default.error(error.message);
                return res.status(500).json({
                    message: error.message
                });
            });
        }
        else {
            return res.status(401).json({
                message: 'NOT FOUND'
            });
        }
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
const deleteAboutInfo = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.aboutID;
    about_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'About deleted'
        });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
};
exports.default = {
    create,
    read,
    readAll,
    query,
    update,
    deleteAboutInfo
};
//# sourceMappingURL=about.js.map
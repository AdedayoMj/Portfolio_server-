"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const member_1 = __importDefault(require("../models/member"));
const mongoose_1 = __importDefault(require("mongoose"));
const create = ((req, res, next) => {
    logging_1.default.info('Attempting to create blog ...');
    let { author, title, year } = req.body;
    const member = new member_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
        title,
        year
    });
    return member
        .save()
        .then((newMember) => {
        logging_1.default.info(`New Bio info created`);
        return res.status(201).json({ member: newMember });
    })
        .catch((error) => {
        logging_1.default.error(error.message);
        return res.status(500).json({
            message: error.message
        });
    });
});
const read = (req, res, next) => {
    const _id = req.params.memberID;
    logging_1.default.info(`Incoming read for information with id ${_id}`);
    member_1.default.findById(_id)
        .populate('author')
        .exec()
        .then((member) => {
        if (member) {
            return res.status(200).json({ member });
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
    member_1.default.find()
        .populate('author')
        .exec()
        .then((member) => {
        return res.status(200).json({
            count: member.length,
            member: member
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
    member_1.default.find(req.body)
        .populate('author')
        .exec()
        .then((memberID) => {
        return res.status(200).json({
            count: memberID.length,
            memberID: memberID
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
    const _id = req.params.memberID;
    member_1.default.findById(_id)
        .exec()
        .then((member) => {
        if (member) {
            member.set(req.body);
            member.save()
                .then((savedMember) => {
                logging_1.default.info(`Membership with id ${_id} updated`);
                return res.status(201).json({
                    member: savedMember
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
const deleteMembership = (req, res, next) => {
    logging_1.default.warn('Delete route called');
    const _id = req.params.memberID;
    member_1.default.findByIdAndDelete(_id)
        .exec()
        .then(() => {
        return res.status(201).json({
            message: 'Fellowship deleted'
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
    deleteMembership
};
//# sourceMappingURL=member.js.map
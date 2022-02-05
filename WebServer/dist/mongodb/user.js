"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.findOne = exports.save = void 0;
const mongodb_1 = require("mongodb");
const user_1 = require("./schema/user");
const mongo_1 = __importDefault(require("./mongo"));
// 新增
const save = async (info) => {
    try {
        await (0, mongo_1.default)();
        const user = new user_1.User(Object.assign({ _id: new mongodb_1.ObjectId() }, info));
        const saveUser = await user.save();
        return saveUser;
    }
    catch (error) {
        return undefined;
    }
};
exports.save = save;
const findOne = async (info) => {
    try {
        await (0, mongo_1.default)();
        const user = await user_1.User.findOne(info);
        return user;
    }
    catch (error) {
        return undefined;
    }
};
exports.findOne = findOne;
const updateOne = async (id, info) => {
    try {
        const user = await user_1.User.updateOne({ _id: id }, info);
        if (user) {
            const newUser = await (0, exports.findOne)({ _id: id });
            return newUser;
        }
        else {
            return undefined;
        }
    }
    catch (error) {
        return undefined;
    }
};
exports.updateOne = updateOne;
// 级联查询
// export const fetchStudentDetail = async (ctx, next) => {
//     // 利用populate来查询关联info的数据
//     const students = await Student.find({})
//         .populate({
//             path: 'info',
//             select: 'hobby height weight',
//         })
//         .exec();
//     if (students.length) {
//         ctx.body = {
//             success: true,
//             student: students,
//         };
//     } else {
//         ctx.body = {
//             success: false,
//         };
//     }
// };
//# sourceMappingURL=user.js.map
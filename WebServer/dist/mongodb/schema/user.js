"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = __importStar(require("../../utils/config"));
const ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.UserSchema = new mongoose_1.Schema({
    _id: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    // email: {
    //     type: String,
    //     default: '',
    //     match: /^\w+@\w+$/,
    // },
    tel: {
        type: String,
        default: '',
        trim: true,
        minlength: 11,
    },
    pwd: {
        type: String,
        required: true,
        match: /^\w{6,}$/,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    // info: {
    //     type: ObjectId,
    //     ref: 'Info',
    // },
});
exports.UserSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createdAt = new Date();
    }
    next();
});
exports.UserSchema.methods.createToken = function () {
    return jsonwebtoken_1.default.sign({
        id: this.id,
        name: this.name,
        tel: this.tel,
        email: this.email,
        pwd: this.pwd,
    }, config.secret, { expiresIn: '2h' });
};
exports.UserSchema.methods.token2info = function (token) {
    return jsonwebtoken_1.default.decode(token);
};
exports.User = (0, mongoose_1.model)('users', exports.UserSchema, 'users');
//# sourceMappingURL=user.js.map
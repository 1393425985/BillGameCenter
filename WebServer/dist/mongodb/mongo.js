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
const mongoose_1 = __importDefault(require("mongoose"));
const config = __importStar(require("@/utils/config"));
// 同步引入 info model和 studen model
const connect = async () => {
    return new Promise((resolve, reject) => {
        mongoose_1.default.set('debug', true);
        mongoose_1.default.connect(config.mongodb.dbpath);
        mongoose_1.default.connection.on('disconnected', () => {
            reject();
        });
        mongoose_1.default.connection.on('error', err => {
            reject();
        });
        mongoose_1.default.connection.once('open', async () => {
            resolve(1);
        });
    }).then(() => { }, () => {
        console.log('连接数据库失败');
    });
};
exports.default = connect;
//# sourceMappingURL=mongo.js.map
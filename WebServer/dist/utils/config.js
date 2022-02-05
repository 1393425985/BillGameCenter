"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.img = exports.mongodb = exports.secret = exports.port = void 0;
const mainHost = '124.222.33.93';
exports.port = 3000;
exports.secret = 'bill';
exports.mongodb = {
    dbpath: `mongodb://web:123456@${mainHost}:27017/data`,
    username: 'web',
    password: '123456',
};
exports.img = {
    host: `http://${mainHost}/`
};
//# sourceMappingURL=config.js.map
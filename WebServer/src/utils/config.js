"use strict";
exports.__esModule = true;
exports.img = exports.mongodb = exports.secret = exports.port = void 0;
var mainHost = '124.222.33.93';
exports.port = 3000;
exports.secret = 'bill';
exports.mongodb = {
    dbpath: "mongodb://web:123456@".concat(mainHost, ":27017/data"),
    username: 'web',
    password: '123456'
};
exports.img = {
    host: "http://".concat(mainHost, "/")
};

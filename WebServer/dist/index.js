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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_views_1 = __importDefault(require("koa-views"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const ws_1 = __importDefault(require("ws"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config = __importStar(require("./utils/config"));
require("@/mongodb/types/api.d.ts");
class Server {
    constructor() {
        this.app = new koa_1.default();
        this.router = new koa_router_1.default();
        this.wss = undefined;
        this.wssAliveInterval = undefined;
        this.init();
    }
    init() {
        this.initRouter();
        this.initMiddle();
        this.initEvent();
        const server = this.initListen();
        // this.initWS(server);
    }
    initRouter() {
        this.router.get('/', async (ctx) => {
            //   重定向
            //   ctx.response.redirect(url);
            await ctx.render('index', {});
        });
        this.router.get('/exception/:status', async (ctx) => {
            await ctx.render('index', {});
        });
        const routers = fs_1.default.readdirSync(__dirname + '/routers');
        routers.forEach((element) => {
            if (/\.(t|j)s$/.test(element)) {
                const module = require(__dirname + '/routers/' + element);
                this.router.use('/api/' + element.replace(/\.(t|j)s$/, ''), module.routes(), module.allowedMethods());
            }
        });
    }
    initMiddle() {
        // gzip
        this.app.use((0, koa_compress_1.default)({ threshold: 2048 }));
        // logger
        this.app.use(async (ctx, next) => {
            await next();
            const rt = ctx.response.get('X-Response-Time');
            console.log(`${ctx.method} ${ctx.url} - ${rt}`);
        });
        // x-response-time
        this.app.use(async (ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });
        // token验证
        // this.app.use(async (ctx, next) => {
        //     const token = ctx.cookies.get('token');
        //     // TODO 验证token 已用jwt替代
        //     await next();
        // });
        // 加载视图
        this.app.use((0, koa_views_1.default)(path_1.default.join(__dirname, './www'), {
            map: { html: 'ejs' },
        }));
        // error
        this.app.use(async (ctx, next) => {
            try {
                await next();
            }
            catch (err) {
                ctx.response.status = err.statusCode || err.status || 500;
                let msg = err.message;
                if (err.status === 401) {
                    msg = 'Protected resource, use Authorization header to get access\n';
                }
                ctx.response.body = {
                    success: false,
                    showType: 4,
                    errorMessage: msg,
                };
                // 手动触发err订阅事件
                ctx.app.emit('error', err, ctx);
            }
        });
        // 格式化输出
        this.app.use(async (ctx, next) => {
            await next();
            if (ctx.type === 'application/json') {
                ctx.body = Object.assign({
                    data: null,
                    success: true,
                }, (ctx.body && typeof ctx.body === 'string'
                    ? JSON.parse(ctx.body)
                    : ctx.body) || {});
            }
        });
        // 解析formdata body 上传文件
        this.app.use((0, koa_body_1.default)({
            multipart: true, // 支持文件上传
            // encoding: 'gzip',
            // formidable: {
            //     uploadDir: path.join(__dirname, 'upload/'), // 设置文件上传目录
            //     keepExtensions: true, // 保持文件的后缀
            //     maxFieldsSize: 20 * 1024 * 1024, // 文件上传大小
            //     onFileBegin: (name, file) => {
            //         // 文件上传前的设置
            //         // console.log(`name: ${name}`);
            //         // console.log(file);
            //     },
            // },
        }));
        // jwt 解析
        this.app.use((0, koa_jwt_1.default)({
            secret: config.secret,
        }).unless({
            path: [
                /^\/api\/user\/login/,
                /^\/api\/user\/register/,
                /^((?!\/api).)*$/,
            ],
        }));
        //嵌套路由
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());
        this.app.use(async (ctx, next) => {
            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Access-Control-Allow-Headers', '*');
            await next();
        });
        //koa静态文件中间件
        this.app.use((0, koa_static_1.default)(path_1.default.join(__dirname, './www')));
        this.app.use((0, koa_static_1.default)(path_1.default.join(__dirname, './static')));
        this.app.use((0, koa_static_1.default)(path_1.default.join(__dirname, './upload')));
    }
    initEvent() {
        this.app.on('error', (err) => {
            console.log('logging error ', err.message);
        });
    }
    initListen() {
        console.log('Server running on port 3000');
        return this.app.listen(config.port);
    }
    initWS(server) {
        this.wss = new ws_1.default.Server({ server });
        function noop() { }
        function heartbeat() {
            this.isAlive = true;
        }
        this.wss.on('connection', (ws) => {
            ws.isAlive = true;
            ws.on('pong', heartbeat);
            ws.on('message', (message) => {
                console.log('received: %s', message);
                // wss.clients.forEach(function each(client) {
                //   if (client.readyState === WebSocket.OPEN) {
                //     client.send(data);
                //   }
                // });
            });
            ws.on('close', () => { });
            ws.send('something');
        });
        this.wssAliveInterval = setInterval(() => {
            this.wss.clients.forEach((ws) => {
                if (ws.isAlive === false) {
                    return ws.terminate();
                }
                ws.isAlive = false;
                ws.ping(noop);
            });
        }, 30000);
    }
}
exports.default = new Server();
//# sourceMappingURL=index.js.map
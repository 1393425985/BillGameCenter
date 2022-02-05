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
const koa_router_1 = __importDefault(require("koa-router"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userControler = __importStar(require("../mongodb/user"));
const router = new koa_router_1.default();
router.post('/register', async (ctx) => {
    const params = ctx.request.body;
    const rs = {
        success: false,
        showType: 0,
    };
    if (!params.tel || !params.pwd || !params.name) {
        rs.errorMessage = '参数不合法';
    }
    else {
        const aliveUser = await userControler.findOne({
            tel: params.tel,
        });
        if (aliveUser) {
            rs.errorMessage = '手机号已存在';
            rs.showType = 1;
        }
        else {
            const result = await userControler.save(params);
            if (result) {
                const token = result.createToken();
                rs.success = true;
                rs.data = { token, info: result.token2info(token) };
                rs.errorMessage = '注册成功';
                rs.showType = 2;
            }
            else {
                rs.errorMessage = '注册失败';
                rs.showType = 2;
            }
        }
    }
    ctx.body = rs;
});
router.post('/login', async (ctx) => {
    // // 设置 cookie
    // ctx.cookies.set('token', 'bill', {
    //   expires: new Date(), // 时间
    //   path: '/', // 路径
    //   domain: '0.0.0.0', // 域
    //   httpOnly: true, // 禁止js获取
    // });
    const params = ctx.request.body;
    const rs = {
        success: false,
        showType: 0,
    };
    if (params.token || (params.tel && params.pwd)) {
        if (params.token) {
            const info = jsonwebtoken_1.default.decode(params.token);
            params.tel = info.tel;
            params.pwd = info.pwd;
        }
        const result = await userControler.findOne({
            tel: params.tel,
            pwd: params.pwd,
        });
        if (result) {
            const token = result.createToken();
            rs.success = true;
            rs.data = { token, info: result.token2info(token) };
            rs.errorMessage = '登录成功';
            rs.showType = 2;
        }
        else {
            rs.errorMessage = '用户名或密码错误';
            rs.showType = 2;
        }
    }
    else {
        rs.errorMessage = '参数不合法';
    }
    ctx.body = rs;
});
// 注销
router.post('/logout', async (ctx) => {
    console.log(ctx.state.user);
    const rs = {
        success: true,
        showType: 2,
        errorMessage: '注销成功',
    };
});
// 获取信息
router.get('/userInfo', (ctx) => {
    const token = ctx.header.authorization;
    ctx.body = {
        data: { token: token, user: ctx.state.user },
    };
    //使用jwt-simple自行解析数据
    //  let payload = jwt.decode(token.split(' ')[1], jwtSecret);
    //   console.log(payload)
});
// 跟新
// type updateParams = Partial<UserType.Model>;
// router.post('/update', async (ctx) => {
//   const params: updateParams = ctx.request.body;
//   const result = await userControler.updateOne(ctx.state.user.id, params);
//   if (result) {
//     const token = result.createToken();
//     ctx.body = {
//       data: { token, info: result.token2info(token) },
//       msg: '更新成功',
//     };
//   } else {
//     ctx.body = {
//       success: false,
//       msg: '更新失败',
//     };
//   }
// });
module.exports = router;
//# sourceMappingURL=user.js.map
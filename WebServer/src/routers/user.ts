import koaRouter from 'koa-router';
import jwt from 'jsonwebtoken';
import * as userControler from '../mongodb/user';
import {UserService} from '@@@/user';
import Wrap from '../index';

const router = new koaRouter();

// 注册

router.post('/register', async (ctx) => {
  const params: UserService.RegisterParams = ctx.request.body;
  const rs: UserService.RegisterRs = {
    success: false,
    showType: 0,
  };
  if (!params.tel || !params.pwd || !params.name) {
    rs.errorMessage = '参数不合法';
  } else {
    const aliveUser = await userControler.findOne({
      tel: params.tel,
    });
    if (aliveUser) {
      rs.errorMessage = '手机号已存在';
      rs.showType = 1;
    } else {
      const result = await userControler.save(params);
      if (result) {
        const token = result.createToken();
        rs.success = true;
        rs.data = { token, info: result.token2info(token) };
        rs.errorMessage = '注册成功';
        rs.showType = 2;
      } else {
        rs.errorMessage = '注册失败';
        rs.showType = 2;
      }
    }
  }
  ctx.body = rs;
});
// 登录
router.post('/login', async (ctx) => {
  // // 设置 cookie
  // ctx.cookies.set('token', 'bill', {
  //   expires: new Date(), // 时间
  //   path: '/', // 路径
  //   domain: '0.0.0.0', // 域
  //   httpOnly: true, // 禁止js获取
  // });
  const params: UserService.LoginParams = ctx.request.body;
  const rs: UserService.LoginRs = {
    success: false,
    showType: 0,
  };
  if (params.token || (params.tel && params.pwd)) {
    if (params.token) {
      const info = jwt.decode(params.token) as UserService.LoginParams;
      
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
    } else {
      rs.errorMessage = '用户名或密码错误';
      rs.showType = 2;
    }
  } else {
    rs.errorMessage = '参数不合法';
  }
  ctx.body = rs;
});

// 注销
router.post('/logout', async (ctx) => {
  console.log(ctx.state.user);
  const rs: UserService.LogoutRs = {
    success: true,
    showType: 2,
    errorMessage: '注销成功',
  };
  ctx.body = rs;
});

// 获取信息
router.get('/userInfo', async (ctx) => {
  const rs: UserService.UserInfoRs = {
    success: false,
    showType: 0,
  };
  const result = await userControler.findOne({
    _id: ctx.state.user.id
  });
  if(result){
    rs.success = true;
    rs.data = {
      info:{
        _id: result._id,
        name: result.name,
        gender: result.gender,
      }
    }
  }
  // const token = ctx.header.authorization;
  ctx.body = rs;
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

import { dynamic } from 'umi';
const Page = dynamic({
  loader: async function () {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 LoginHome 以这个名字单独拆出去
    const { default: LoginHome } = await import(
      /* webpackChunkName: "LoginHome" */ './home'
    );
    return LoginHome;
  },
})
export default Page;

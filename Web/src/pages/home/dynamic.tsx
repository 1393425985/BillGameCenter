import { dynamic } from 'umi';
const Page = dynamic({
  loader: async function () {
    // 这里的注释 webpackChunkName 可以指导 webpack 将该组件 Home 以这个名字单独拆出去
    const { default: Home } = await import(
      /* webpackChunkName: "Home" */ './home'
    );
    return Home;
  },
})
export default Page;

import { defineConfig } from 'umi';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'BGC',
  outputPath: '../WebServer/src/www',
  routes: [
    { path: '/login', component: '@/pages/login' },
    {
      path: '/home',
      component: '@/pages/home',
      wrappers: ['@/wrappers/auth', '@/wrappers/nav'],
    },
    {
      path: '/history',
      component: '@/pages/home',
      wrappers: ['@/wrappers/auth', '@/wrappers/nav'],
    },
    {
      path: '/knapsack',
      component: '@/pages/home',
      wrappers: ['@/wrappers/auth', '@/wrappers/nav'],
    },
    {
      path: '/user',
      component: '@/pages/home',
      wrappers: ['@/wrappers/auth', '@/wrappers/nav'],
    },
    { path: '/', redirect: '/home' },
  ],
  // antd:{mobile:false},
  // plugins: ['antd-mobile'],
  fastRefresh: {},
  dynamicImport: {},
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  workerLoader: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  mfsu: {},
});

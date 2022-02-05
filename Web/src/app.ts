import { RequestConfig, history } from 'umi';
import { Toast } from 'antd-mobile';
import { APIType } from '@@@/api';
/**
 * 异常处理程序
 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const alertMsg = (
  success: boolean,
  type: APIType.format['showType'],
  content: string,
  title?: string,
) => {
  if (type! > 0) {
    Toast.show({
      icon: success ? 'success' : 'fail',
      content,
    });
  }
};

const errorHandler = (error: any) => {
  const { response } = error as {
    response: any;
  };
  if (error.request?.options.skipErrorHandler) {
    return;
  }

  // console.log(error.data, response.status);
  if (!response) {
    alertMsg(false, 2, '网络繁忙');
  } else {
    const data: APIType.format = error.data;
    if (response.status === 401) {
      sessionStorage.setItem('backpath', location.pathname);
      history.push('/login');
    }
    alertMsg(false, data.showType, data.errorMessage!);
  }
  throw error;
};

export const request: RequestConfig = {
  //   timeout: 1000,
  // errorConfig: {  },
  errorHandler,
  //   middlewares: [],
  requestInterceptors: [
    (url, options) => {
      const o = options ?? {};
      const headers = o.headers ?? {};
      return {
        url,
        options: {
          ...o,
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      };
    },
  ],
  //   responseInterceptors: [],
  // requestInterceptors: [],
};

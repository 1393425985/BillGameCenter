import { request } from 'umi';
import { UserService } from '@@@/user';
export async function fetchUserInfo() {
  return request<UserService.UserInfoRs>('/api/user/userInfo', {
    // prefix,
    method: 'GET',
    // skipErrorHandler: true,
    // showType: 4,
  });
}
export async function fetchLogin(params: UserService.LoginParams) {
  return request<UserService.LoginRs>('/api/user/login', {
    // prefix,
    method: 'POST',
    data: params,
    // skipErrorHandler: true,
    // showType: 4,
  });
}
export async function fetchRegister(params: UserService.RegisterParams) {
  return request<UserService.RegisterRs>('/api/user/register', {
    method: 'POST',
    data: params,
    // skipErrorHandler: true,
    // showType: 4,
  });
}
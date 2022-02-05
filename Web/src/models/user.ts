import { useState, useCallback, useEffect } from 'react';
import { useRequest, history } from 'umi';
import { fetchLogin, fetchUserInfo, fetchRegister } from '@/service/user';
import { UserService } from '@@@/user';
import { WSType } from '@@@/api';

const defaultAsyncStatus = {
  loginLoading: false,
  userInfoLoading: true,
  registerLoading: false,
};
function useUserModel() {
  const [userInfo, setUserInfo] = useState<UserService.UserInfoRs['data']>();
  const [wsStatus, setWsStatus] = useState(false);
  const [asyncStatus, setAsyncStatus] = useState(defaultAsyncStatus);
  const { run: getUserInfo } = useRequest(fetchUserInfo, {
    manual: true,
    onSuccess: (result) => {
      setUserInfo(result!);
      setAsyncStatus((l) => ({ ...l, userInfoLoading: false }));
      const ws = new WebSocket('ws://localhost:3001');
      window.ws = ws;
      ws.onopen = () => {
        console.log('ws success');
        ws.send(
          JSON.stringify({
            type: 'open',
            data: {
              id: result?.info._id,
              name: result?.info.name,
            },
          } as WSType.open),
        );
        setWsStatus(true);
      };
      ws.onerror = () => {
        window.ws = undefined;
        setWsStatus(false);
      };
      ws.onclose = () => {
        window.ws = undefined;
        setWsStatus(false);
      };
    },
    onError: () => {
      //   message.error('登录失败');
    },
  });

  const { run: register, loading: registerLoading } = useRequest(
    fetchRegister,
    {
      manual: true,
      onSuccess: (result) => {
        localStorage.setItem('token', result!.token);
        const backpath = sessionStorage.getItem('backpath');
        if (backpath) {
          history.push(backpath);
          sessionStorage.removeItem('backpath');
        } else {
          history.push('/');
        }
        getUserInfo();
      },
      onError: () => {},
    },
  );
  useEffect(() => {
    setAsyncStatus((l) => ({ ...l, registerLoading }));
  }, [registerLoading]);
  const { run: login, loading: loginLoading } = useRequest(fetchLogin, {
    manual: true,
    onSuccess: (result) => {
      localStorage.setItem('token', result!.token);
      const backpath = sessionStorage.getItem('backpath');
      if (backpath) {
        history.push(backpath);
        sessionStorage.removeItem('backpath');
      } else {
        history.push('/');
      }
      getUserInfo();
    },
    onError: () => {},
  });
  useEffect(() => {
    setAsyncStatus((l) => ({ ...l, loginLoading }));
  }, [loginLoading]);
  const signin = useCallback(async (tel?: string, pwd?: string) => {
    const token = localStorage.getItem('token');
    if (tel && pwd) {
      login({
        tel,
        pwd,
      });
    } else if (token) {
      login({ token });
    } else {
    }
  }, []);

  const signout = useCallback(() => {
    // setUser(undefined);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);

  return {
    userInfo,
    wsStatus,
    asyncStatus,
    signin,
    signout,
    register,
  };
}

export default useUserModel;

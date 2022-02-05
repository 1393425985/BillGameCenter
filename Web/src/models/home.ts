import { useState, useCallback, useEffect } from 'react';
import { useRequest, history } from 'umi';
import { fetchLogin, fetchUserInfo, fetchRegister } from '@/service/user';
import { UserService } from '@@@/user';
import { WSType } from '@@@/api';

const defaultAsyncStatus = {
};
function useHomeModel() {
  const [asyncStatus, setAsyncStatus] = useState(defaultAsyncStatus);
  const { run: getUserInfo } = useRequest(fetchUserInfo, {
    manual: true,
    onSuccess: (result) => {
      
    },
    onError: () => {
      //   message.error('登录失败');
    },
  });

  
//   useEffect(() => {
//     setAsyncStatus((l) => ({ ...l, loginLoading }));
//   }, [loginLoading]);


  useEffect(() => {
    // getUserInfo();
  }, []);

  return {
    asyncStatus
  };
}

export default useHomeModel;

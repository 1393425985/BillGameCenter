import React from 'react';
import { useModel } from 'umi';
import Spinner from '@/components/spinner';

const IndexPage = (props: React.PropsWithChildren<any>) => {
  const { asyncStatus, userInfo } = useModel('user');
  if (asyncStatus.userInfoLoading) {
    return (
      <div className="fullWrap">
        <Spinner spinning />
      </div>
    );
  } else {
    return props.children;
  }
};
export default IndexPage;

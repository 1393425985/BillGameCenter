import { useModel } from 'umi';
// import { ConfigProvider } from 'antd';
import Home from './dynamic';
import '../../theme/theme.less';
import './index.less';

const IndexPage = () => {

  return <Home />;
  // return user && projectId ? (
  //   <ConfigProvider componentSize="middle">
  //     <Home />
  //   </ConfigProvider>
  // ) : (
  //   <LoginLoading />
  // );
};
export default IndexPage;

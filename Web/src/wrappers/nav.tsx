import React from 'react';
import { useModel, useLocation, history } from 'umi';
import { Badge, TabBar } from 'antd-mobile';
import {
  AppOutline,
  ContentOutline,
  AppstoreOutline,
  UserCircleOutline,
  UserOutline,
} from 'antd-mobile-icons';
import styles from './nav.less';

const IndexPage = (props: React.PropsWithChildren<any>) => {
  const location = useLocation();
  console.log(location);
  return (
    <div className={styles.wrap}>
      <div className={styles.body}>{props.children}</div>
      <div className={styles.nav}>
        <TabBar
          activeKey={location.pathname}
          onChange={(key) => {
            history.push(key);
          }}
        >
          <TabBar.Item key="/home" icon={<AppOutline />} title="大厅" />
          <TabBar.Item key="/history" icon={<ContentOutline />} title="战绩" />
          <TabBar.Item
            key="/knapsack"
            icon={<AppstoreOutline />}
            title="背包"
          />
          <TabBar.Item key="/user" icon={<UserCircleOutline />} title="我的" />
        </TabBar>
      </div>
    </div>
  );
};
export default IndexPage;

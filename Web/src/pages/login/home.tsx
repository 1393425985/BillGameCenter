import { Form, Input, Button, CapsuleTabs } from 'antd-mobile';
import { useState } from 'react';
import { useModel } from 'umi';
import styles from './home.less';
import { UserType } from '@@@/user';

enum FormModeEnum {
  '登录',
  '注册',
}
const IndexPage = () => {
  const { asyncStatus, signin, register } = useModel('user');
  const [mode, setMode] = useState(FormModeEnum.登录);
  const isLogin = mode === FormModeEnum.登录;

  const onFinish = (values: UserType.Model) => {
    if (isLogin) {
      signin(values.tel, values.pwd);
    } else {
      register({
        ...values,
        gender: Number(values.gender) as 1,
      });
    }

    console.log(values);
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>科学工具</div>

      <div className={styles.body}>
        <Form
          onFinish={onFinish}
          layout="horizontal"
          footer={
            <div>
              <Button
                loading={
                  asyncStatus.loginLoading || asyncStatus.registerLoading
                }
                block
                type="submit"
                color="primary"
                size="large"
              >
                {isLogin ? '登录' : '注册'}
              </Button>
              <Button
                onClick={() => {
                  setMode(isLogin ? FormModeEnum.注册 : FormModeEnum.登录);
                }}
                block
                color="primary"
                fill="none"
                size="large"
              >
                {isLogin ? '注册' : '返回'}
              </Button>
            </div>
          }
        >
          <Form.Item
            name="tel"
            label={isLogin ? '' : '手机'}
            rules={[
              { required: true, message: '手机不能为空' },
              { pattern: new RegExp('^\\d{11}$'), message: '手机格式错误' },
            ]}
          >
            <Input type={'number'} placeholder="请输入手机" />
          </Form.Item>

          <Form.Item
            name="pwd"
            label={isLogin ? '' : '密码'}
            rules={[
              { required: true, message: '密码不能为空' },
              { max: 18, message: '18位以内' },
              { min: 6, message: '6位以上' },
            ]}
          >
            <Input type={'password'} placeholder="请输入密码" />
          </Form.Item>
          {isLogin ? null : (
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                { required: true, message: '姓名不能为空' },
                { max: 12, message: '姓名格式错误' },
              ]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
          )}
          {isLogin ? null : (
            <Form.Item name="gender" label="" valuePropName="activeKey">
              <CapsuleTabs>
                <CapsuleTabs.Tab title="男孩" key={1} />
                <CapsuleTabs.Tab title="女孩" key={0} />
              </CapsuleTabs>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};
export default IndexPage;

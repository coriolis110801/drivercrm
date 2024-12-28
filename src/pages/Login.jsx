import React from 'react';
import styles from '../style/Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { login } from '../apis/user';

const LoginComponent = (props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (values) => {
    const { username, password } = values;
    messageApi.info('登陆中。。。');
    try {
      const response = await login({
        username,
        password,
      });
      localStorage.setItem('access', response.access);
      localStorage.setItem('refresh', response.refresh);
      localStorage.setItem('user_info', JSON.stringify(response));
      messageApi.success('登陆成功。。。');
      props.history.push('/info/home');
    } catch (e) {
      messageApi.error('登录失败，请检查用户名或密码.');
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.LoginBox}>
        <h2>Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginComponent;

import React from 'react';
import styles from '../style/Login.module.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/reducers/userSlice';

const LoginComponent = (props) => {
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    const { username, password } = values;

    const response = await dispatch(userLogin({ username, password }));
    if (!response.error) {
      props.history.push('/info/home');
    }
  };

  return (
    <div className={styles.container}>
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

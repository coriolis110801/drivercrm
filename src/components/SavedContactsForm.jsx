import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import styles from '../style/SavedContactsForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateContactCustomer,
  updateResponseColor,
  updateResponseMessage,
} from '../store/reducers/contactSlice';

function SavedContactsForm() {
  const { responseMessage, responseColor } = useSelector(
    (state) => state.contact,
  );
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    const payload = { name: username, password };

    try {
      const data = await dispatch(updateContactCustomer(payload));

      let message;
      let color;
      switch (data.message) {
        case 'Wrong password':
          message = 'Password is wrong!';
          color = '#ff0000';
          break;
        case 'Customer updated successfully':
          message = 'Congrats, Customer updated successfully!';
          color = '#00ff00';
          break;
        case 'Customer not found':
          message = 'Sorry, Customer not found!';
          color = '#ffcc00';
          break;
        case 'Invalid request method':
          message = 'Invalid request, please try again.';
          color = '#ff00ff';
          break;
        default:
          message = JSON.stringify(data, null, 2);
          color = '#000000';
      }

      dispatch(updateResponseMessage(message));
      dispatch(updateResponseColor(color));
    } catch (error) {
      dispatch(updateResponseMessage(`Error: ${error.message}`));
      dispatch(updateResponseColor('#ff0000'));
    }
  };

  return (
    <div>
      <h3 className={styles.title}>AUTOSQUEAK Delivery Premium Upgrade</h3>
      <Form
        name="login"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
        }}
        onFinish={handleSubmit}
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
            Submit
          </Button>
        </Form.Item>
      </Form>
      {responseMessage && (
        <div
          id="response"
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            backgroundColor: '#f2f2f2',
            whiteSpace: 'pre-wrap',
            color: responseColor,
          }}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default SavedContactsForm;

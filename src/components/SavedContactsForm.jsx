import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import styles from '../style/SavedContactsForm.module.css';

function SavedContactsForm() {
    const [responseMessage, setResponseMessage] = useState(null);
    const [responseColor, setResponseColor] = useState('#000000');

    const handleSubmit = async (values) => {
        const { username, password } = values
        const payload = { name: username, password };

        try {
            const response = await fetch("https://www.butt-and-co.co.uk/api/user/update_customer_laokehu/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

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

            setResponseMessage(message);
            setResponseColor(color);
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
            setResponseColor('#ff0000');
        }
    };

    return (
        <div>
            <h3 className={styles.title}>AUTOSQUEAK Delivery Premium Upgrade</h3>
            <Form
              name="login"
              style={{
                  maxWidth: '500px',
                  margin: '0 auto'
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
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
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

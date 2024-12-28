import React from "react";
import { Button, Form, Input } from 'antd';
import styles from '../style/ContactForm.module.css';
const { TextArea } = Input;

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
    const onSubmit = (values) => {
        const { email, customer_name, customer_address, city, postcode, phone } = values;
        if (contact) {
            updateContact(customer_name, email, contact.id, customer_address, city, postcode, phone);
        } else {
            addNewContact(customer_name, email, customer_address, city, postcode, phone);
        }

        onClose();
    };

    return (
        <div>
            <Form
              name="contact"
              layout="vertical"
              initialValues={contact}
              onFinish={onSubmit}
            >
              <Form.Item
                name="customer_name"
                label="customer name"
                rules={[
                  {
                    required: true,
                    message: 'Please input customer name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="city"
                label="city"
                rules={[
                  {
                    required: true,
                    message: 'Please input city!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="postcode"
                label="postcode"
                rules={[
                  {
                    required: true,
                    message: 'Please input postcode!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input phone!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email address"
                rules={[
                  {
                    required: true,
                    message: 'Please input email address!',
                  },
                  {
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please input a valid email!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="customer_address"
                label="Customer address"
                rules={[
                  {
                    required: true,
                    message: 'Please input customer address!',
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  className={styles.submitBtn}
                >
                  {contact ? "Update Contact" : "Add Contact"}
                </Button>
              </Form.Item>
            </Form>
        </div>
    );
};

export default ContactForm;

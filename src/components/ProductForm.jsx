import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button, Form, Input, Flex, InputNumber } from 'antd';
import styles from '../style/ProductForm.module.css';

const ProductForm = ({
  addNewProduct,
  onClose,
  product,
  updateProduct,
  type = false,
  DelData,
}) => {
  const formRef = useRef();

  useEffect(() => {
    if (product && formRef.current) {
      formRef.current.setFieldsValue({
        ...product,
        discount_amount: Number(product.discount_amount),
        price: Number(product.price),
      });

      setQuantity(product ? (product.quantity ?? 1) : 1)
    }
  }, [product]);

  const [quantity, setQuantity] = useState(
    product ? (product.quantity ?? 1) : 1,
  );

  const { price, discount_amount, product_name } = product || {};

  const Total = useMemo(() => {
    return (Number(price) - Number(discount_amount)) * Number(quantity);
  }, [quantity, price, discount_amount]);

  const subtotal = useMemo(() => {
    return Number((Number(price) * Number(quantity)).toFixed(2));
  }, [quantity, price, discount_amount]);

  const onSubmit = (values) => {
    const { product_name, price, discount_amount } = values;

    if (product && !type) {
      updateProduct(
        product_name,
        discount_amount,
        price,
        quantity,
        product.id,
        product.responsible_person,
      );
      onClose();
    } else {
      addNewProduct(
        product_name,
        discount_amount,
        price,
        quantity,
        product ? (product.id ?? null) : null,
      );
      onClose();
    }
  };
  function Del() {
    DelData(product.id);
  }

  return (
    <div>
      <Form
        ref={formRef}
        name="product"
        layout="vertical"
        initialValues={{...product, quantity}}
        onFinish={onSubmit}
      >
        <Form.Item
          name="product_name"
          label="product name"
          rules={[
            {
              required: true,
              message: 'Please input product name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
            {
              type: 'number',
              message: 'Please enter price Must be a number',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="discount_amount"
          label="discount amount"
          rules={[
            {
              required: true,
              message: 'Please input discount amount!',
            },
            {
              type: 'number',
              message: 'Please enter price Must be a number',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        {type && (
          <div>
            <Form.Item
              name="quantity"
              label="Sales Detail"
              rules={[
                {
                  required: true,
                  message: 'Please input discount amount!',
                },
              ]}
            >
              <Flex align={'center'} justify={'space-between'}>
                <div>Quantity</div>
                <HookUsage
                  value={quantity}
                  Change={(e) => setQuantity(e)}
                ></HookUsage>
              </Flex>
            </Form.Item>

            <div className="item_make" style={{ marginTop: 40 }}>
              <div className="label">Price</div>
              <Flex
                justify={'space-between'}
                align={'center'}
                style={{ width: '100%', height: '40px' }}
              >
                <span>Subtotal:</span>
                <span>{subtotal}</span>
              </Flex>
              <Flex
                justify={'space-between'}
                align={'center'}
                style={{ width: '100%', height: '40px' }}
              >
                <span>Total:</span>
                <span>{Total}</span>
              </Flex>
            </div>
          </div>
        )}
        {product ? (
          <Flex
            style={{ width: '100%' }}
            align={'center'}
            justify={'space-between'}
          >
            <Button
              htmlType="submit"
              color="primary"
              variant="solid"
              className={styles.alignSelfEnd}
            >
              Update Product
            </Button>
            {product.quantity && (
              <Button
                onClick={Del}
                color="danger"
                variant="solid"
                className={styles.alignSelfEnd}
              >
                Delete
              </Button>
            )}
          </Flex>
        ) : (
          <Button
            htmlType="submit"
            color="primary"
            variant="solid"
            className={styles.alignSelfEnd}
          >
            Add Product
          </Button>
        )}
      </Form>
    </div>
  );
};

function HookUsage({ value, Change }) {
  return (
    <div className={styles.hStack}>
      <Button
        color="danger"
        variant="solid"
        onClick={() => {
          if (value > 1) {
            Change(value - 1);
          }
        }}
      >
        -
      </Button>
      <Input
        style={{ width: 40 }}
        value={value}
        onChange={(e) => Change(e.target.value)}
      />
      <Button
        type="primary"
        onClick={() => {
          if (value < 100) {
            Change(value + 1);
          }
        }}
      >
        +
      </Button>
    </div>
  );
}

export default ProductForm;

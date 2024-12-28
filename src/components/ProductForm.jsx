import React, {useState,useMemo} from "react";
import { Button, Form, Input, Flex } from 'antd';
import styles from '../style/ProductForm.module.css'

const ProductForm = ({addNewContact, onClose, contact, updateContact,type=false,DelData}) => {
    const [quantity, setQuantity] = useState( contact ? contact.quantity??1 : 1)

    const { price, discount_amount, product_name } = contact || {};

    const Total = useMemo(()=>{
        return (Number(price)-Number(discount_amount)) * Number(quantity)
    },[quantity, price, discount_amount])

    const subtotal = useMemo(()=>{
        return Number((Number(price) * Number(quantity)).toFixed(2))
    },[quantity,price,discount_amount])

    const onSubmit = () => {
        if (contact&&!type){
            console.log("print");
            updateContact(product_name, discount_amount, price, contact.id,contact.responsible_person);
            onClose();
        } else {
            addNewContact(product_name, discount_amount, price,quantity,(contact?contact.id??null:null));
            onClose();
        }
    };
    function Del() {
        DelData(contact.id)
    }

    return (
        <div>
            <Form
              name="contact"
              layout="vertical"
              initialValues={contact}
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
                          message:  'Please enter price Must be a number'
                      }
                  ]}
                >
                    <Input />
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
                          message:  'Please enter price Must be a number'
                      }
                  ]}
                >
                    <Input />
                </Form.Item>
                {
                  type&&(
                    <div>
                        <Form.Item
                          name="quantity"
                          label="Sales Detail"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input discount amount!',
                              }
                          ]}
                        >
                            <Flex align={'center'} justify={'space-between'}>
                                <div>Quantity</div>
                                <HookUsage value={quantity} Change={(e) => setQuantity(e)}></HookUsage>
                            </Flex>
                        </Form.Item>

                        <div className='item_make' style={{marginTop:40}}>
                            <div className="label">Price</div>
                            <Flex justify={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>Subtotal:</span>
                                <span>{subtotal}</span>
                            </Flex>
                            <Flex justify={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>Total:</span>
                                <span>{Total}</span>
                            </Flex>
                        </div>
                    </div>


                  )
                }
            </Form>
            {contact ? (
                <Flex style={{width:'100%'}} align={'center'} justify={'space-between'}>
                    <Button onClick={onSubmit} color="primary" variant="solid" className={styles.alignSelfEnd}>
                        Update Product
                    </Button>
                    {
                        contact.quantity&&(
                            <Button onClick={Del} color="danger" variant="solid" className={styles.alignSelfEnd}>
                                Delete
                            </Button>
                        )
                    }
                </Flex>

            ) : (
                <Button onClick={onSubmit} color="primary" variant="solid" className={styles.alignSelfEnd}>
                    Add Product
                </Button>
            )}
        </div>
    );
};

function HookUsage({value, Change}) {
  return (
    <div className={styles.hStack}>
      <Button
        color="danger"
        variant="solid"
        onClick={() => {
          if (value > 1) {
            Change(value - 1)
          }
        }}
      >
        -
      </Button>
      <Input style={{width: 40}} value={value} onChange={(e) => Change(e.target.value)} />
      <Button
        type="primary"
        onClick={() => {
          if (value < 100) {
            Change(value + 1)
          }
        }}
      >
        +
      </Button>
    </div>
  )
}

export default ProductForm;

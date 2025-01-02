import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, message, Flex, Modal, Skeleton } from 'antd';
import {
  CheckOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import styles from '../style/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceList, upAllInvoices } from '../store/reducers/invoiceSlice';

const { confirm } = Modal;

export default function Home() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { product_details_summary, invoices, discount, totalAmount, loading } = useSelector(
    (state) => state.invoice,
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框可见性

  useEffect(() => {
    dispatch(getInvoiceList());
  }, [dispatch]);

  function toMakeNewInvoice() {
    history.push('/make');
  }

  function submit() {
    confirm({
      title: 'Submit confirm',
      icon: <ExclamationCircleFilled />,
      content: 'Confirm to Submit all invoices？',
      onOk() {
        messageApi.info('Submiting...');
        let params = invoices.map((it) => it.id);
        dispatch(upAllInvoices(params)).then(() => {
          messageApi.success('Submit Success。。。');
          history.push('/');
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function viewProductDetailsSummary() {
    setIsModalVisible(true); // 打开模态框
  }

  function handleModalClose() {
    setIsModalVisible(false); // 关闭模态框
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.createBtn}
        onClick={toMakeNewInvoice}
        type="primary"
        icon={<PlusOutlined />}
      >
        添加新Create New Invoice
      </Button>
      <div className={styles.content}>
        {loading ? (
          <Skeleton active />
        ) : (
          invoices.map((item) => (
            <Link
              key={item.id}
              to={{ pathname: '/make', state: { ...item, readonly: false } }}
            >
              <div
                style={{
                  padding: 10,
                  backgroundColor: '#a8b0b7',
                  borderRadius: 5,
                  margin: '5px auto 0 auto',
                  width: '100%',
                }}
              >
                <Flex align={'center'} justify={'space-between'}>
                  <div>
                    <p>{item.customer_name}</p>
                    <p>{item.invoice_date}</p>
                  </div>
                  <div>{item.total_amount}</div>
                </Flex>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.priceWrapper}>
          <div>
            总折扣: <span className={styles.price}>{discount}</span>
          </div>
          <div>
            总金额: <span className={styles.price}>{totalAmount}</span>
          </div>
        </div>
        <Button onClick={submit} block type="primary" icon={<CheckOutlined />}>
          Submit All Today Invoice
        </Button>
        <Button
          onClick={viewProductDetailsSummary}
          block
          type="default"
          style={{ marginTop: '10px' }}
        >
          查看product_details_summary
        </Button>
      </div>
      {contextHolder}

      {/* 模态框 */}
      <Modal
        title="Product Details Summary"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} // 隐藏默认的底部按钮
      >
        <ul>
          {product_details_summary.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.total_quantity}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

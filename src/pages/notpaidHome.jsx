import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, message, Modal, Skeleton } from 'antd';
import {
  CheckOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import styles from '../style/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceListnotpaid, upAllInvoicesnotpaid } from '../store/reducers/invoiceSlice';

const { confirm } = Modal;

export default function NotpaidHome() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    product_details_summary_notpaid,
    invoicesNotPaid, // 修正变量名
    discountnotpaid,
    totalAmountnotpaid,
    loading,
  } = useSelector((state) => state.invoice);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getInvoiceListnotpaid());
  }, [dispatch]);

  const toMakeNewInvoice = () => {
    history.push('/makenotpaid');
  };

  const submit = () => {
    confirm({
      title: 'Submit confirm',
      icon: <ExclamationCircleFilled />,
      content: 'Confirm to Submit all invoices？',
      onOk() {
        messageApi.info('Submitting...');
        const params = invoicesNotPaid.map((it) => it.id);
        dispatch(upAllInvoicesnotpaid(params)).then(() => {
          messageApi.success('Submit Success');
          history.push('/');
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const viewProductDetailsSummary = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.createBtn}
        onClick={toMakeNewInvoice}
        type="primary"
        icon={<PlusOutlined />}
      >
        添加新 Create New Invoice
      </Button>
      <div className={styles.content}>
        {loading ? (
          <Skeleton active />
        ) : (
          invoicesNotPaid.map((item) => (
            <Link
              key={item.id}
              to={{ pathname: '/makenotpaid', state: { ...item, readonly: false } }}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p>{item.customer_name}</p>
                    <p>{item.invoice_date}</p>
                  </div>
                  <div>{item.total_amount}</div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.priceWrapper}>
          <div>
            总折扣: <span className={styles.price}>{discountnotpaid}</span>
          </div>
          <div>
            总金额: <span className={styles.price}>{totalAmountnotpaid}</span>
          </div>
        </div>
        <Button onClick={submit} block type="primary" icon={<CheckOutlined />}>
          Submit All Notpaid Invoices
        </Button>
        <Button
          onClick={viewProductDetailsSummary}
          block
          type="default"
          className={styles.summaryBtn}
        >
          查看 product_details_summary
        </Button>
      </div>
      {contextHolder}

      {/* 模态框 */}
      <Modal
        title="Product Details Summary"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <ul>
          {product_details_summary_notpaid.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong>: {item.total_quantity}
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}

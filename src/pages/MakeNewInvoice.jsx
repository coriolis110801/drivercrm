import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { delInvoice, saveInvoice, upDateInvoice } from '../apis/invoice';
import ProductForm from '../components/ProductForm';
import KModal from '../components/KModal';
import html2canvas from 'html2canvas';

import { Button, Input, Flex, message, Modal, Table } from 'antd';
import {
  CaretDownOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LeftOutlined,
  LinkOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import styles from '../style/Make.module.css';
import ChooseDrawer from '../components/ChooseDrawer';

const { TextArea } = Input;
const { confirm } = Modal;

// function eqs(v1,v2) {
//     if(typeof v1 !== 'object'|| v1===null||typeof v2 !== 'object'|| v2===null){
//         return v1===v2
//     }
//     let v1keys = Object.keys(v1)
//     let v2keys = Object.keys(v2)
//     if(v1keys.length!==v2keys.length){
//         return false
//     }
//     for (let key of v1keys){
//         if(!v2keys.includes(key)){
//             return false
//         }
//         if(!eqs(v1[key],v2[key])){
//             return false
//         }
//     }
//     return true
// }

export default function MakeNewInvoice({ ...props }) {
  const [isCanvas, setIsCanvas] = useState(true);
  let history = useHistory();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [type, setType] = useState('type1');
  const [contact, setContact] = useState({});

  const [params, setParams] = useState(
    state
      ? state
      : {
          customer_name: '',
          customer_address: '',
          customer_postal_code: '',
          customer_city: '',
          customer_email: '',
          customer_phone: '',
          description: '',
          invoice_date: dayjs().format('YYYY-MM-DD'),
          footerdescription: '',
          product_details: [],
          discount: 0,
          total_amount: 0,
        },
  );

  const [messageApi, contextHolder] = message.useMessage();

  function Cancel() {
    history.go(-1);
  }

  function go(t) {
    setOpen(true);
    setType(t);
  }

  function onClose__() {
    setOpen(false);
  }

  function setpice(arr) {
    let zong = arr.reduce((total, item) => {
      total += item.quantity * (item.price - item.discount_amount);
      return total;
    }, 0);
    let discount = arr.reduce((total, item) => {
      total += item.quantity * item.discount_amount;
      return total;
    }, 0);
    return { zong, discount };
  }

  function SetCustomer(obj, T) {
    console.log('%c 测试', 'color:#fff; background:red');
    console.log(obj);
    let { customer_name, customer_address, postcode, city, email, phone } = obj;
    if (T === 'type1') {
      setParams({
        ...params,
        customer_name,
        customer_address,
        customer_postal_code: postcode,
        customer_city: city,
        customer_email: email,
        customer_phone: phone,
      });
    } else {
      let arr = params.product_details;
      let is = arr.findIndex((item) => item.id === obj.id);
      if (is !== -1) {
        arr.splice(is, 1);
      }
      arr.push({
        name: obj.product_name,
        price: Number(obj.price),
        quantity: Number(obj.quantity),
        discount_amount: Number(obj.discount_amount),
        id: obj.id,
      });
      let { zong, discount } = setpice(arr);
      setParams({
        ...params,
        product_details: arr,
        discount: discount,
        total_amount: zong,
      });
    }
    setTimeout(() => {
      onClose__();
    }, 300);
  }

  function Save() {
    messageApi.info('Saving。。。');
    saveInvoice(params).then(() => {
      messageApi.success('Save success。。。');
      history.push('/info');
    });
  }

  function setTime(e) {
    console.log('%c 测试', 'color:#fff; background:red');
    console.log(e.target.value);
    setParams({ ...params, invoice_date: e.target.value });
  }

  function EDITFun(e) {
    if (state?.readonly) {
      return;
    }
    setContact({
      ...e,
      product_name: e.name,
    });
    setEditOpen(true);
  }

  const addNewContact = (
    product_name,
    discount_amount,
    price,
    quantity,
    id,
  ) => {
    let arr = params.product_details;
    arr.splice(
      arr.findIndex((item) => item.id === id),
      1,
      {
        name: product_name,
        price: Number(price),
        quantity: Number(quantity),
        discount_amount: Number(discount_amount),
      },
    );
    let { zong, discount } = setpice(arr);
    setParams({
      ...params,
      product_details: arr,
      discount: discount,
      total_amount: zong,
    });
  };

  function DelData(id) {
    let arr = params.product_details;
    arr.splice(
      arr.findIndex((item) => item.id === id),
      1,
    );
    let { zong, discount } = setpice(arr);
    setParams({
      ...params,
      product_details: arr,
      discount: discount,
      total_amount: zong,
    });
    setEditOpen(false);
  }

  function EditSave() {
    messageApi.info('Saving。。。');
    upDateInvoice(params).then(() => {
      messageApi.success('Save success。。。');
      history.push('/info');
    });
  }

  function EditDel() {
    confirm({
      title: 'Delete confirm',
      icon: <ExclamationCircleFilled />,
      content: 'Confirm delete this invoice？',
      async onOk() {
        messageApi.info('Deleting。。。');
        delInvoice(params).then(() => {
          messageApi.success('Delete Success。。。');
          history.push('/info');
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function DownloadPng() {
    messageApi.info('保存中。。。');
    document.getElementById('CanvasSave').style.padding = '20px';
    let time = Date.now();
    setIsCanvas(false);
    queueMicrotask(() => {
      html2canvas(document.getElementById('CanvasSave')).then(
        function (canvas) {
          let a = document.createElement('a');
          a.href = canvas.toDataURL('image/png');
          a.download = 'invoice.png';
          let time2 = Date.now();
          a.click();
          setTimeout(
            () => {
              document.getElementById('CanvasSave').style.padding = 'initial';
              setIsCanvas(true);
            },
            500 - (time2 - time),
          );
          messageApi.success('Success。。。');
        },
      );
    });
  }
  return (
    <div>
      <div className={styles.btn_head}>
        <Button type="primary" onClick={Cancel} icon={<LeftOutlined />}>
          Back
        </Button>
      </div>
      <div className={styles.main_make}>
        <h1>{state ? 'Edit' : 'Create'}</h1>
        <div id="CanvasSave">
          <div className={styles.item_make}>
            <div className={styles.label}>客户Customer Purchase Invoice</div>
            <Button
              onClick={() => !state?.readonly && go('type1')}
              block
              type="primary"
              icon={!params.customer_name ? <PlusOutlined /> : <EditOutlined />}
            >
              {params.customer_name || 'Choose Customer'}
            </Button>
          </div>
          <div className={styles.item_make}>
            <div className={styles.label}>customer_address</div>
            <TextArea
              rows={4}
              disabled={true}
              placeholder="customer_address"
              value={`${params.customer_city + '  ' + params.customer_postal_code + '  ' + params.customer_phone}\n${params.customer_email}\n${params.customer_address}`}
            />
            <div className={styles.label}>Summary</div>
            <TextArea
              rows={4}
              disabled={state?.readonly}
              placeholder="description"
              value={params.description}
              onChange={(e) =>
                setParams({ ...params, description: e.target.value })
              }
            />
            <div className={styles.date}>
              <Flex justify={'space-between'} style={{ width: '100%' }}>
                <div>Date</div>
                <div>
                  {isCanvas && !state?.readonly ? (
                    <input
                      style={{ background: 'transparent' }}
                      type="date"
                      value={params.invoice_date}
                      onChange={setTime}
                    />
                  ) : (
                    <div>{params.invoice_date}</div>
                  )}
                </div>
              </Flex>
            </div>
          </div>
          <div className={styles.item_make}>
            <div className={styles.label}>Products&Service</div>
            <Button
              onClick={() => !state?.readonly && go('type2')}
              block
              type="primary"
              icon={<PlusOutlined />}
            >
              Add Product
            </Button>
            {params.product_details.length > 0 && (
              <Table
                style={{ marginTop: 20 }}
                pagination={false}
                dataSource={params.product_details || []}
                columns={[
                  { title: 'product name', dataIndex: 'name', key: 'name' },
                  { title: 'price', dataIndex: 'price', key: 'price' },
                  { title: 'quantity', dataIndex: 'quantity', key: 'quantity' },
                ]}
              />
            )}
          </div>
          <div className={styles.item_make}>
            <div className={styles.label}>Invoice Total</div>
            <Flex
              justify={'space-between'}
              align={'center'}
              style={{ width: '100%', height: '40px' }}
            >
              <span>Discount Total:</span>
              <span>{params.discount}</span>
            </Flex>
            <Flex
              justify={'space-between'}
              align={'center'}
              style={{ width: '100%', height: '40px' }}
            >
              <span>Total:</span>
              <span>{params.total_amount}</span>
            </Flex>
          </div>
          <div className={styles.item_make}>
            <div className={styles.label}>Footer(Optional)</div>
            <TextArea
              rows={4}
              disabled={state?.readonly}
              placeholder="Add Note or include your T&Cs"
              value={params.footerdescription}
              onChange={(e) =>
                setParams({ ...params, footerdescription: e.target.value })
              }
            />
          </div>
        </div>

        <div className={styles.actions}>
          {state ? (
            <>
              <Button
                block
                onClick={DownloadPng}
                type="primary"
                icon={<LinkOutlined />}
              >
                Download
              </Button>
              {state?.readonly ? null : (
                <>
                  <Button
                    onClick={EditSave}
                    block
                    type="primary"
                    icon={<CaretDownOutlined />}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={EditDel}
                    block
                    color="danger"
                    variant="solid"
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                block
                type="primary"
                onClick={DownloadPng}
                icon={<LinkOutlined />}
              >
                Download
              </Button>
              <Button
                onClick={Save}
                block
                type="primary"
                icon={<CaretDownOutlined />}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
      <ChooseDrawer
        SetCustomer={SetCustomer}
        type={type}
        open={open}
        onClose={() => setOpen(false)}
      />
      )
      <KModal
        isOpen={editOpen}
        title={'Edit Product'}
        onOpen={() => setEditOpen(true)}
        onClose={() => setEditOpen(false)}
      >
        <ProductForm
          contact={contact}
          onClose={() => setEditOpen(false)}
          addNewContact={addNewContact}
          DelData={DelData}
          type={true}
        />
      </KModal>
      {contextHolder}
    </div>
  );
}

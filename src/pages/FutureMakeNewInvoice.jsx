import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import KModal from '../components/KModal';
import html2canvas from 'html2canvas';


import { Button, Input, Flex, message, Modal, Table, DatePicker } from 'antd';
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
import ChooseContactDrawer from '../components/ChooseContactDrawer';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInvoicefuture,
  deleteInvoice,
  resetParams, updateChooseProductOpen,
  updateContact,
  updateEditOpen,
  updateInvoice,
  updateIsCanvas,
  updateOpen,
  updateParams,
  updateType,
} from '../store/reducers/invoiceSlice';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import { setpice } from '../utils/utils';
import ChooseProductDrawer from '../components/ChooseProductDrawer';
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const companyInfo = {
  name: "BUTT & CO (UK) Ltd",
  email: "lee@butt-and-co.co.uk",
  registrationNumber: "10445756",
  bankAccount: "10478849",
  bankSortCode: "04-00-04",
  vatNumber: "324855100",
};

const { TextArea } = Input;
const { confirm } = Modal;

export default function FutureMakeNewInvoice({ ...props }) {
  let history = useHistory();
  const { state } = useLocation();
  const { isCanvas, open, editOpen, type, contact, params, chooseProductOpen } = useSelector(
    (state) => state.invoice,
  );
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (state) {
      dispatch(updateParams(state));
    } else {
      dispatch(resetParams());
    }
  }, [state, dispatch]);

  function Cancel() {
    history.go(-1);
  }

  function go(t) {
    if (t === 'type1') {
      dispatch(updateOpen(true));
    } else {
      dispatch(updateChooseProductOpen(true));
    }
    dispatch(updateType(t));
  }

  function onClose__() {
    dispatch(updateOpen(false));
  }

  const handleChooseContact = (obj) => {
    let { customer_name, customer_address, postcode, city, email, phone } = obj;
    dispatch(
      updateParams({
        ...params,
        customer_name,
        customer_address,
        customer_postal_code: postcode,
        customer_city: city,
        customer_email: email,
        customer_phone: phone,
      }),
    );
    setTimeout(() => {
      onClose__();
    }, 300);
  }

  const handleChooseProduct = (obj) => {
    let arr = [...params.product_details];
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
    dispatch(
      updateParams({
        ...params,
        product_details: arr,
        discount: discount,
        total_amount: zong,
      }),
    );

    setTimeout(() => {
      onClose__();
    }, 300);
  }

  function Save() {
    messageApi.info('Saving。。。');
    dispatch(createInvoicefuture(params)).then(() => {
      messageApi.success('Save success。。。');
      history.push('/info');
    });
  }

  function setTime(date, dateString) {
    console.log('%c 测试', 'color:#fff; background:red');
    dispatch(
      updateParams({
        ...params,
        invoice_date: dateString,
      }),
    );
  }

  function EDITFun(e) {
    if (state?.readonly) {
      return;
    }
    dispatch(
      updateContact({
        ...e,
        product_name: e.name,
      }),
    );
    dispatch(updateEditOpen(true));
  }

  const addNewContact = (
    product_name,
    discount_amount,
    price,
    quantity,
    id,
  ) => {
    let arr = JSON.parse(JSON.stringify(params.product_details));

    if (id) {
      const matchedProduct = arr.find(item => item.id === id)
      if (matchedProduct) {
        matchedProduct.name = product_name
        matchedProduct.price = Number(price)
        matchedProduct.quantity = Number(quantity)
        matchedProduct.discount_amount = Number(discount_amount)
      }
    }
    let { zong, discount } = setpice(arr);
    dispatch(
      updateParams({
        ...params,
        product_details: arr,
        discount: discount,
        total_amount: zong,
      }),
    );
  };

  function DelData(id) {
    let arr = [...params.product_details];
    arr.splice(
      arr.findIndex((item) => item.id === id),
      1,
    );
    let { zong, discount } = setpice(arr);
    dispatch(
      updateParams({
        ...params,
        product_details: arr,
        discount: discount,
        total_amount: zong,
      }),
    );
    dispatch(updateEditOpen(false));
  }

  function EditSave() {
    messageApi.info('Saving。。。');
    dispatch(updateInvoice(params)).then(() => {
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
        dispatch(deleteInvoice(params)).then(() => {
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
    messageApi.info('Generating invoice...');
    const printArea = document.createElement('div');
    printArea.style.padding = '20px';
    printArea.style.fontFamily = 'Arial, sans-serif';

    const now = dayjs();
    const filename = `INV-${now.format('YYYYMMDDHHmmss')}.png`;
    printArea.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1>Invoice</h1>
        <p>${companyInfo.name}</p>
        <p>Email: ${companyInfo.email}</p>
        <p>Registration Number: ${companyInfo.registrationNumber}</p>
        <p>Bank Account: ${companyInfo.bankAccount}</p>
        <p>Sort Code: ${companyInfo.bankSortCode}</p>
        <p>VAT Number: ${companyInfo.vatNumber}</p>
      </div>
      <div>
        <h3>Customer Details</h3>
        <p>Name: ${params.customer_name || 'N/A'}</p>
        <p>Address: ${params.customer_address || 'N/A'}</p>
        <p>City: ${params.customer_city || 'N/A'}</p>
        <p>Postal Code: ${params.customer_postal_code || 'N/A'}</p>
        <p>Phone: ${params.customer_phone || 'N/A'}</p>
        <p>Email: ${params.customer_email || 'N/A'}</p>
      </div>
      <div style="margin-top: 20px;">
        <h3>Invoice Details</h3>
        <p>Date: ${params.invoice_date}</p>
        <p>Description: ${params.description || ' '}</p>
      </div>
      <div style="margin-top: 20px;">
        <h3>Products and Services</h3>
        <table style="width: 100%; border-collapse: collapse;" border="1">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${params.product_details.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>£${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>£${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top: 20px;">
        <h3>Total</h3>
        <p>Discount: £${params.discount.toFixed(2)}</p>
        <p>VAT Included: £${(params.total_amount - params.total_amount / 1.2).toFixed(2)}</p>
        <p>Total Amount: £${params.total_amount.toFixed(2)}</p>
      </div>
      <div style="margin-top: 20px;">
        <h3>Footer</h3>
        <p>${params.footerdescription || ' '}</p>
      </div>
    `;

    document.body.appendChild(printArea);

    html2canvas(printArea).then(canvas => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = filename; // Use dynamic filename
      a.click();
      document.body.removeChild(printArea);
      messageApi.success('Invoice generated successfully!');
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
              icon={
                !params.customer_name ? <PlusOutlined /> : <EditOutlined />
              }>
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
                dispatch(
                  updateParams({ ...params, description: e.target.value }),
                )
              }
            />
            <div className={styles.date}>
              <Flex justify={'space-between'} style={{ width: '100%' }}>
                <div>Date</div>
                <div>
                  {isCanvas && !state?.readonly ? (
                    <DatePicker
                      value={dayjs(params.invoice_date)}
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
              icon={<PlusOutlined />}>
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
                  {
                    title: 'Subtotal',
                    key: 'subtotal',
                    render: (text, record) => (
                      <span>{(record.price * record.quantity).toFixed(2)}</span>
                    ),
                  },
                ]}
                onRow={(record) => {
                  return {
                    onClick: () => EDITFun(record),
                  };
                }}
              />
            )}
          </div>
          <div className={styles.item_make}>
            <div className={styles.label}>Invoice Total</div>
            <Flex
              justify={'space-between'}
              align={'center'}
              style={{ width: '100%', height: '40px' }}>
              <span>Discount Total:</span>
              <span>{params.discount}</span>
            </Flex>
            <Flex
              justify={'space-between'}
              align={'center'}
              style={{ width: '100%', height: '40px' }}>
              <span>Vat included:</span>
              <span>
                {(params.total_amount - params.total_amount / 1.2).toFixed(2)}
              </span>
            </Flex>
            <Flex
              justify={'space-between'}
              align={'center'}
              style={{ width: '100%', height: '40px' }}>
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
                dispatch(
                  updateParams({
                    ...params,
                    footerdescription: e.target.value,
                  }),
                )
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
                icon={<LinkOutlined />}>
                Download
              </Button>
              {state?.readonly ? null : (
                <>
                  <Button
                    onClick={EditSave}
                    block
                    type="primary"
                    icon={<CaretDownOutlined />}>
                    Save
                  </Button>
                  <Button
                    onClick={EditDel}
                    block
                    color="danger"
                    variant="solid"
                    icon={<DeleteOutlined />}>
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
                icon={<LinkOutlined />}>
                Download
              </Button>
              <Button
                onClick={Save}
                block
                type="primary"
                icon={<CaretDownOutlined />}>
                Save
              </Button>
            </>
          )}
        </div>
      </div>
      <ChooseContactDrawer
        SetCustomer={handleChooseContact}
        type={type}
        open={open}
        onClose={() => dispatch(updateOpen(false))}
      />
      <ChooseProductDrawer
        SetCustomer={handleChooseProduct}
        type={type}
        open={chooseProductOpen}
        onClose={() => dispatch(updateChooseProductOpen(false))}
      />
      <KModal
        isOpen={editOpen}
        title={'Edit Product'}
        onOpen={() => dispatch(updateEditOpen(true))}
        onClose={() => dispatch(updateEditOpen(false))}>
        <ProductForm
          product={contact}
          onClose={() => dispatch(updateEditOpen(false))}
          addNewProduct={addNewContact}
          DelData={DelData}
          type={true}
        />
      </KModal>
      {contextHolder}
    </div>
  );
}

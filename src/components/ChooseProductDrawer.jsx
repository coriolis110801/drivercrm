import React, { useEffect } from 'react';
import { productGetDriverStock } from '../apis/product';
import KModal from './KModal';
import ProductForm from './ProductForm';

import { Drawer, Radio, Button, Flex, Typography, Input } from 'antd';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAddProductModalOpen,
  updateCreateContact,
  updateProducts,
  updateSearchProductTerm,
  updateValue,
} from '../store/reducers/invoiceSlice';
import { generateRandomId } from '../utils/utils';
import styles from '../style/ChooseDrawer.module.css';

function ChooseProductDrawer({ open, onClose, type, SetCustomer }) {
  const { addProductModalOpen, products, value, createContact, OBJ, searchProductTerm } = useSelector(
    (state) => state.invoice,
  );
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const data = await productGetDriverStock();
    if (data !== null) {
      dispatch(updateProducts(
        Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
      ));
    }
  };

  useEffect(() => {
    if (open) {
      fetchProducts();
    }
  }, [type, open]);

  function closeDrawer() {
    setTimeout(() => {
      onClose();
    }, 300);
    dispatch(updateValue(null));
    dispatch(updateProducts([]));
    dispatch(updateSearchProductTerm(''));
  }

  function handleChoose(e) {
    if (typeof e !== 'object') {
      SetCustomer(
        products.find((item) => item.id === Number(e))
      );
    } else {
      SetCustomer(e);
    }

    setTimeout(() => {
      closeDrawer();
    }, 0);
  }

  function ChangeRadio(e) {
    const value = e.target.value;
    dispatch(updateValue(Number(value)));
    dispatch(
      updateCreateContact(products.find((item) => item.id === Number(value))),
    );
    dispatch(updateAddProductModalOpen(true));
  }

  const addNewProduct = async (
    product_name,
    discount_amount,
    price,
    quantity,
    id,
  ) => {
    if ([null, undefined, ''].includes(id)) {
      id = generateRandomId();
    }
    handleChoose({ product_name, discount_amount, price, quantity, id });
  };

  let { head, title } = OBJ[type];

  return (
    <>
      <Drawer
        rootClassName="choose-drawer"
        title={title}
        placement="bottom"
        closable
        onClose={closeDrawer}
        open={open}
      >
        <Button
          icon={<PlusSquareOutlined />}
          type="primary"
          block
          onClick={() => {
            dispatch(updateValue(1));
            dispatch(updateCreateContact(null));
            dispatch(updateAddProductModalOpen(true));
          }}
        >
          {head}
        </Button>
        <div className="DrawerBody_main">
          <div className="label">Saved Products</div>
          <div className={styles.searchInput}>
            <Input
              size="large"
              type="text"
              placeholder="Search Product..."
              prefix={<SearchOutlined />}
              value={searchProductTerm}
              onChange={(e) => dispatch(updateSearchProductTerm(e.target.value))}
            />
          </div>
          <div className="over">
            <Radio.Group onChange={ChangeRadio} value={value}>
              {products.filter(product => !searchProductTerm || (searchProductTerm && product.product_name.toLowerCase().includes(searchProductTerm.toLowerCase()))).map((item, index) => {
                return (
                  <Flex
                    style={{ height: '50px' }}
                    align={'center'}
                    key={item.id}
                  >
                    <Radio size="lg" value={item.id}>
                      <ContactItem contact={item}></ContactItem>
                    </Radio>
                  </Flex>
                );
              })}
            </Radio.Group>
          </div>
        </div>
      </Drawer>
      <KModal
        isOpen={addProductModalOpen}
        title={head}
        onOpen={() => dispatch(updateAddProductModalOpen(true))}
        onClose={() => dispatch(updateAddProductModalOpen(false))}
      >
        <ProductForm
          product={createContact}
          onClose={() => dispatch(updateAddProductModalOpen(false))}
          addNewProduct={addNewProduct}
          type={true}
        />
      </KModal>
    </>
  );
}

function ContactItem({ contact }) {
  return (
    <Flex align="center" gap={20}>
      <div>First</div>
      <Typography>
        {contact.product_name ? contact.product_name : contact.customer_name}
      </Typography>
    </Flex>
  );
}

export default ChooseProductDrawer;

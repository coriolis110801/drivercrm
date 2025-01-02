import React, { useEffect, useState } from 'react';
import ContactCard from '../components/ContactCard';
import ProductForm from '../components/ProductForm';
import KModal from '../components/KModal';
import styles from '../style/ProductAddressBook.module.css';
import { Flex, Typography, Button, Input, Select, Modal } from 'antd';
import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProduct,
  deleteProduct,
  getProductsList,
  updateEditOpen,
  updateOpen,
  updateProduct,
  updateProductId,
  updateSearchData,
} from '../store/reducers/productSlice';

const { Title } = Typography;
const { confirm } = Modal;
const { Option } = Select;

const Products = () => {
  const { products, productId, editOpen, open, searchData } = useSelector(
    (state) => state.product,
  );
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  const addNewProduct = async (product_name, discount_amount, price) => {
    dispatch(
      createProduct({
        product_name,
        discount_amount,
        price,
      }),
    );
  };

  let searchProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchData.toLowerCase()),
  );

  // Sorting logic
  if (sortOrder === 'name-asc') {
    searchProducts = searchProducts.sort((a, b) =>
      a.product_name.localeCompare(b.product_name),
    );
  } else if (sortOrder === 'name-desc') {
    searchProducts = searchProducts.sort((a, b) =>
      b.product_name.localeCompare(a.product_name),
    );
  } else if (sortOrder === 'price-asc') {
    searchProducts = searchProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    searchProducts = searchProducts.sort((a, b) => b.price - a.price);
  }

  const _updateProduct = async (
    product_name,
    discount_amount,
    price,
    id,
    responsible_person,
  ) => {
    dispatch(
      updateProduct({
        product_name,
        discount_amount,
        price,
        id,
        responsible_person,
      }),
    );
  };

  const _openEditContact = (id) => {
    dispatch(updateProductId(id));
    dispatch(updateEditOpen(true));
  };

  const _deleteProduct = async (id) => {
    confirm({
      title: 'Delete confirm',
      icon: <ExclamationCircleFilled />,
      content: 'Confirm deleting？',
      async onOk() {
        dispatch(deleteProduct(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  let selectProduct = products.find((product) => product.id === productId);

  return (
    <>
      <KModal
        isOpen={open}
        title={'Add New Product'}
        onOpen={() => dispatch(updateOpen(true))}
        onClose={() => dispatch(updateOpen(false))}
      >
        <ProductForm
          addNewProduct={addNewProduct}
          onClose={() => dispatch(updateOpen(false))}
        />
      </KModal>
      <KModal
        isOpen={editOpen}
        title={'Update New Contact'}
        onOpen={() => dispatch(updateEditOpen(true))}
        onClose={() => dispatch(updateEditOpen(false))}
      >
        <ProductForm
          updateProduct={_updateProduct}
          product={selectProduct}
          onClose={() => dispatch(updateEditOpen(false))}
        />
      </KModal>
      <div>
        <Flex className={styles.p4} justify="center" align="center">
          <img src="/banner.png" width="150px" height="100px" alt="Banner" />
          <Title className={styles.title}>Saved Products</Title>
        </Flex>
        <div className={styles.p4}>
          <Button
            type="primary"
            block
            icon={<PlusOutlined />}
            onClick={() => dispatch(updateOpen(true))}
          >
            Add Product
          </Button>
        </div>
        <div className={styles.p4}>
          <Input
            size="large"
            type="text"
            placeholder="Search Product..."
            prefix={<SearchOutlined />}
            value={searchData}
            onChange={(e) => dispatch(updateSearchData(e.target.value))}
          />
        </div>
        <div className={styles.p4}>
          <Select
            placeholder="Sort By"
            style={{ width: '100%' }}
            onChange={(value) => setSortOrder(value)}
          >
            <Option value="name-asc">Name A-Z</Option>
            <Option value="name-desc">Name Z-A</Option>
            <Option value="price-asc">Price Low-High</Option>
            <Option value="price-desc">Price High-Low</Option>
          </Select>
        </div>
        <div className={styles.p4}>
          {searchProducts.map((product) => (
            <ContactCard
              contact={product}
              key={product.id}
              handleEdit={_openEditContact}
              deleteContact={_deleteProduct}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;

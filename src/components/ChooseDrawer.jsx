import React, { useEffect } from 'react';
import { getAllContacts } from '../apis/contact';
import { productGetDriverStock } from '../apis/product';
import KModal from './KModal';
import ContactForm from './ContactForm';
import ProductForm from './ProductForm';

import { Drawer, Radio, Button, Flex, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAddModalOpen,
  updateContacts,
  updateCreateContact,
  updateValue,
} from '../store/reducers/invoiceSlice';

//随机生成16位id
function generateRandomId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

function ChooseDrawer({ open, onClose, type, SetCustomer }) {
  const { addModalOpen, contacts, value, createContact, OBJ } = useSelector(
    (state) => state.invoice,
  );
  const dispatch = useDispatch();

  const fetchContacts = async () => {
    const data =
      type === 'type1' ? await getAllContacts() : await productGetDriverStock();
    const tempArray = [];
    if (data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        tempArray.push({ id: key, ...value });
      });
    }
    dispatch(updateContacts(tempArray));
  };

  useEffect(() => {
    fetchContacts();
  }, [type]);

  function closeDrawer() {
    setTimeout(() => {
      onClose();
    }, 300);
    dispatch(updateValue(null));
    dispatch(updateContacts([]));
  }

  function handleChoose(e) {
    if (typeof e !== 'object') {
      SetCustomer(
        contacts.find((item) => item.id === Number(e)),
        type,
      );
    } else {
      SetCustomer(e, type);
    }

    setTimeout(() => {
      closeDrawer();
    }, 0);
  }

  function ChangeRadio(e) {
    const value = e.target.value;
    dispatch(updateValue(Number(value)));
    if (type === 'type1') {
      handleChoose(value);
    } else {
      dispatch(
        updateCreateContact(contacts.find((item) => item.id === Number(value))),
      );
      dispatch(updateAddModalOpen(true));
    }
  }

  const addNewContact = async (
    customer_name,
    email,
    customer_address,
    city,
    postcode,
    phone,
  ) => {
    handleChoose({
      customer_name,
      email,
      customer_address,
      city,
      postcode,
      phone,
    });
  };

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
            dispatch(updateAddModalOpen(true));
          }}
        >
          {head}
        </Button>
        <div className="DrawerBody_main">
          <div className="label">Saved Contacts</div>
          <div className="over">
            <Radio.Group onChange={ChangeRadio} value={value}>
              {contacts.map((item, index) => {
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
        isOpen={addModalOpen}
        title={head}
        onOpen={() => dispatch(updateAddModalOpen(true))}
        onClose={() => dispatch(updateAddModalOpen(false))}
      >
        {type === 'type1' ? (
          <ContactForm
            onClose={() => dispatch(updateAddModalOpen(false))}
            addNewContact={addNewContact}
          />
        ) : (
          <ProductForm
            contact={createContact}
            onClose={() => dispatch(updateAddModalOpen(false))}
            addNewContact={addNewProduct}
            type={true}
          />
        )}
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

export default ChooseDrawer;

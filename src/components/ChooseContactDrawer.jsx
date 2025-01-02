import React, { useEffect } from 'react';
import { getAllContacts } from '../apis/contact';
import KModal from './KModal';
import ContactForm from './ContactForm';
import { Drawer, Radio, Button, Flex, Typography, Input } from 'antd';
import { PlusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAddModalOpen,
  updateContacts,
  updateCreateContact,
  updateSearchContactTerm,
  updateValue,
} from '../store/reducers/invoiceSlice';
import styles from '../style/ChooseDrawer.module.css';

function ChooseContactDrawer({ open, onClose, type, SetCustomer }) {
  const { addModalOpen, contacts, value, OBJ, searchContactTerm } = useSelector(
    (state) => state.invoice,
  );
  const dispatch = useDispatch();

  const fetchContacts = async () => {
    const data = await getAllContacts();
    if (data !== null) {
      dispatch(updateContacts(
        Object.entries(data).map(([key, value]) => ({ id: key, ...value }))
      ));
    }
  };

  useEffect(() => {
    if (open) {
      fetchContacts();
    }
  }, [type, open]);

  function closeDrawer() {
    setTimeout(() => {
      onClose();
    }, 300);
    dispatch(updateValue(null));
    dispatch(updateContacts([]));
    dispatch(updateSearchContactTerm(''));
  }

  function handleChoose(e) {
    if (typeof e !== 'object') {
      SetCustomer(
        contacts.find((item) => item.id === Number(e))
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
    handleChoose(value);
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
          <div className={styles.searchInput}>
            <Input
              size="large"
              type="text"
              placeholder="Search Contact..."
              prefix={<SearchOutlined />}
              value={searchContactTerm}
              onChange={(e) => dispatch(updateSearchContactTerm(e.target.value))}
            />
          </div>
          <div className="over">
            <Radio.Group onChange={ChangeRadio} value={value}>
              {contacts.filter(contact => !searchContactTerm || (searchContactTerm && contact.customer_name.toLowerCase().includes(searchContactTerm.toLowerCase()))).map((item, index) => {
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
        <ContactForm
          onClose={() => dispatch(updateAddModalOpen(false))}
          addNewContact={addNewContact}
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

export default ChooseContactDrawer;

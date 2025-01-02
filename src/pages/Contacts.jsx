import React, { useEffect, useState } from 'react';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import KModal from '../components/KModal';
import SavedContactsForm from '../components/SavedContactsForm';
import { Button, Input, Flex, Typography, Select, Modal } from 'antd';
import {
  ExclamationCircleFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from '../style/App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createContact,
  deleteContact,
  getContactsList,
  updateContact,
  updateContactId,
  updateEditOpen,
  updateOpen,
  updateSearchData,
} from '../store/reducers/contactSlice';

const { confirm } = Modal;
const { Title } = Typography;
const { Option } = Select;

const Contacts = () => {
  const { contacts, contactId, editOpen, open, searchData } = useSelector(
    (state) => state.contact,
  );
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch(getContactsList());
  }, [dispatch]);

  const addNewContact = async (
    customer_name,
    email,
    customer_address,
    city,
    postcode,
    phone,
  ) => {
    dispatch(
      createContact({
        customer_name,
        email,
        customer_address,
        city,
        postcode,
        phone,
      }),
    );
  };

  let searchContacts = contacts.filter((contact) =>
    contact.customer_name.toLowerCase().includes(searchData.toLowerCase()),
  );

  // Sorting logic
  if (sortOrder === 'asc') {
    searchContacts = searchContacts.sort((a, b) =>
      a.customer_name.localeCompare(b.customer_name),
    );
  } else if (sortOrder === 'desc') {
    searchContacts = searchContacts.sort((a, b) =>
      b.customer_name.localeCompare(a.customer_name),
    );
  }

  const _updateContact = async (
    customer_name,
    email,
    id,
    customer_address,
    city,
    postcode,
    phone,
  ) => {
    dispatch(
      updateContact({
        customer_name,
        email,
        id,
        customer_address,
        city,
        postcode,
        phone,
      }),
    );
  };

  const _deleteContact = (id) => {
    confirm({
      title: 'Delete confirm',
      icon: <ExclamationCircleFilled />,
      content: '是否删除？Confirm deleting?',
      async onOk() {
        dispatch(deleteContact(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const _openEditContact = (id) => {
    dispatch(updateContactId(id));
    dispatch(updateEditOpen(true));
  };

  let selectContact = contacts.find((contact) => contact.id === contactId);

  return (
    <>
      <KModal
        isOpen={open}
        title={'Add New Contact'}
        onOpen={() => dispatch(updateOpen(true))}
        onClose={() => dispatch(updateOpen(false))}
      >
        <ContactForm
          addNewContact={addNewContact}
          onClose={() => dispatch(updateOpen(false))}
        />
      </KModal>
      <KModal
        isOpen={editOpen}
        title={'Update New Contact'}
        onOpen={() => dispatch(updateEditOpen(true))}
        onClose={() => dispatch(updateEditOpen(false))}
      >
        <ContactForm
          updateContact={_updateContact}
          contact={selectContact}
          onClose={() => dispatch(updateEditOpen(false))}
        />
      </KModal>
      <div>
        <Flex className={styles.savedContacts} justify="center" align="center">
          <img src="/banner.png" width="150px" height="100px" />
          <Title className={styles.title}>Saved Contacts</Title>
          <SavedContactsForm />
        </Flex>
        <div className={styles.pContent}>
          <Button
            type="primary"
            block
            onClick={() => dispatch(updateOpen(true))}
            icon={<PlusOutlined />}
          >
            Add Contact
          </Button>
        </div>
        <div className={styles.pContent}>
          <Input
            size="large"
            type="text"
            placeholder="Search Contact..."
            prefix={<SearchOutlined />}
            value={searchData}
            onChange={(e) => dispatch(updateSearchData(e.target.value))}
          />
        </div>
        <div className={styles.pContent}>
          <Select
            placeholder="Sort By"
            style={{ width: '100%' }}
            onChange={(value) => setSortOrder(value)}
          >
            <Option value="asc">Name A-Z</Option>
            <Option value="desc">Name Z-A</Option>
          </Select>
        </div>
        {/* Add New Buttons Below Sort By Dropdown */}
        <div className={styles.pContent}>
          <Button
            type="default"
            block
            onClick={() => console.log('Create New Route Clicked')}
          >
            创建新路线
          </Button>
        </div>
        <div className={styles.pContent}>
          <Button
            type="default"
            block
            onClick={() => console.log('Select Clicked')}
          >
            选择
          </Button>
        </div>
        <div className={styles.pContent}>
          {searchContacts.map((contact) => (
            <ContactCard
              contact={contact}
              key={contact.id}
              handleEdit={_openEditContact}
              deleteContact={_deleteContact}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Contacts;

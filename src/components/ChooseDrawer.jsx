import React, { useEffect, useState } from 'react';
import { getAllContacts } from '../apis/contact';
import { productGetDriverStock } from '../apis/product';
import KModal from './KModal';
import ContactForm from './ContactForm';
import ProductForm from './ProductForm';

import { Drawer, Radio, Button, Flex, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

//随机生成16位id
function generateRandomId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}

function ChooseDrawer({open, onClose, type, SetCustomer}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [value, setValue] = useState(null)
  const [contact, setContact] = useState({})
  const [OBJ, setObj] = useState({
    type1: {
      title: 'Choose Customer',
      head: 'Add New Customer'
    },
    type2: {
      title: 'Choose Product',
      head: 'Add New Product'
    }
  })

  const fetchContacts = async () => {
    const data = type === 'type1' ? await getAllContacts() : await productGetDriverStock()
    const tempArray = [];
    if (data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        tempArray.push({id: key, ...value});
      });
    }
    setContacts(tempArray);
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  function closeDrawer() {
    setTimeout(()=>{
      onClose()
    },300)
    setValue(null)
    setContacts([])
  }

  function handleChoose(e) {
    if (typeof e !== 'object') {
      SetCustomer(contacts.find(item => item.id === Number(e)), type)
    } else {
      SetCustomer(e, type)
    }

    setTimeout(() => {
      closeDrawer()
    }, 0)
  }

  function ChangeRadio(e) {
    const value = e.target.value
    setValue(Number(value))
    if (type === 'type1') {
      handleChoose(value);
    } else {
      setContact(contacts.find(item => item.id === Number(value)))
      setAddModalOpen(true)
    }
  }

  const addNewContact = async (customer_name, email, customer_address, city, postcode, phone) => {
    handleChoose({customer_name, email, customer_address, city, postcode, phone})
  }

  const addNewProduct = async (product_name, discount_amount, price, quantity,id) => {
    if([null,undefined,''].includes(id)){
      id = generateRandomId()
    }
    handleChoose({product_name, discount_amount, price, quantity,id})
  };

  let {head, title} = OBJ[type]

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
          type='primary'
          block
          onClick={()=>{
            setValue(1)
            setContact(null)
            setAddModalOpen(true)
          }}
        >
          {head}
        </Button>
        <div className='DrawerBody_main'>
          <div className="label">Saved Contacts</div>
          <div className="over">
            <Radio.Group onChange={ChangeRadio} value={value}>
              {
                contacts.map((item, index) => {
                  return (
                    <Flex style={{height: '50px'}} align={'center'} key={item.id}>
                      <Radio size='lg' value={item.id}>
                        <ContactItem contact={item}></ContactItem>
                      </Radio>
                    </Flex>

                  )
                })
              }
            </Radio.Group>
          </div>
        </div>
      </Drawer>
      <KModal
        isOpen={addModalOpen}
        title={head}
        onOpen={() => setAddModalOpen(true)}
        onClose={() => setAddModalOpen(false)}
      >
        {
          type === 'type1' ? (
              <ContactForm
                onClose={() => setAddModalOpen(false)}
                addNewContact={addNewContact}
              />
            ) :
            (
              <ProductForm
                contact={contact}
                onClose={() => setAddModalOpen(false)}
                addNewContact={addNewProduct}
                type={true}
              />
            )
        }
      </KModal>
    </>
  )
}

function ContactItem({contact}) {
  return (
    <Flex align="center" gap={20}>
      <div>
        First
      </div>
      <Typography>{contact.product_name ? contact.product_name : contact.customer_name}</Typography>
    </Flex>
  )
}

export default ChooseDrawer

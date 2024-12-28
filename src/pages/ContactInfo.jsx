import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getContactById } from '../apis/contact';
import { Flex, Typography } from 'antd';
import styles from '../style/Contact.module.css';

const ContactInfo = () => {
  const [contact, setContact] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      const data = await getContactById(params.id);
      setContact(data);
    };
    fetchContact();
  }, []);

  console.log(contact);
  return (
    <>
      {contact && (
        <Flex className={styles.container}>
          <Flex align="center">
            <div style={{ marginRight: 32 }}>
              <FontAwesomeIcon size="3x" icon={faUser} mr="4" />
            </div>
            <div>
              <Typography className={styles.text}>{contact.name}</Typography>
              <Typography className={styles.text}>{contact.email}</Typography>
            </div>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ContactInfo;

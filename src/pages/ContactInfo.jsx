import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import styles from '../style/Contact.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContact } from '../store/reducers/contactSlice';

const ContactInfo = () => {
  const { contact } = useSelector((state) => state.contact);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getContact(params.id));
  }, [params, dispatch]);

  return (
    <>
      {contact && (
        <Flex className={styles.container}>
          <Flex align="center">
            <div style={{ marginRight: 32 }}>
              <FontAwesomeIcon size="3x" icon={faUser} mr="4" />
            </div>
            <div>
              <Typography className={styles.text}>
                {contact.customer_name}
              </Typography>
              <Typography className={styles.text}>{contact.email}</Typography>
            </div>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ContactInfo;

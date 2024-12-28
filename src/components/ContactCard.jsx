import React from 'react';
import { faEdit, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from '../style/ContactCard.module.css';
import { Flex, Typography } from 'antd';

const ContactCard = ({ contact, onOpen, getContactId, deleteContact }) => {
  const updateHandler = (id) => {
    getContactId(id);
    onOpen();
  };

  const deleteContactHandler = (id) => {
    deleteContact(id);
  };

  return (
    <Flex className={styles.container}>
      <Link to={`/contact/${contact.id}`}>
        <Flex align="center">
          <div className={styles.mr4}>
            <FontAwesomeIcon size="3x" icon={faUser} mr="4" />
          </div>
          {contact.product_name && (
            <div>
              <Typography className={styles.text}>
                {contact.product_name}
              </Typography>
              <Typography className={styles.text}>{contact.price}</Typography>
            </div>
          )}
          {contact.customer_name && (
            <div>
              <Typography className={styles.text}>
                {contact.customer_name}
              </Typography>
              <Typography className={styles.text}>{contact.email}</Typography>
            </div>
          )}
        </Flex>
      </Link>

      <Flex align="center">
        <div className={styles.mr4} onClick={() => updateHandler(contact.id)}>
          <FontAwesomeIcon size="2x" icon={faEdit} />
        </div>
        <div color="red.300" onClick={() => deleteContactHandler(contact.id)}>
          <FontAwesomeIcon size="2x" icon={faTrash} />
        </div>
      </Flex>
    </Flex>
  );
};

export default ContactCard;

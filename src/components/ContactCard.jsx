import React, { useState } from 'react';
import { faEdit, faTrash, faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from '../style/ContactCard.module.css';
import { Flex, Typography, Modal, Button } from 'antd';

const ContactCard = ({ contact, handleEdit, deleteContact }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const updateHandler = (id) => {
    handleEdit(id);
  };

  const deleteContactHandler = (id) => {
    deleteContact(id);
  };

  const openViewModal = () => {
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
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
        <div className={styles.mr4} onClick={openViewModal}>
          <FontAwesomeIcon size="2x" icon={faEye} />
        </div>
        <div className={styles.mr4} onClick={() => updateHandler(contact.id)}>
          <FontAwesomeIcon size="2x" icon={faEdit} />
        </div>
        <div color="red.300" onClick={() => deleteContactHandler(contact.id)}>
          <FontAwesomeIcon size="2x" icon={faTrash} />
        </div>
      </Flex>

      {/* View Contact Modal */}
      <Modal
        title="View Contact"
        open={isViewModalOpen}
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal}>
            Close
          </Button>,
        ]}
      >
        <Typography.Text>查看功能 coming soon... please wait</Typography.Text>
      </Modal>
    </Flex>
  );
};

export default ContactCard;

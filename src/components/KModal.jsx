import React from 'react';
import { Modal } from 'antd';

const KModal = ({ onOpen, isOpen, onClose, children, title }) => {
  return (
    <Modal title={title} open={isOpen} footer={null} onCancel={onClose}>
      {children}
    </Modal>
  );
};

export default KModal;

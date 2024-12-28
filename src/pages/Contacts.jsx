import {
    addContactOnServer,
    deleteContactOnServer,
    getAllContacts,
    updateContactOnServer,
} from "../apis/contact";

import React, {useEffect, useState} from "react";
import ContactCard from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import KModal from "../components/KModal";
import SavedContactsForm from '../components/SavedContactsForm';
import { Button, Input, Flex, Typography, message, Modal } from 'antd';
import { ExclamationCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import styles from '../style/App.module.css';
const { confirm } = Modal;
const { Title } = Typography;


const Contacts = () => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [searchData, setSearchData] = useState("");
    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState();

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await getAllContacts();
            const tempArray = [];
            if (data !== null) {
                Object.entries(data).forEach(([key, value]) => {
                    tempArray.push({id: key, ...value});
                });
            }

            setContacts(tempArray);
        };
        fetchContacts();
    }, []);

    const addNewContact = async (customer_name, email, customer_address, city, postcode, phone) => {
            const data = await addContactOnServer(customer_name, email, customer_address, city, postcode, phone);
            console.log(data);
            setContacts([...contacts, data]);
    };

    let searchContacts = contacts.filter((contact) =>
        contact.customer_name.includes(searchData)
    );

    const getContactId = (id) => {
        setContactId(id);
    };

    const updateContact = async (customer_name, email, id, customer_address, city, postcode, phone) => {
        const data = await updateContactOnServer(customer_name, email, id, customer_address, city, postcode, phone);

        setContacts((prev) => [
            ...contacts.filter((contact) => contact.id !== id),
            data,
        ]);
    };

    const deleteContact = (id) => {
        confirm({
            title: 'Delete confirm',
            icon: <ExclamationCircleFilled />,
            content: '是否删除？Confirm deleting?',
            async onOk() {
                const data = await deleteContactOnServer(id);
                if (!data) {
                    setContacts((prev) => [
                        ...contacts.filter((contact) => contact.id !== id),
                    ]);
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    };
    let selectContact = contacts.find((contact) => contact.id === contactId);

    return (
        <>
            {contextHolder}
            <KModal
                isOpen={open}
                title={"Add New Contact"}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <ContactForm addNewContact={addNewContact} onClose={() => setOpen(false)}/>
            </KModal>
            <KModal
                isOpen={editOpen}
                title={"Update New Contact"}
                onOpen={() => setEditOpen(true)}
                onClose={() => setEditOpen(false)}
            >
                <ContactForm
                    updateContact={updateContact}
                    contact={selectContact}
                    onClose={() => setEditOpen(false)}
                />
            </KModal>
            <div>
                <Flex className={styles.savedContacts} justify="center" align="center">
                    <img src="/banner.png" width="150px" height="100px"/>
                    <Title className={styles.title}>Saved Contacts</Title>
                    <SavedContactsForm />
                </Flex>
                <div className={styles.pContent}>
                    <Button
                        type="primary"
                        block
                        onClick={() => setOpen(true)}
                        icon={<PlusOutlined />}
                    >
                        Add Contact
                    </Button>
                </div>
                <div className={styles.pContent}>
                    <Input
                      size="large"
                      type="tel"
                      placeholder="Search Contact..."
                      prefix={<SearchOutlined />}
                      value={searchData}
                      onChange={(e) => setSearchData(e.target.value)}
                    />
                </div>
                <div className={styles.pContent}>
                    {searchContacts.map((contact) => (
                        <ContactCard
                            getContactId={getContactId}
                            onOpen={() => setEditOpen(true)}
                            contact={contact}
                            key={contact.id}
                            deleteContact={deleteContact}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Contacts;

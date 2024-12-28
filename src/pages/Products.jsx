import {
    productAddDriverStock,
    productGetDriverStock,
    productUpdateDriverStock,
    productDeleteDriverStock,
} from "../apis/product";
import React, {useEffect, useState} from "react";

import ContactCard from "../components/ContactCard";
import ProductForm from "../components/ProductForm";
import KModal from "../components/KModal";
import styles from '../style/ProductAddressBook.module.css'
import { Flex, Typography, Button, Input, Modal } from 'antd';
import { ExclamationCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { confirm } = Modal;

const Products = () => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [searchData, setSearchData] = useState("");
    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState();

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await productGetDriverStock();
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

    const addNewContact = async (product_name, discount_amount,price) => {

        const data = await productAddDriverStock(product_name, discount_amount,price);
        console.log(data);
        setContacts([...contacts, data]);

    };

    let searchContacts = contacts.filter((contact) =>
        contact.product_name.includes(searchData)
    );

    const getContactId = (id) => {
        setContactId(id);
    };

    const updateContact = async (product_name, discount_amount,price,id,responsible_person) => {
        const data = await productUpdateDriverStock(product_name, discount_amount,price,id,responsible_person);

        setContacts((prev) => [
            ...contacts.filter((contact) => contact.id !== id),
            data,
        ]);
    };

    const deleteContact = async (id) => {
        confirm({
            title: 'Delete confirm',
            icon: <ExclamationCircleFilled />,
            content: 'Confirm deleting？',
            async onOk() {
                const data = await productDeleteDriverStock(id);
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
            <KModal
                isOpen={open}
                title={"Add New Product"}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <ProductForm addNewContact={addNewContact} onClose={() => setOpen(false)}/>
            </KModal>
            <KModal
                isOpen={editOpen}
                title={"Update New Contact"}
                onOpen={() => setEditOpen(true)}
                onClose={() => setEditOpen(false)}
            >
                <ProductForm
                    updateContact={updateContact}
                    contact={selectContact}
                    onClose={() => setEditOpen(false)}
                />
            </KModal>
            <div>
                <Flex className={styles.p4} justify="center" align="center">
                    <img src="/banner.png" width="150px" height="100px" alt="Banner" />
                    <Title className={styles.title}>Saved Products</Title>
                </Flex>
                <div className={styles.p4}>
                    <Button
                      type="primary"
                      block
                      icon={<PlusOutlined />}
                      onClick={() => setOpen(true)}
                    >
                        Add Product
                    </Button>
                </div>
                <div className={styles.p4}>
                    <Input
                      size="large"
                      type="tel"
                      placeholder="Search Product..."
                      prefix={<SearchOutlined />}
                      value={searchData}
                      onChange={(e) => setSearchData(e.target.value)}
                    />
                </div>
                <div className={styles.p4}>
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

export default Products;

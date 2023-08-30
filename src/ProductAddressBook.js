import {Button} from "@chakra-ui/button";
import {useDisclosure} from "@chakra-ui/hooks";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";
import {Image} from "@chakra-ui/image";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/input";
import {
    Product_Add_DriverStock,
    Product_Get_DriverStock,
    Product_Update_DriverStock,
    Product_Delete_DriverStock
} from "./network";
import {Heading, Flex, Box} from "@chakra-ui/layout";
import {useEffect, useState} from "react";

import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm_Product";
import Kmodal from "./components/Kmodal";

const ProductAddressBook = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit,
    } = useDisclosure();
    const [searchData, setSearchData] = useState("");
    const [contacts, setContacts] = useState([]);
    const [contactId, setContactId] = useState();

    useEffect(() => {
        const fetchContacts = async () => {
            const data = await Product_Get_DriverStock();
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

        const data = await Product_Add_DriverStock(product_name, discount_amount,price);
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
        const data = await Product_Update_DriverStock(product_name, discount_amount,price,id,responsible_person);

        setContacts((prev) => [
            ...contacts.filter((contact) => contact.id !== id),
            data,
        ]);
    };

    const deleteContact = async (id) => {
        const data = await Product_Delete_DriverStock(id);
        if (!data) {
            setContacts((prev) => [
                ...contacts.filter((contact) => contact.id !== id),
            ]);
        }
    };
    let selectContact = contacts.find((contact) => contact.id === contactId);

    return (
        <>
            <Kmodal
                isOpen={isOpen}
                title={"Add New Contact"}
                onOpen={onOpen}
                onClose={onClose}
            >
                <ContactForm addNewContact={addNewContact} onClose={onClose}/>
            </Kmodal>
            <Kmodal
                isOpen={isOpenEdit}
                title={"Update New Contact"}
                onOpen={onOpenEdit}
                onClose={onCloseEdit}
            >
                <ContactForm
                    updateContact={updateContact}
                    contact={selectContact}
                    onClose={onCloseEdit}
                />
            </Kmodal>
            <Box>
                <Flex p="4" justify="center" align="center">
                    <Image src="/banner.png" w="150px" h="100px"/>
                    <Heading as="h1" textTransform="uppercase">
                        Saved Products
                    </Heading>
                </Flex>
                <Box p="4">
                    <Button
                        bg="purple.700"
                        color="white"
                        w="full"
                        fontSize="xl"
                        fontWeight="bold"
                        colorScheme="purple"
                        onClick={onOpen}
                    >
                        <AddIcon h="20px" w="20px" mr="4"/> Add Product
                    </Button>
                </Box>
                <Box p="4">
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300"/>}
                        />
                        <Input
                            focusBorderColor="purple.400"
                            type="tel"
                            placeholder="Search Product..."
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </InputGroup>
                </Box>
                <Box p="4">
                    {searchContacts.map((contact) => (
                        <ContactCard
                            getContactId={getContactId}
                            onOpen={onOpenEdit}
                            contact={contact}
                            key={contact.id}
                            deleteContact={deleteContact}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );
};

export default ProductAddressBook;

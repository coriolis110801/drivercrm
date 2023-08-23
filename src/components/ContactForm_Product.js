import {Button} from "@chakra-ui/button";
import {FormLabel} from "@chakra-ui/form-control";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Stack} from "@chakra-ui/layout";
import React, {useState} from "react";
import {Textarea} from "@chakra-ui/react";

const ContactForm = ({addNewContact, onClose, contact, updateContact}) => {
    const [product_name, setName] = useState(contact ? contact.product_name : "");
    const [discount_amount, setAmount] = useState(contact ? contact.discount_amount : "");
    const [price, setPrice] = useState(contact ? contact.price : "");

    const onSubmit = () => {
        if (contact) {
            console.log("print");
            updateContact(product_name, discount_amount,price, contact.id,contact.responsible_person);
            onClose();
        } else {
            addNewContact(product_name, discount_amount,price);
            onClose();
        }
    };

    return (
        <Stack>
            <FormControl id="product_name">
                <FormLabel>product_name</FormLabel>
                <Input
                    value={product_name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="price">
                <FormLabel>price</FormLabel>
                <Input
                    value={price}
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </FormControl>

            <FormControl id="discount_amount">
                <FormLabel>discount_amount</FormLabel>
                <Input
                    value={discount_amount}
                    type="discount_amount"
                    onChange={(e) => setAmount(e.target.value)}
                />
            </FormControl>
            {contact ? (
                <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                    Update Contact
                </Button>
            ) : (
                <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                    Add Contact
                </Button>
            )}
        </Stack>
    );
};

export default ContactForm;

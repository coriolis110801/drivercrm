import {Button} from "@chakra-ui/button";
import {FormLabel} from "@chakra-ui/form-control";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Stack} from "@chakra-ui/layout";
import React, {useState} from "react";
import {Textarea} from "@chakra-ui/react";

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
    const [customer_name, setName] = useState(contact ? contact.customer_name : "");
    const [email, setEmail] = useState(contact ? contact.email : "");
    const [customer_address, setCustomerAddress] = useState(contact ? contact.customer_address : "");
    const [city, setCity] = useState(contact ? contact.city : "");
    const [postcode, setPostcode] = useState(contact ? contact.postcode : "");
    const [phone, setPhone] = useState(contact ? contact.phone : "");
    const [isEmailValid, setEmailValid] = useState(true); // Track email validity

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const onSubmit = () => {
        if (!validateEmail(email)) {
            setEmailValid(false);
            return;
        }

        setEmailValid(true);

        if (contact) {
            updateContact(customer_name, email, contact.id, customer_address, city, postcode, phone);
        } else {
            addNewContact(customer_name, email, customer_address, city, postcode, phone);
        }

        onClose();
    };

    return (
        <Stack>
            <FormControl id="customer_name">
                <FormLabel>customer_name</FormLabel>
                <Input
                    value={customer_name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl id="city">
                <FormLabel>city</FormLabel>
                <Input
                    value={city}
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                />
            </FormControl>
            <FormControl id="postcode">
                <FormLabel>postcode</FormLabel>
                <Input
                    value={postcode}
                    type="text"
                    onChange={(e) => setPostcode(e.target.value)}
                />
            </FormControl>
            <FormControl id="phone">
                <FormLabel>phone</FormLabel>
                <Input
                    value={phone}
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                />
            </FormControl>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailValid(true); // Reset validation when user types
                    }}
                    isInvalid={!isEmailValid} // Apply Chakra UI validation style
                />
                {!isEmailValid && (
                    <Text color="red" fontSize="sm">
                        Please enter a valid email address.
                    </Text>
                )}
            </FormControl>
            <FormControl id="customer_address">
                <FormLabel>customer_address</FormLabel>
                <Textarea
                    value={customer_address}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                />

            </FormControl>
            <Button
                onClick={onSubmit}
                colorScheme="purple"
                alignSelf="flex-end"
            >
                {contact ? "Update Contact" : "Add Contact"}
            </Button>
        </Stack>
    );
};

export default ContactForm;

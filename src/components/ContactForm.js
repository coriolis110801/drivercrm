import {Button} from "@chakra-ui/button";
import {FormLabel} from "@chakra-ui/form-control";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Stack} from "@chakra-ui/layout";
import React, {useState} from "react";
import {Textarea} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";


const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
    const [customer_name, setName] = useState(contact ? contact.customer_name : "");
    const [email, setEmail] = useState(contact ? contact.email : "");
    const [customer_address, setCustomerAddress] = useState(contact ? contact.customer_address : "");
    const [city, setCity] = useState(contact ? contact.city : "");
    const [postcode, setPostcode] = useState(contact ? contact.postcode : "");
    const [phone, setPhone] = useState(contact ? contact.phone : "");
    const [isEmailValid, setEmailValid] = useState(true); // Track email validity
    const [Cli, setCli] = useState(false)
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    //必填
    const required = (value) => {
        return Boolean(value.toString().trim().length);

    }

    const onSubmit = () => {
        setCli(true)
        if (!validateEmail(email)) {
            setEmailValid(false);
            return;
        }
        let a = [customer_name, email, customer_address, city, postcode, phone]
        if (a.some(it => !required(it))) {
            return
        }

        setEmailValid(true);

        if (contact) {
            updateContact(customer_name, email, contact.id, customer_address, city, postcode, phone);
        } else {
            addNewContact(customer_name, email, customer_address, city, postcode, phone);
        }

        onClose();
    };

    let requi= (name)=>{
        if(!required(name)&&Cli){
            return (
                <Text color="red" fontSize="sm">
                    Please enter  Required field.
                </Text>
            )
        }
    }
    return (
        <Stack>
            <FormControl id="customer_name" isRequired>
                <FormLabel>customer_name</FormLabel>
                <Input
                    value={customer_name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={requi(customer_name)}
                />
                {
                    requi(customer_name)
                }
            </FormControl>
            <FormControl id="city" isRequired>
                <FormLabel>city</FormLabel>
                <Input
                    value={city}
                    type="text"
                    onChange={(e) => setCity(e.target.value)}
                    isInvalid={requi(city)}
                />
                {
                    requi(city)
                }
            </FormControl>
            <FormControl id="postcode" isRequired>
                <FormLabel>postcode</FormLabel>
                <Input
                    value={postcode}
                    type="text"
                    onChange={(e) => setPostcode(e.target.value)}
                    isInvalid={requi(postcode)}
                />
                {
                    requi(postcode)
                }
            </FormControl>
            <FormControl id="phone" isRequired>
                <FormLabel>phone</FormLabel>
                <Input
                    value={phone}
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    isInvalid={requi(phone)}
                />
                {
                    requi(phone)
                }
            </FormControl>
            <FormControl id="email" isRequired>
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
            <FormControl id="customer_address" isRequired>
                <FormLabel>customer_address</FormLabel>
                <Textarea
                    value={customer_address}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    isInvalid={requi(customer_address)}
                />
                {
                    requi(customer_address)
                }

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

import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Textarea } from "@chakra-ui/react";

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
  const [customer_name, setName] = useState(contact ? contact.customer_name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [customer_address, setCustomerAddress] = useState(contact ? contact.customer_address : "");
  const [city, setCity] = useState(contact ? contact.city : "");
  const [postcode, setPostcode] = useState(contact ? contact.postcode : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");
  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!customer_name) {
      newErrors.customer_name = "Customer name is required.";
    }

    // Add other validation checks for fields like email, phone, etc.
    // Example:
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Set validation errors state
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validateInputs()) {
      if (contact) {
        updateContact(customer_name, email, contact.id, customer_address, city, postcode, phone);
      } else {
        addNewContact(customer_name, email, customer_address, city, postcode, phone);
      }
      onClose();
    }
  };

  return (
    <Stack>
      {/* Render error messages */}
      {errors.customer_name && <p style={{ color: 'red' }}>{errors.customer_name}</p>}
      {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

      <FormControl id="customer_name">
        <FormLabel>Customer Name</FormLabel>
        <Input
          value={customer_name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="city">
        <FormLabel>City</FormLabel>
        <Input
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>

      {/* Repeat similar blocks for other form controls */}

      <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
        {contact ? "Update Contact" : "Add Contact"}
      </Button>
    </Stack>
  );
};

export default ContactForm;

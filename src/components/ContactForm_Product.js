import {Button} from "@chakra-ui/button";
import {FormLabel} from "@chakra-ui/form-control";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Flex, Stack} from "@chakra-ui/layout";
import React, {useEffect, useState,useMemo} from "react";
import {HStack, Textarea, useMenu, useNumberInput} from "@chakra-ui/react";
function HookUsage({value, Change}) {
    const {value:va, getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            min: 1,
            max: 100,
            precision: 0,
            defaultValue: value,
        })
    useEffect(() => {
        Change(va)
    }, [va]);
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack maxW='320px'  >
            <Button colorScheme={'red'} {...dec}>-</Button>
            <Input  width={20} {...input} />
            <Button {...inc}>+</Button>
        </HStack>
    )
}
const ContactForm = ({addNewContact, onClose, contact, updateContact,type=false,DelData}) => {
    const [product_name, setName] = useState(contact ? contact.product_name : "");
    const [discount_amount, setAmount] = useState(contact ? contact.discount_amount : "");
    const [price, setPrice] = useState(contact ? contact.price : "");
    const [quantity, setQuantity] = useState( contact ? contact.quantity??1 : 1)
    const Total = useMemo(()=>{
        return (Number(price)-Number(discount_amount)) * Number(quantity)
    },[quantity,price,discount_amount])
    const subtotal = useMemo(()=>{
        return Number((Number(price) * Number(quantity)).toFixed(2))
    },[quantity,price,discount_amount])
    const onSubmit = () => {
        if (contact&&!type){
            console.log("print");
            updateContact(product_name, discount_amount,price, contact.id,contact.responsible_person);
            onClose();
        } else {
            addNewContact(product_name, discount_amount,price,quantity,contact.id);
            onClose();
        }
    };
    function Del() {
        DelData(contact.id)
    }

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
            {
                type&&(
                    <div>
                        <FormControl id="quantity">
                            <FormLabel>销售</FormLabel>
                            <Flex align={'center'} justifyContent={'space-between'}>
                                <div>数量</div>
                                <HookUsage value={quantity} Change={(e) => setQuantity(e)}></HookUsage>
                            </Flex>
                        </FormControl>
                        <div className='item_make' style={{marginTop:40}}>
                            <div className="label">项目金额</div>
                            <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>小计:</span>
                                <span>{subtotal}</span>
                            </Flex>
                            <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>总额:</span>
                                <span>{Total}</span>
                            </Flex>
                        </div>
                    </div>


                )
            }
            {contact ? (
                <Flex style={{width:'100%'}} alignItems={'center'} justifyContent={'space-between'}>
                    <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                        Update Contact
                    </Button>
                    {
                        contact.quantity&&(
                            <Button onClick={Del} colorScheme="red" alignSelf="flex-end">
                                删除
                            </Button>
                        )
                    }
                </Flex>

            ) : (
                <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                    Add Contact
                </Button>
            )}
        </Stack>
    );
};

export default ContactForm;

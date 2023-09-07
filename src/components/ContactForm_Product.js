import {Button} from "@chakra-ui/button";
import {FormLabel} from "@chakra-ui/form-control";
import {FormControl} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {Flex, Stack} from "@chakra-ui/layout";
import React, {useEffect, useState,useMemo} from "react";
import {HStack, Text, Textarea, useMenu, useNumberInput} from "@chakra-ui/react";
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
    const [Cli, setCli] = useState(false)
    const [product_name, setName] = useState(contact ? contact.product_name : "");
    const [discount_amount, setAmount] = useState(contact ? contact.discount_amount||0 : 0);
    const [price, setPrice] = useState(contact ? contact.price : "");
    const [quantity, setQuantity] = useState( contact ? contact.quantity??1 : 1)
    const Total = useMemo(()=>{
        return (Number(price)-Number(discount_amount)) * Number(quantity)
    },[quantity,price,discount_amount])
    const subtotal = useMemo(()=>{
        return Number((Number(price) * Number(quantity)).toFixed(2))
    },[quantity,price,discount_amount])
    const onSubmit = () => {
        setCli(true)
        if(!required(product_name)){
            return
        }
        if(!isNumber(price)||!isNumber(discount_amount)){
            return
        }

        if (contact&&!type){
            console.log("print");
            updateContact(product_name, discount_amount,price, contact.id,contact.responsible_person);
            onClose();
        } else {
            addNewContact(product_name, discount_amount,price,quantity,(contact?contact.id??null:null));
            onClose();
        }
    };
    function Del() {
        DelData(contact.id)
    }
   //必填
    const required = (value) => {
        return Boolean(value.toString().trim().length);

    }
    //验证必须是数字
    const isNumber = (value) => {
        return Boolean(value.toString().trim().length)&&!isNaN(Number(value))
    }
    let requi= (name,text,type=1)=>{
        if(type===1){
            if(!required(name)&&Cli){
                return (
                    <Text color="red" fontSize="sm">
                        {text}
                    </Text>
                )
            }
        }else {
            if(!isNumber(name)&&Cli){
                return (
                    <Text color="red" fontSize="sm">
                        {text}
                    </Text>
                )
            }
        }

    }
    return (
        <Stack>
            <FormControl id="product_name" isRequired>
                <FormLabel>product_name</FormLabel>
                <Input
                    value={product_name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={requi(product_name,'')}
                />
                {
                    requi(product_name,'Please enter product_name')
                }
            </FormControl>
            <FormControl id="price" isRequired>
                <FormLabel>price</FormLabel>
                <Input
                    value={price}
                    type="text"
                    onChange={(e) => setPrice(e.target.value)}
                    isInvalid={!isNumber(price)&&Cli}
                />
                {
                    requi(price,'Please enter price Must be a number',2)
                }
            </FormControl>

            <FormControl id="discount_amount" isRequired>
                <FormLabel>discount_amount</FormLabel>
                <Input
                    value={discount_amount}
                    type="discount_amount"
                    onChange={(e) => setAmount(e.target.value)}
                    isInvalid={!isNumber(discount_amount)&&Cli}
                />
                {
                    requi(discount_amount,'Please enter price Must be a number',2)
                }
            </FormControl>
            {
                type&&(
                    <div>
                        <FormControl id="quantity">
                            <FormLabel>Sales Detail</FormLabel>
                            <Flex align={'center'} justifyContent={'space-between'}>
                                <div>Quantity</div>
                                <HookUsage value={quantity} Change={(e) => setQuantity(e)}></HookUsage>
                            </Flex>
                        </FormControl>
                        <div className='item_make' style={{marginTop:40}}>
                            <div className="label">Price</div>
                            <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>Subtotal:</span>
                                <span>{subtotal}</span>
                            </Flex>
                            <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                                <span>Total:</span>
                                <span>{Total}</span>
                            </Flex>
                        </div>
                    </div>


                )
            }
            {contact ? (
                <Flex style={{width:'100%'}} alignItems={'center'} justifyContent={'space-between'}>
                    <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                        Update Product
                    </Button>
                    {
                        contact.quantity&&(
                            <Button onClick={Del} colorScheme="red" alignSelf="flex-end">
                                Delete
                            </Button>
                        )
                    }
                </Flex>

            ) : (
                <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
                    Add Product
                </Button>
            )}
        </Stack>
    );
};

export default ContactForm;

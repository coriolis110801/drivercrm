import React, {useEffect, useState} from 'react'
import '../style/Make.css'
import {
    Button,
    ButtonGroup,
    Drawer, DrawerBody, DrawerCloseButton,
    DrawerContent,
    DrawerHeader, DrawerOverlay,
    Grid,
    Radio,
    RadioGroup, Table, TableContainer, Tbody, Td,
    Textarea, Th, Thead, Tr, useToast
} from '@chakra-ui/react'
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
    AddIcon,
    ChevronLeftIcon,
    DeleteIcon,
    EditIcon,
    LinkIcon,
    PlusSquareIcon,
    TriangleDownIcon
} from "@chakra-ui/icons";
import {Input} from "@chakra-ui/input";
import dayjs from 'dayjs'
import {Box, Flex, Stack, Text} from "@chakra-ui/layout";
import {useDisclosure} from "@chakra-ui/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {
    DelInvoice,
    getAllContacts,
    Product_Add_DriverStock,
    Product_Get_DriverStock,
    SaveInvoice,
    UpDateInvoice
} from "../network";
import ContactForm from "./ContactForm";
import ContactForm_K from "./ContactForm_Product";
import Kmodal from "./Kmodal";

function eqs(v1,v2) {
    if(typeof v1 !== 'object'|| v1===null||typeof v2 !== 'object'|| v2===null){
        return v1===v2
    }
    let v1keys = Object.keys(v1)
    let v2keys = Object.keys(v2)
    if(v1keys.length!==v2keys.length){
        return false
    }
    for (let key of v1keys){
        if(!v2keys.includes(key)){
            return false
        }
        if(!eqs(v1[key],v2[key])){
            return false
        }
    }
    return true
}


function Li({contact}) {

    return (
        <Flex align="center">
            <Box mr="4">
                First
            </Box>
            <Stack>
                <Text>{contact.product_name ? contact.product_name : contact.customer_name}</Text>
            </Stack>
        </Flex>
    )
}


function PlacementExample({Open, onClose__, type, SetCustomer}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const [placement, setPlacement] = useState('bottom')
    const [contacts, setContacts] = useState([]);
    const [value, setValue] = useState(null)
    const [contact, setContact] = useState({})
    const [OBJ, setObj] = useState({
        type1: {
            title: '选择客户',
            head: '添加新客户'
        },
        type2: {
            title: '选择产品',
            head: '添加新产品'
        }
    })
    useEffect(() => {
        if (Open) {
            onOpen()
        }
    }, [Open]);
    useEffect(() => {
        const fetchContacts = async () => {
            const data = type === 'type1' ? await getAllContacts() : await Product_Get_DriverStock()
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

    function Clo() {
        onClose__()
        onClose()
        setValue(null)
        setContacts([])
    }

    function www(e) {
        if (typeof e !== 'object') {
            SetCustomer(contacts.find(item => item.id === Number(e)), type)
        } else {
            SetCustomer(e, type)
        }

        setTimeout(() => {
            Clo()
        }, 0)
    }

    function ChangeRadio(e) {
        setValue(Number(e))
        if (type === 'type1') {
            www(e);
        } else {
            setContact(contacts.find(item => item.id === Number(e)))
            onOpen2()
        }
    }

    const addNewContact = async (customer_name, email, customer_address, city, postcode, phone) => {
        www({customer_name, email, customer_address, city, postcode, phone})
    }
    const addNewContact_2 = async (product_name, discount_amount, price, quantity,id) => {
        www({product_name, discount_amount, price, quantity,id})
    };
    let {head, title} = OBJ[type]
    return (
        <>
            <Drawer placement={placement} onClose={Clo} isOpen={isOpen} size={'full'}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader borderBottomWidth='1px'>{title}</DrawerHeader>
                    <DrawerBody>
                        <Button leftIcon={<PlusSquareIcon/>} colorScheme='green'
                                style={{width: '100%'}} onClick={onOpen2}>{head}</Button>
                        <div className='DrawerBody_main'>
                            <div className="label">近期客户</div>
                            <RadioGroup onChange={ChangeRadio} value={value}>
                                {
                                    contacts.map((item, index) => {
                                        return (
                                            <Flex style={{height: '50px'}} align={'center'} key={item.id}>
                                                <Radio size='lg' value={item.id}>
                                                    <Li contact={item}></Li>
                                                </Radio>
                                            </Flex>

                                        )
                                    })
                                }
                            </RadioGroup>

                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Kmodal
                isOpen={isOpen2}
                title={head}
                onOpen={onOpen2}
                onClose={onClose2}
            >
                {
                    type === 'type1' ? <ContactForm onClose={onClose2} addNewContact={addNewContact}/> :
                        <ContactForm_K contact={contact} onClose={onClose2} addNewContact={addNewContact_2}
                                       type={true}/>
                }
            </Kmodal>
        </>
    )
}

export default function Make({...props}) {
    let history = useHistory();
    const {state} = useLocation();
    const {isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const [Open, setOpen] = useState(false)
    const [type, setType] = useState('type1')
    const [contact, setContact] = useState({})
    const toast = useToast()
    const [params, setParams] = useState(state ? state : {
        "customer_name": "",
        "customer_address": "",
        "customer_postal_code": "",
        "customer_city": "",
        "customer_email": "",
        "customer_phone": "",
        "description": "",
        "invoice_date": dayjs().format('YYYY-MM-DD'),
        "invoice_footer": '',
        "product_details": [],
        "discount": 0,
        "total_amount": 0
    })
    function Cancel() {
        history.go(-1)
    }

    function go(t) {
        setOpen(true)
        setType(t)
    }

    function onClose__() {
        setOpen(false)
    }

    function setpice(arr) {
        let zong = arr.reduce((total, item) => {
            total += item.quantity * (item.price - item.discount_amount)
            return total
        }, 0)
        let discount = arr.reduce((total, item) => {
            total += item.discount_amount
            return total
        }, 0)
        return {zong, discount};
    }

    function SetCustomer(obj, T) {
        console.log('%c 测试', 'color:#fff; background:red')
        console.log(obj)
        let {customer_name, customer_address, postcode, city, email, phone} = obj
        if (T === 'type1') {
            setParams({
                ...params,
                customer_name,
                customer_address,
                customer_postal_code: postcode,
                customer_city: city,
                customer_email: email,
                customer_phone: phone
            })

        } else {
            let arr = params.product_details
            let is = arr.findIndex(item => item.id === obj.id)
            if (is !== -1) {
                arr.splice(is, 1)
            }
            arr.push({
                name: obj.product_name,
                price: Number(obj.price),
                quantity: Number(obj.quantity),
                discount_amount: Number(obj.discount_amount),
                id:obj.id
            })
            let {zong, discount} = setpice(arr);
            setParams({
                ...params,
                product_details: arr,
                discount: discount,
                total_amount: zong
            })
        }
        setTimeout(() => {
            onClose__()
        }, 0)
    }

    function Save() {

        toast({
            title: '保存中。。。',
            isClosable: false,
        })
        SaveInvoice(params).then(() => {
            toast.closeAll()
            toast({
                title: '保存成功。。。',
                status: 'success',
                duration: 1000,
                isClosable: false,
            })
            history.push('/')
        })
    }

    function setTime(e) {
        console.log('%c 测试', 'color:#fff; background:red')
        console.log(e.target.value)
        setParams({...params, invoice_date: e.target.value})
    }

    function EDITFun(e) {
        setContact({
            ...e,
            product_name: e.name,
        })
        onOpen2()
    }

    const addNewContact = (product_name, discount_amount, price, quantity, id) => {
        let arr = params.product_details
        arr.splice(arr.findIndex(item => item.id === id), 1, {
            name: product_name,
            price: Number(price),
            quantity: Number(quantity),
            discount_amount: Number(discount_amount)
        })
        let {zong, discount} = setpice(arr);
        setParams({
            ...params,
            product_details: arr,
            discount: discount,
            total_amount: zong
        })
    }

    function DelData(id) {
        let arr = params.product_details
        arr.splice(arr.findIndex(item => item.id === id), 1)
        let {zong, discount} = setpice(arr);
        setParams({
            ...params,
            product_details: arr,
            discount: discount,
            total_amount: zong
        })
        onClose2()
    }
    function EditSave() {
        toast({
            title: '保存中。。。',
            isClosable: false,
        })
        UpDateInvoice(params).then(() => {
            toast.closeAll()
            toast({
                title: '保存成功。。。',
                status: 'success',
                duration: 1000,
                isClosable: false,
            })
            history.push('/')
        })

    }
    function EditDel() {
        toast({
            title: '删除中。。。',
            isClosable: false,
        })
        DelInvoice(params).then(() => {
            toast.closeAll()
            toast({
                title: '删除成功。。。',
                status: 'success',
                duration: 1000,
                isClosable: false,
            })
            history.push('/')
        })

    }
    return (
        <div>
            <div className='btn_head'>
                <Button colorScheme='blue' size='xs' onClick={Cancel} leftIcon={<ChevronLeftIcon/>}>取消</Button>
            </div>
            <div className='main_make'>
                <h1>{state?'编辑发票':'创建发票'}</h1>
                <div className='item_make'>
                    <div className="label">客户</div>
                    <Button onClick={() => go('type1')} width={'100%'} colorScheme='blue'
                            leftIcon={(!params.customer_name ? <AddIcon/> :
                                <EditIcon/>)}>{params.customer_name || '选择客户'}</Button>
                </div>
                <div className='item_make'>
                    <div className="label">发票摘要</div>
                    <Input placeholder='描述' value={params.description}
                           onChange={(e) => setParams({...params, description: e.target.value})}/>
                    <Button style={{marginTop: 20}} width={'100%'} colorScheme='gray'>
                        <Flex justifyContent={'space-between'} style={{width: '100%'}}>
                            <div>发票日期</div>
                            <div><input style={{background: 'transparent'}} type="date" value={params.invoice_date}
                                        onChange={setTime}/></div>
                        </Flex>

                    </Button>
                </div>
                <div className='item_make'>
                    <div className="label">产品和服务</div>
                    <Button onClick={() => go('type2')} width={'100%'} colorScheme='blue'
                            leftIcon={<AddIcon/>}>添加项目</Button>
                    {
                        params.product_details.length > 0 && (<TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>product_name</Th>
                                        <Th isNumeric>price</Th>
                                        <Th isNumeric>quantity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        params.product_details && params.product_details.map((item, index) => {
                                            return (
                                                <Tr key={item.name} onClick={EDITFun.bind(this, item)}>
                                                    <Td>{item.name}</Td>
                                                    <Td isNumeric>{item.price}</Td>
                                                    <Td isNumeric>{item.quantity}</Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>

                            </Table>
                        </TableContainer>)

                    }
                </div>
                <div className='item_make'>
                    <div className="label">发票总额</div>
                    <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                        <span>折扣小计:</span>
                        <span>{params.discount}</span>
                    </Flex>
                    <Flex justifyContent={'space-between'} align={'center'} style={{width: '100%', height: '40px'}}>
                        <span>总计:</span>
                        <span>{params.total_amount}</span>
                    </Flex>
                </div>
                <div className='item_make'>
                    <div className="label">发票页脚(可选)</div>
                    <Textarea placeholder='添加注释或包括您的TC' value={params.invoice_footer}
                              onChange={(e) => setParams({...params, invoice_footer: e.target.value})}/>
                </div>
                <Grid templateColumns={'1fr'} gap={2}>
                    {
                        state ? (
                            <>
                                <Button  onClick={EditSave} width={'100%'} colorScheme='linkedin' leftIcon={<TriangleDownIcon/>}>保存</Button>
                                <Button onClick={EditDel} width={'100%'} colorScheme='red'
                                        leftIcon={<DeleteIcon/>}>删除</Button></>
                        ) : (
                            <>
                                <Button width={'100%'} colorScheme='linkedin' leftIcon={<LinkIcon/>}>下载</Button>
                                <Button onClick={Save} width={'100%'} colorScheme='teal'
                                        leftIcon={<TriangleDownIcon/>}>保存</Button>
                            </>
                        )
                    }
                </Grid>

            </div>
            {
                Open && (<PlacementExample SetCustomer={SetCustomer} type={type} Open={Open}
                                           onClose__={onClose__}></PlacementExample>)
            }
            {
                state && (
                    <Kmodal
                        isOpen={isOpen2}
                        title={'编辑项目'}
                        onOpen={onOpen2}
                        onClose={onClose2}
                    >
                        <ContactForm_K contact={contact} onClose={onClose2} addNewContact={addNewContact} DelData={DelData}
                                       type={true}/>
                    </Kmodal>

                )
            }
        </div>

    )
}
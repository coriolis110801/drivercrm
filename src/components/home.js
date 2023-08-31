import React, {useEffect, useState} from 'react'
import {Button, ButtonGroup, useToast} from '@chakra-ui/react'
import {AddIcon, CheckIcon} from "@chakra-ui/icons";
import {useHistory, Link} from 'react-router-dom';
import {ListInvoice, UPAllInvoice} from "../network";
import {Flex} from "@chakra-ui/layout";
import useManual from "./open";

export default function Home() {
    let [deng,jsx] =  useManual()
    let history = useHistory();
    const toast = useToast()
    const [List, setList] = useState([])
    let but = {
        margin: '40px'
    }

    function go() {
        history.push('/Make')
    }

    function submit() {
        deng({text:'Confirm to Submit all invoices？'}).then(res=>{
            toast({
                title: 'Submiting...',
                isClosable: false,
            })
            let params =List.map(it=>it.id)
            UPAllInvoice(params).then(() => {
                toast.closeAll()
                toast({
                    title: 'Submit Success。。。',
                    status: 'success',
                    duration: 1000,
                    isClosable: false,
                })
                history.push('/')
            })
        })

    }

    useEffect(() => {
        ListInvoice().then((res) => {
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(res)
            setList(res?.invoices)
        })
    }, []);
    return (
        <div>
            <Button onClick={go} style={but} colorScheme='blue' leftIcon={<AddIcon/>}>添加新Create New Invoice</Button>
            {
                List.map((item, index) => {

                    return (
                        <Link to={{pathname: '/make', state: item}}>
                            <div key={index} style={{
                                padding: 10,
                                backgroundColor: '#a8b0b7',
                                borderRadius: 5,
                                margin: '5px auto 0 auto',
                                width: '95%'
                            }}>
                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                    <div>
                                        <p>{item.customer_name}</p>
                                        <p>{item.invoice_date}</p>
                                    </div>
                                    <div>
                                        {
                                            item.total_amount
                                        }
                                    </div>
                                </Flex>
                            </div>
                        </Link>

                    )
                })
            }
            <div style={{position: "fixed", width: "100%", bottom: '30px'}}>
                <Button onClick={submit} style={{width: '100%'}} colorScheme='blue'
                        leftIcon={<CheckIcon/>}>Submit All Today Invoice</Button>

            </div>
            {jsx}
        </div>
    )
}

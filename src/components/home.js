import React, {useEffect, useState} from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {AddIcon} from "@chakra-ui/icons";
import { useHistory } from 'react-router-dom';
import {ListInvoice} from "../network";
import {Flex} from "@chakra-ui/layout";
export default function Home() {
    let history = useHistory();
    const [List, setList] = useState(  [])
    let but = {
        margin: '40px'
    }
    function go(){
        history.push('/Make')
    }

    useEffect(() => {
        ListInvoice().then((res)=>{
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(res)
            setList(res?.invoices)
        })
    }, []);
    return (
        <div>
            <Button onClick={go} style={but} colorScheme='blue' leftIcon={<AddIcon />}>添加新Invoice</Button>
            {
                List.map((item,index)=> {

                    return (
                        <div key={index} style={{padding:10,backgroundColor:'#a8b0b7',borderRadius:5,margin:'5px auto 0 auto',width:'95%'}}>
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
                    )
                })
            }
        </div>
    )
}

import React, {useEffect, useState} from 'react'
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/input";
import {CheckIcon, Search2Icon} from "@chakra-ui/icons";
import {Box, Flex} from "@chakra-ui/layout";
import {Button} from "@chakra-ui/button";
import {Link, useHistory} from "react-router-dom";
import {Code, useToast} from "@chakra-ui/react";
import {ListInvoice, UPAllcomplete, search_responsible_person, search_overdue_invoices} from "../network";
import AsyncSelect from "react-select/async";

export default function Manager() {
    const [searchData, setSearchData] = useState("");
    let history = useHistory();
    const toast = useToast()
    const [List, setList] = useState([])
    const [jia, setJia] = useState({
        discount:0,
        total_amount:0
    })

    function go() {
        history.push('/Make')
    }

    function submit() {
        toast({
            title: '确认中。。。',
            isClosable: false,
            position: 'top'
        })
        let params = List.map(it => it.id)
        UPAllcomplete(params).then((res) => {
            toast.closeAll()
            toast({
                title: res.message,
                status: 'success',
                duration: 2000,
                isClosable: false,
                position: 'top'
            })
        })
    }

    function Search() {
        search_overdue_invoices({
            responsible_person_id: searchData.value
        }).then(res => {
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(res)
            let arr = res?.invoices || []
            let discount=0
          let zong =   arr.reduce((prev,currentValue)=>{
                prev+=currentValue.total_amount
              discount+=currentValue.discount
              return prev
            },0)
            setList(arr)
            setJia({
                discount,
                total_amount: zong
            })
        })
    }

    function Select(e) {
        console.log('%c 测试', 'color:#fff; background:red')
        console.log(e)
        setSearchData(e)
    }

    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            search_responsible_person({
                query: inputValue
            }).then((res) => {
                let arr = (res.results && res.results.map(it => {
                    return {
                        label: it.name,
                        value: it.id
                    }
                })) || []
                resolve(arr)
            })
        });
    return (
        <div>
            <Box p="4">
                <Flex>
                    <div style={{width: '80%'}}>
                        <AsyncSelect styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: 'pink',
                            }),
                        }} cacheOptions loadOptions={promiseOptions} onChange={Select}/>
                    </div>
                    <Button style={{marginLeft: 20}} colorScheme='pink' variant='solid' onClick={Search}>
                        搜索
                    </Button>
                </Flex>


            </Box>
            {
                List.map((item, index) => {

                    return (
                        <Link to={{pathname: '/make', state: item}} key={item.id}>
                            <div  style={{
                                padding: 10,
                                backgroundColor: 'pink',
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
            <div style={{
                position: "fixed",
                width: "100%",
                bottom: '30px',
                display: 'flex',
                rowGap: '20px',
                flexWrap: 'wrap'
            }}>
                <div style={{position: 'absolute', right: 20, top: -65}}>
                    <div>总折扣: <Code colorScheme='red' children={jia.discount}/></div>
                    <div>总金额: <Code colorScheme='red' children={jia.total_amount}/></div>
                </div>
                <Button style={{width: '100%'}} colorScheme='pink'>打印统计</Button>
                <Button onClick={submit} style={{width: '100%'}} colorScheme='blue'
                        leftIcon={<CheckIcon/>}>确认</Button>

            </div>
        </div>
    )
}

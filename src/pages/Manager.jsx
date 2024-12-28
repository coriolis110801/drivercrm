import React, {useState} from 'react'
import {Link} from "react-router-dom";
import { upAllComplete } from "../apis/invoice";
import {searchResponsiblePerson, searchOverdueInvoices} from "../apis/search";
import AsyncSelect from "react-select/async";
import { message, Modal, Button, Flex } from 'antd';
import { CheckOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import styles from '../style/Manager.module.css';

const { confirm } = Modal;

export default function Manager() {
    const [searchData, setSearchData] = useState("");
    const [List, setList] = useState([])
    const [jia, setJia] = useState({
        discount:0,
        total_amount:0
    })

    const [messageApi, contextHolder] = message.useMessage();

    function submit() {
        confirm({
            title: 'Submit confirm',
            icon: <ExclamationCircleFilled />,
            content: '是否确认提交？',
            async onOk() {
                messageApi.info('确认中。。。')
                let params = List.map(it => it.id)
                upAllComplete(params).then((res) => {
                    messageApi.success(res.message)
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    function Search() {
        searchOverdueInvoices({
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
            searchResponsiblePerson({
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
            <div style={{padding: 32}}>
                <Flex>
                    <div style={{width: '80%'}}>
                        <AsyncSelect styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: 'pink',
                            }),
                        }} cacheOptions loadOptions={promiseOptions} onChange={Select}/>
                    </div>
                    <Button style={{marginLeft: 20}} type="primary" variant='solid' onClick={Search}>
                        搜索
                    </Button>
                </Flex>


            </div>
            <div style={{height:'60vh',overflow:'auto'}}>
                {
                    List.map((item, index) => {

                        return (
                            <Link to={{pathname: '/make', state: {...item,readonly:true},}} key={item.id}>
                                <div  style={{
                                    padding: 10,
                                    backgroundColor: 'pink',
                                    borderRadius: 5,
                                    margin: '5px auto 0 auto',
                                    width: '95%'
                                }}>
                                    <Flex align={'center'} justify={'space-between'}>
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
            </div>

            <div className={styles.bottom}>
                <div className={styles.priceWrapper}>
                    <div>总折扣: <span className={styles.price}>{jia.discount}</span></div>
                    <div>总金额: <span className={styles.price}>{jia.total_amount}</span></div>
                </div>
                <Button block type="primary">打印统计</Button>
                <Button onClick={submit} block type="primary" icon={<CheckOutlined />}>确认</Button>
            </div>

            {contextHolder}
        </div>
    )
}

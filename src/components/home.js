import React, {useEffect, useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {ListInvoice, UPAllInvoice} from "../network";
import useManual from "./open";
import { Button, message, Flex, Modal } from 'antd';
import { CheckOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import styles from '../style/home.module.css';

const { confirm } = Modal;

export default function Home() {
    let history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();

    const [List, setList] = useState([])

    const [jia, setJia] = useState({
        discount:0,
        total_amount:0
    })
    function go() {
        history.push('/Make')
    }

    function submit() {
        confirm({
            title: 'Submit confirm',
            icon: <ExclamationCircleFilled />,
            content: 'Confirm to Submit all invoices？',
            onOk() {
                messageApi.info('Submiting...')
                let params =List.map(it=>it.id)
                UPAllInvoice(params).then(() => {
                    messageApi.success('Submit Success。。。')
                    history.push('/')
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        ListInvoice().then((res) => {
            console.log('%c 测试', 'color:#fff; background:red')
            console.log(res)
            setList(res?.invoices)
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
    }, []);
    return (
        <div className={styles.container}>
            <Button className={styles.createBtn} onClick={go} type="primary" icon={<PlusOutlined />}>添加新Create New Invoice</Button>
            <div className={styles.content}>
            {
                List.map((item, index) => {

                    return (
                        <Link to={{pathname: '/make', state: {...item,readonly:false}}}>
                            <div key={index} style={{
                                padding: 10,
                                backgroundColor: '#a8b0b7',
                                borderRadius: 5,
                                margin: '5px auto 0 auto',
                                width: '100%'
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
                <Button onClick={submit} style={{width: '100%'}} type="primary"
                        icon={<CheckOutlined />}>Submit All Today Invoice</Button>

            </div>
            {contextHolder}
        </div>
    )
}

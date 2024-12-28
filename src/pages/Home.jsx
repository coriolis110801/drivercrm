import React, {useEffect, useState} from 'react'
import {useHistory, Link} from 'react-router-dom';
import {listInvoice, upAllInvoice} from "../apis/invoice";
import { Button, message, Flex, Modal, Skeleton } from 'antd';
import { CheckOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import styles from '../style/Home.module.css';

const { confirm } = Modal;

export default function Home() {
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(false)
    const [jia, setJia] = useState({
        discount:0,
        total_amount:0
    })

    let history = useHistory();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setLoading(true)
        listInvoice().then((res) => {
            let arr = res?.invoices || []
            let discount=0
            let zong =  arr.reduce((prev,currentValue)=>{
                prev+=currentValue.total_amount
                discount+=currentValue.discount
                return prev
            },0)
            setInvoices(res?.invoices || [])
            setJia({
                discount,
                total_amount: zong
            })
        }).finally(() => {
            setLoading(false)
        })
    }, []);

    function toMakeNewInvoice() {
        history.push('/make')
    }

    function submit() {
        confirm({
            title: 'Submit confirm',
            icon: <ExclamationCircleFilled />,
            content: 'Confirm to Submit all invoices？',
            onOk() {
                messageApi.info('Submiting...')
                let params = invoices.map(it=>it.id)
                upAllInvoice(params).then(() => {
                    messageApi.success('Submit Success。。。')
                    history.push('/')
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div className={styles.container}>
            <Button className={styles.createBtn} onClick={toMakeNewInvoice} type="primary" icon={<PlusOutlined />}>添加新Create New Invoice</Button>
            <div className={styles.content}>
            {
                loading ? <Skeleton active /> :
                invoices.map(item => (
                  <Link key={item.id} to={{pathname: '/make', state: {...item,readonly:false}}}>
                      <div style={{
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
                ))
            }
            </div>
            <div className={styles.bottom}>
                <div className={styles.priceWrapper}>
                    <div>总折扣: <span className={styles.price}>{jia.discount}</span></div>
                    <div>总金额: <span className={styles.price}>{jia.total_amount}</span></div>
                </div>
                <Button
                  onClick={submit}
                  block
                  type="primary"
                  icon={<CheckOutlined />}>
                    Submit All Today Invoice
                </Button>
            </div>
            {contextHolder}
        </div>
    )
}

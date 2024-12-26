import React, {Children} from 'react'
import styles from '../style/header.module.css'
import {NavLink} from "react-router-dom";
import DashboardComponent from "../logout";

export default function Header(props) {
    console.log('%c 测试', 'color:#fff; background:red')
    console.log(props)
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <div>
                        <NavLink activeClassName={styles.active} to={'/info/home'}>
                            <div>
                                GetPaid
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName={styles.active} to={'/info/home2'}>
                            <div>
                                MyStock
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName={styles.active} to={'/info/home3'}>
                            <div>
                                Contacts
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName={styles.active} to={'/info/home4'}>
                            <div>
                                Products
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <DashboardComponent></DashboardComponent>
                </div>
            </div>
            {
                props.children
            }
        </div>


    )
}

import React, {Children} from 'react'
import '../style/header.css'
import {NavLink} from "react-router-dom";
import DashboardComponent from "../logout";

export default function Header(props) {
    console.log('%c 测试', 'color:#fff; background:red')
    console.log(props)
    return (
        <div>
            <div className="header">
                <div className="header__left">
                    <div>
                        <NavLink activeClassName="active" to={'/info/home'}>
                            <div>
                                GetPaid
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/info/home2'}>
                            <div>
                                MyStock
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/info/home3'}>
                            <div>
                                Contacts
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/info/home4'}>
                            <div>
                                Products
                            </div>
                        </NavLink>
                    </div>
                    <div style={{position:'absolute',right:10}}>
                        <DashboardComponent></DashboardComponent>
                    </div>
                </div>
            </div>
            {
                props.children
            }
        </div>


    )
}

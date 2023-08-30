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
                        <NavLink activeClassName="active" to={'/home'}>
                            <div>
                                Home
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home2'}>
                            <div>
                                GetPaid
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home3'}>
                            <div>
                                Contacts
                            </div>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home4'}>
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

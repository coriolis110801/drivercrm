import React from 'react'
import '../style/header.css'
import {NavLink, Route} from "react-router-dom";
import App from "../App";
import Home from "./home";
export default function Header(props) {
    console.log('%c 测试', 'color:#fff; background:red')
    console.log(props)
    return (
        <div>
            <div className="header">
                <div className="header__left">
                    <div>
                        <NavLink activeClassName="active" to={'/home'}><div>
                            首页
                        </div></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home2'}><div>
                            GetPaid
                        </div></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home3'}><div>
                            客户通讯录
                        </div></NavLink>
                    </div>
                    <div>
                        <NavLink activeClassName="active" to={'/home4'}><div>
                            产品通讯录
                        </div></NavLink>
                    </div>
                </div>

            </div>
            <Route path="/home3" exact>
                <App></App>
            </Route>
            <Route path="/home" exact>
                <Home></Home>
            </Route>
        </div>


    )
}

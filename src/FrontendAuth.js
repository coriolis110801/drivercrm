import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Make from "./components/make";
import Contact from "./Contact";
import LoginComponent from "./login";
import Header from "./components/header";
import Manager from "./components/manager";
import App from "./App";
import ProductAddressBook from "./ProductAddressBook";
import Home from "./components/home";

export default function FrontendAuth({location}) {
    console.log('%c FrontendAuth', 'color:#fff; background:red')
    console.log(location)
    let info = localStorage.getItem('user_info');
    info = JSON.parse(info);
    if (info) {
        if (location.pathname === '/login') {
            return <Redirect to='/'/>
        }
        const {manager, driver} = info;
        if (Number(driver) === 1) {
            return (
                <>
                    <Route path="/Make" exact>
                        <Make></Make>
                    </Route>
                    <Route path="/contact/:id" exact>
                        <Contact/>
                    </Route>
                    <Route path="/info"  >
                        <Header>
                            <div>
                                <Switch>
                                    <Route path="/info/home3" exact >
                                        <App></App>
                                    </Route>
                                    <Route path="/info/home4" exact >
                                        <ProductAddressBook></ProductAddressBook>
                                    </Route>
                                    <Route path="/info/home" exact>
                                        <Home></Home>
                                    </Route>
                                    <Route path="/info/"  exact>
                                        <Home></Home>
                                    </Route>
                                </Switch>

                            </div>
                        </Header>
                    </Route>
                </>
            )
        }else if(Number(manager)===1) {
            return (
                <><Route path="/info">
                    <Header>
                        <Route path="/info/home" exact  >
                            <Manager></Manager>
                        </Route>
                    </Header>
                </Route>
                </>
            )
        }else {
            return (
                <div>1</div>
            )
        }
    } else {
        if (location.pathname !== '/login') {
            return <Redirect to='/login'/>
        } else {
            return (<Route path='/login' exact component={LoginComponent}/>)
        }
    }


}

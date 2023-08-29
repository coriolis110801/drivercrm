import React from 'react'
import {Redirect, Route} from "react-router-dom";
import Make from "./components/make";
import Contact from "./Contact";
import LoginComponent from "./login";
import Header from "./components/header";

export default function FrontendAuth({location}) {
    console.log('%c FrontendAuth', 'color:#fff; background:red')
    console.log(location)
    let info = localStorage.getItem('user_info');
    info = JSON.parse(info);
    if (info) {
        if (location.pathname === '/login') {
            return <Redirect to='/'/>
        }
        if (Number(info.driver) === 1) {
            return (
                <>
                    <Route path="/Make">
                        <Make></Make>
                    </Route>
                    <Route path="/contact/:id">
                        <Contact/>
                    </Route>
                    <Route path="/" component={Header}>

                    </Route>
                </>
            )
        }else {
            return (
                <>
                    <Route path="/home" >
                        <div>
                            未开放
                        </div>
                    </Route>
                </>
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

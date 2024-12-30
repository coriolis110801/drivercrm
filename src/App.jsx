import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import MakeNewInvoice from './pages/MakeNewInvoice';
import ContactInfo from './pages/ContactInfo';
import LoginComponent from './pages/Login';
import Header from './components/Header';
import Manager from './pages/Manager';
import Contacts from './pages/Contacts';
import Products from './pages/Products';
import Home from './pages/Home';

export default function App({ location }) {
  console.log('%c FrontendAuth', 'color:#fff; background:red');
  console.log(location);

  let info = localStorage.getItem('user_info');
  info = JSON.parse(info);

  if (info) {
    if (location.pathname === '/login') {
      return <Redirect to="/info" />;
    }
    if (location.pathname === '/') {
      return <Redirect to="/info" />;
    }

    const { manager, driver } = info;

    if (Number(driver) === 1) {
      return (
        <>
          <Route path="/make" exact>
            <MakeNewInvoice></MakeNewInvoice>
          </Route>
          <Route path="/contact/:id" exact>
            <ContactInfo />
          </Route>
          <Route path="/info">
            <Header>
              <div>
                <Switch>
                  <Route path="/info/contacts" exact>
                    <Contacts></Contacts>
                  </Route>
                  <Route path="/info/products" exact>
                    <Products></Products>
                  </Route>
                  <Route path="/info/home" exact>
                    <Home></Home>
                  </Route>
                  <Route path="/info/" exact>
                    <Home></Home>
                  </Route>
                </Switch>
              </div>
            </Header>
          </Route>
        </>
      );
    } else if (Number(manager) === 1) {
      return (
        <>
          <Route path="/info">
            <Header>
              <Route path="/info/home" exact>
                <Manager></Manager>
              </Route>
              <Route path="/info/" exact>
                <Manager></Manager>
              </Route>
            </Header>
          </Route>
          <Route path="/make" exact>
            <MakeNewInvoice></MakeNewInvoice>
          </Route>
        </>
      );
    } else {
      return <div>1</div>;
    }
  } else {
    if (location.pathname !== '/login') {
      return <Redirect to="/login" />;
    } else {
      return <Route path="/login" exact component={LoginComponent} />;
    }
  }
}

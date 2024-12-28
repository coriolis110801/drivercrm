import React from 'react';
import styles from '../style/Header.module.css';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

export default function Header(props) {
  console.log('%c 测试', 'color:#fff; background:red');
  console.log(props);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div>
            <NavLink activeClassName={styles.active} to={'/info/home'}>
              <div>GetPaid</div>
            </NavLink>
          </div>
          <div>
            <NavLink activeClassName={styles.active} to={'/info/stock'}>
              <div>MyStock</div>
            </NavLink>
          </div>
          <div>
            <NavLink activeClassName={styles.active} to={'/info/contacts'}>
              <div>Contacts</div>
            </NavLink>
          </div>
          <div>
            <NavLink activeClassName={styles.active} to={'/info/products'}>
              <div>Products</div>
            </NavLink>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Logout></Logout>
        </div>
      </div>
      {props.children}
    </div>
  );
}

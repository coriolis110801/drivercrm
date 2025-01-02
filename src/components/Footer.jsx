import React from 'react';
import styles from '../style/Footer.module.css';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerNav}>
        <NavLink activeClassName={styles.active} to={'/info/schedule'}>
          <div>Schedule</div>
        </NavLink>
        <NavLink activeClassName={styles.active} to={'/info/todolist'}>
          <div>TodoList</div>
        </NavLink>
        <NavLink activeClassName={styles.active} to={'/info/history'}>
          <div>History</div>
        </NavLink>
      </div>
    </div>
  );
}

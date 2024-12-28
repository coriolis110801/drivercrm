import { getUserInfo } from './user';
import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const saveInvoice = async (obj) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(`${REACT_APP_SERVER}/api/invoice/`, {
      ...obj,
      responsible_person_id: userInfo.id,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const listInvoice = async () => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/unpaid_invoices/`,
      {
        responsible_person_id: userInfo.id,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
// /api/invoiceupdate/<invoice_id>/

export const upDateInvoice = async (obj) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/invoiceupdate/${obj.id}/`,
      {
        ...obj,
        responsible_person_id: userInfo.id,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const delInvoice = async (obj) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/invoicedelete/${obj.id}/`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const upAllInvoice = async (obj) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/update_invoice_status/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const upAllComplete = async (obj) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/update_invoice_complete/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

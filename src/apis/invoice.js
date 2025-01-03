import { getUserInfo } from './user';
import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const saveInvoice = async (obj, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(`${REACT_APP_SERVER}/api/invoice/`, {
      ...obj,
      responsible_person_id: userInfo.id,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const saveInvoicefuture = async (obj, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(`${REACT_APP_SERVER}/api/futureinvoice/`, {
      ...obj,
      responsible_person_id: userInfo.id,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const saveInvoicenotpaid = async (obj, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(`${REACT_APP_SERVER}/api/notpaidinvoice/`, {
      ...obj,
      responsible_person_id: userInfo.id,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const listInvoice = async (thunkAPI) => {
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
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const listInvoicefuture = async (thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/future_invoices/`,
      {
        responsible_person_id: userInfo.id,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const listInvoicenotpaid = async (thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/notpaid_invoices/`,
      {
        responsible_person_id: userInfo.id,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
// /api/invoiceupdate/<invoice_id>/

export const upDateInvoice = async (obj, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const delInvoice = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/invoicedelete/${obj.id}/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const upAllInvoice = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/update_invoice_status/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const upAllInvoicefuture = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/future_update_invoice_status/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const upAllInvoicenotpaid = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/notpaid_update_invoice_status/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
export const upAllComplete = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/update_invoice_complete/`,
      {
        invoice_ids: obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

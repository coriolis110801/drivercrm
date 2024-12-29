import { getUserInfo } from './user';
import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const addContactOnServer = async (obj, thunkAPI) => {
  try {
    const { customer_name, email, customer_address, city, postcode, phone } =
      obj;
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/create-driver-customer/`,
      {
        customer_name,
        email,
        ...userInfo,
        customer_address,
        city,
        postcode,
        phone,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getAllContacts = async (thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.get(
      `${REACT_APP_SERVER}/api/responsible_persons/${userInfo.id}/customers/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateContactOnServer = async (obj, thunkAPI) => {
  try {
    const {
      customer_name,
      email,
      id,
      customer_address,
      city,
      postcode,
      phone,
    } = obj;
    const userInfo = getUserInfo();
    const { data } = await axios.patch(
      `${REACT_APP_SERVER}/api/responsible_persons_edit/${userInfo.id}/customers/${id}/`,
      {
        customer_name,
        email,
        ...userInfo,
        customer_address,
        city,
        postcode,
        phone,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const deleteContactOnServer = async (id, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.delete(
      `${REACT_APP_SERVER}/api/responsible_persons_edit/${userInfo.id}/customers/${id}/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const getContactById = async (id, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.get(
      `${REACT_APP_SERVER}/api/responsible_persons_edit/${userInfo.id}/customers/${id}/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const updateCustomer = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/user/update_customer_laokehu/`,
      obj,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

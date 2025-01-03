import { getUserInfo } from './user';
import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const productAddDriverStock = async (obj, thunkAPI) => {
  try {
    const { product_name, discount_amount, price } = obj;
    const userInfo = getUserInfo();
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/responsible-persons/${userInfo.id}/driver-stocks/`,
      {
        product_name,
        discount_amount,
        price,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const productUpdateDriverStock = async (obj, thunkAPI) => {
  try {
    const { product_name, discount_amount, price, id, responsible_person } =
      obj;
    const userInfo = getUserInfo();
    const { data } = await axios.put(
      `${REACT_APP_SERVER}/responsible-persons/${userInfo.id}/driver-stocks/${id}/`,
      {
        product_name,
        discount_amount,
        price,
        responsible_person,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const productDeleteDriverStock = async (id, thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.delete(
      `${REACT_APP_SERVER}/responsible-persons/${userInfo.id}/driver-stocks/${id}/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const productGetDriverStock = async (thunkAPI) => {
  try {
    const userInfo = getUserInfo();
    const { data } = await axios.get(
      `${REACT_APP_SERVER}/responsible-persons-query/${userInfo.id}/driver-stocks/`,
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

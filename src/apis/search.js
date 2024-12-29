import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const searchResponsiblePerson = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_SERVER}/api/search_responsible_person/`,
      {
        params: obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

export const searchOverdueInvoices = async (obj, thunkAPI) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/overdue_invoices/`,
      {
        ...obj,
      },
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};

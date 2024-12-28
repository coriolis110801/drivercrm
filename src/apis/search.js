import axios from 'axios';

const REACT_APP_SERVER = process.env.REACT_APP_SERVER;

export const searchResponsiblePerson = async (obj) => {
  try {
    const { data } = await axios.get(
      `${REACT_APP_SERVER}/api/search_responsible_person/`,
      {
        params: obj,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const searchOverdueInvoices = async (obj) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/api/overdue_invoices/`,
      {
        ...obj,
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

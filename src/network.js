import axios from "axios";

let defaultData = {
  driver_name:'xiaoming'
}
export const addContactOnServer = async (customer_name, email, customer_address, city, postcode, phone) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/create-driver-customer/`,
      { customer_name, email,...defaultData, customer_address, city, postcode, phone }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllContacts = async () => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER}/query-driver-customers/`,
        {...defaultData}
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactOnServer = async (customer_name, email, id, customer_address, city, postcode, phone) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_SERVER}/manage-driver-customer/${id}/`,
      { customer_name, email,...defaultData, customer_address, city, postcode, phone }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteContactOnServer = async (id) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_SERVER}/manage-driver-customer/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/contacts/${id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

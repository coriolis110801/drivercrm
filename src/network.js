import axios from "axios";

const  Rp = {
  id:1,
}
let defaultData = {
  ...Rp,
  responsible_person_id:1,
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
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/responsible_persons/${Rp.id}/customers/`,

    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactOnServer = async (customer_name, email, id, customer_address, city, postcode, phone) => {
  try {
    const { data } = await axios.patch(
        `${process.env.REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`,
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
      `${process.env.REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (id) => {
  try {
    const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const Product_Add_DriverStock = async (product_name, discount_amount,price)=>{
  try {
    const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/`,{
          product_name, discount_amount,price
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const Product_Update_DriverStock = async (product_name, discount_amount,price,id,responsible_person)=>{
  try {
    const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/${id}/`,{
          product_name, discount_amount,price,responsible_person
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const Product_Delete_DriverStock = async (id)=>{
  try {
    const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const Product_Get_DriverStock = async ()=>{
  try {
    const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER}/responsible-persons-query/${Rp.id}/driver-stocks/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const SaveInvoice = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/invoice/`,{
          ...obj,
          responsible_person_id:Rp.id,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const ListInvoice = async ()=>{
  try {
    const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/unpaid_invoices/`,{
          responsible_person_id:Rp.id,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}













import axios from "axios";

const  Rp = {
  id:1,
}

let defaultData = {
  ...Rp,
  responsible_person_id:1,
  driver_name:'xiaoming'
}
export function getinfo() {
  let info = localStorage.getItem('user_info')||'{}'
  info = JSON.parse(info);
  defaultData.responsible_person_id = info.responsible_person_id;
}
let REACT_APP_SERVER = "https://www.butt-and-co.co.uk"
export const addContactOnServer = async (customer_name, email, customer_address, city, postcode, phone) => {
  try {
    const { data } = await axios.post(
      `${REACT_APP_SERVER}/create-driver-customer/`,
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
      `${REACT_APP_SERVER}/api/responsible_persons/${Rp.id}/customers/`,

    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactOnServer = async (customer_name, email, id, customer_address, city, postcode, phone) => {
  try {
    const { data } = await axios.patch(
        `${REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`,
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
      `${REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getContactById = async (id) => {
  try {
    const { data } = await axios.get(
        `${REACT_APP_SERVER}/api/responsible_persons_edit/${Rp.id}/customers/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};


export const Product_Add_DriverStock = async (product_name, discount_amount,price)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/`,{
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
        `${REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/${id}/`,{
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
        `${REACT_APP_SERVER}/responsible-persons/${Rp.id}/driver-stocks/${id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const Product_Get_DriverStock = async ()=>{
  try {
    const { data } = await axios.get(
        `${REACT_APP_SERVER}/responsible-persons-query/${Rp.id}/driver-stocks/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}


export const SaveInvoice = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/api/invoice/`,{
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
        `${REACT_APP_SERVER}/api/unpaid_invoices/`,{
          responsible_person_id:Rp.id,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
// /api/invoiceupdate/<invoice_id>/

export const UpDateInvoice = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/api/invoiceupdate/${obj.id}/`,{
          ...obj,
          responsible_person_id:Rp.id,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const DelInvoice = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/api/invoicedelete/${obj.id}/`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const UPAllInvoice = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/update_invoice_status/`,{
          invoice_ids:obj,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export const UPAllcomplete = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/update_invoice_complete/`,{
          invoice_ids:obj,
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const Login = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/api/manager/login/`,obj
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export  const  search_responsible_person = async (obj)=>{
  try {
    const { data } = await axios.get(
        `${REACT_APP_SERVER}/api/search_responsible_person/`,{
          params:obj
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
export  const  search_overdue_invoices = async (obj)=>{
  try {
    const { data } = await axios.post(
        `${REACT_APP_SERVER}/api/overdue_invoices/`,{
         ...obj
        }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}






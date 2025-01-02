import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  delInvoice,
  listInvoice,
  saveInvoice,
  upAllInvoice,
  upDateInvoice,
} from '../../apis/invoice';
import dayjs from 'dayjs';

// 异步操作定义
export const getInvoiceList = createAsyncThunk('invoice/list', listInvoice);
export const createInvoice = createAsyncThunk('invoice/create', saveInvoice);
export const updateInvoice = createAsyncThunk('invoice/update', upDateInvoice);
export const deleteInvoice = createAsyncThunk('invoice/delete', delInvoice);
export const upAllInvoices = createAsyncThunk('invoice/upAll', upAllInvoice);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    loading: false,
    invoices: [],
    discount: 0,
    totalAmount: 0,
    product_details_summary: [], // 新增字段
    isCanvas: true,
    open: false,
    editOpen: false,
    type: 'type1',
    contact: {},
    params: {
      customer_name: '',
      customer_address: '',
      customer_postal_code: '',
      customer_city: '',
      customer_email: '',
      customer_phone: '',
      description: '',
      invoice_date: dayjs().format('YYYY-MM-DD'),
      footerdescription: '',
      product_details: [],
      discount: 0,
      total_amount: 0,
    },
    addModalOpen: false,
    contacts: [],
    products: [],
    value: null,
    createContact: {},
    OBJ: {
      type1: {
        title: 'Choose Customer',
        head: 'Add New Customer',
      },
      type2: {
        title: 'Choose Product',
        head: 'Add New Product',
      },
    },
    chooseProductOpen: false,
    addProductModalOpen: false,
    searchContactTerm: '',
    searchProductTerm: '',
  },
  reducers: {
    updateIsCanvas: (state, action) => {
      state.isCanvas = action.payload;
    },
    updateOpen: (state, action) => {
      state.open = action.payload;
    },
    updateEditOpen: (state, action) => {
      state.editOpen = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
    updateContact: (state, action) => {
      state.contact = action.payload;
    },
    updateParams: (state, action) => {
      state.params = action.payload;
    },
    resetParams: (state, action) => {
      state.params = {
        customer_name: '',
        customer_address: '',
        customer_postal_code: '',
        customer_city: '',
        customer_email: '',
        customer_phone: '',
        description: '',
        invoice_date: dayjs().format('YYYY-MM-DD'),
        footerdescription: '',
        product_details: [],
        discount: 0,
        total_amount: 0,
      };
    },
    updateAddModalOpen: (state, action) => {
      state.addModalOpen = action.payload;
    },
    updateContacts: (state, action) => {
      state.contacts = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateValue: (state, action) => {
      state.value = action.payload;
    },
    updateCreateContact: (state, action) => {
      state.createContact = action.payload;
    },
    updateChooseProductOpen: (state, action) => {
      state.chooseProductOpen = action.payload;
    },
    updateAddProductModalOpen: (state, action) => {
      state.addProductModalOpen = action.payload;
    },
    updateSearchContactTerm: (state, action) => {
      state.searchContactTerm = action.payload;
    },
    updateSearchProductTerm: (state, action) => {
      state.searchProductTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvoiceList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInvoiceList.fulfilled, (state, action) => {
      const { invoices = [], product_details_summary = [] } = action.payload;

      state.invoices = invoices; // 更新发票列表
      state.product_details_summary = product_details_summary; // 更新产品详情汇总

      let discount = 0;
      let totalAmount = invoices.reduce((prev, currentValue) => {
        prev += currentValue.total_amount;
        discount += currentValue.discount;
        return prev;
      }, 0);

      state.discount = discount; // 更新总折扣
      state.totalAmount = totalAmount; // 更新总金额
      state.loading = false; // 加载结束
    });
    builder.addCase(upAllInvoices.fulfilled, (state, action) => {});
    builder.addCase(createInvoice.fulfilled, (state, action) => {});
    builder.addCase(updateInvoice.fulfilled, (state, action) => {});
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {});
  },
});

export const {
  updateIsCanvas,
  updateOpen,
  updateEditOpen,
  updateType,
  updateContact,
  updateParams,
  updateAddModalOpen,
  updateContacts,
  updateProducts,
  updateValue,
  updateCreateContact,
  resetParams,
  updateChooseProductOpen,
  updateAddProductModalOpen,
  updateSearchContactTerm,
  updateSearchProductTerm,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;

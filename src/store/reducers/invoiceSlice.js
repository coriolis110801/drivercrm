import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  delInvoice,
  listInvoice,
  listInvoicefuture,
  listInvoicenotpaid,
  saveInvoice,
  saveInvoicefuture,
  saveInvoicenotpaid,
  upAllInvoice,
  upAllInvoicefuture,
  upAllInvoicenotpaid,
  upDateInvoice,
} from '../../apis/invoice';
import dayjs from 'dayjs';

// 异步操作定义
export const getInvoiceList = createAsyncThunk('invoice/list', listInvoice);
export const getInvoiceListfuture = createAsyncThunk('invoice/listfuture', listInvoicefuture);
export const getInvoiceListnotpaid = createAsyncThunk('invoice/listnotpaid', listInvoicenotpaid);
export const createInvoice = createAsyncThunk('invoice/create', saveInvoice);
export const createInvoicefuture = createAsyncThunk('invoice/createfuture', saveInvoicefuture);
export const createInvoicenotpaid = createAsyncThunk('invoice/createnotpaid', saveInvoicenotpaid);
export const updateInvoice = createAsyncThunk('invoice/update', upDateInvoice);
export const deleteInvoice = createAsyncThunk('invoice/delete', delInvoice);
export const upAllInvoices = createAsyncThunk('invoice/upAll', upAllInvoice);
export const upAllInvoicesfuture = createAsyncThunk('invoice/upAllfuture', upAllInvoicefuture);
export const upAllInvoicesnotpaid = createAsyncThunk('invoice/upAllnotpaid', upAllInvoicenotpaid);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    loading: false,
    invoices: [],
    invoicesFuture: [], // 新增字段存储未来的发票
    invoicesNotPaid: [], // 新增字段存储未支付的发票
    discount: 0,
    totalAmount: 0,
    product_details_summary: [],
    discountfuture: 0, // 新增未来折扣
    totalAmountfuture: 0, // 新增未来总金额
    product_details_summary_future: [], // 新增未来产品详情汇总
    discountnotpaid: 0, // 新增未支付折扣
    totalAmountnotpaid: 0, // 新增未支付总金额
    product_details_summary_notpaid: [], // 新增未支付产品详情汇总
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

      state.invoices = invoices;
      state.product_details_summary = product_details_summary;

      let discount = 0;
      let totalAmount = invoices.reduce((prev, currentValue) => {
        prev += currentValue.total_amount;
        discount += currentValue.discount;
        return prev;
      }, 0);

      state.discount = discount;
      state.totalAmount = totalAmount;
      state.loading = false;
    });
    builder.addCase(getInvoiceListfuture.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInvoiceListfuture.fulfilled, (state, action) => {
      const { invoicesFuture = [], product_details_summary_future = [] } = action.payload;

      state.invoicesFuture = invoicesFuture;
      state.product_details_summary_future = product_details_summary_future;

      let discountfuture = 0;
      let totalAmountfuture = invoicesFuture.reduce((prev, currentValue) => {
        prev += currentValue.total_amount;
        discountfuture += currentValue.discount;
        return prev;
      }, 0);

      state.discountfuture = discountfuture;
      state.totalAmountfuture = totalAmountfuture;
      state.loading = false;
    });
    builder.addCase(getInvoiceListnotpaid.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getInvoiceListnotpaid.fulfilled, (state, action) => {
      const { invoicesNotPaid = [], product_details_summary_notpaid = [] } = action.payload;

      state.invoicesNotPaid = invoicesNotPaid;
      state.product_details_summary_notpaid = product_details_summary_notpaid;

      let discountnotpaid = 0;
      let totalAmountnotpaid = invoicesNotPaid.reduce((prev, currentValue) => {
        prev += currentValue.total_amount;
        discountnotpaid += currentValue.discount;
        return prev;
      }, 0);

      state.discountnotpaid = discountnotpaid;
      state.totalAmountnotpaid = totalAmountnotpaid;
      state.loading = false;
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {});
    builder.addCase(createInvoicefuture.fulfilled, (state, action) => {
      state.invoicesFuture.push(action.payload);
    });
    builder.addCase(createInvoicenotpaid.fulfilled, (state, action) => {
      state.invoicesNotPaid.push(action.payload);
    });
    builder.addCase(upAllInvoices.fulfilled, (state, action) => {});
    builder.addCase(upAllInvoicesfuture.fulfilled, (state, action) => {
      state.invoicesFuture = action.payload;
    });
    builder.addCase(upAllInvoicesnotpaid.fulfilled, (state, action) => {
      state.invoicesNotPaid = action.payload;
    });
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

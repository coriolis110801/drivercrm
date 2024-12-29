import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContactOnServer,
  deleteContactOnServer,
  getAllContacts,
  getContactById,
  updateContactOnServer,
  updateCustomer,
} from '../../apis/contact';
import { message } from 'antd';

export const getContactsList = createAsyncThunk('contact/list', getAllContacts);

export const createContact = createAsyncThunk(
  'contact/create',
  addContactOnServer,
);

export const updateContact = createAsyncThunk(
  'contact/update',
  updateContactOnServer,
);

export const deleteContact = createAsyncThunk(
  'contact/delete',
  deleteContactOnServer,
);

export const getContact = createAsyncThunk('contact/get', getContactById);

export const updateContactCustomer = createAsyncThunk(
  'contact/update/customer',
  updateCustomer,
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: [],
    contact: undefined,
    open: false,
    editOpen: false,
    searchData: '',
    contactId: undefined,
    responseMessage: null,
    responseColor: '#000000',
  },
  reducers: {
    updateContactId: (state, action) => {
      state.contactId = action.payload;
    },
    updateOpen: (state, action) => {
      state.open = action.payload;
    },
    updateEditOpen: (state, action) => {
      state.editOpen = action.payload;
    },
    updateSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    updateResponseMessage: (state, action) => {
      state.responseMessage = action.payload;
    },
    updateResponseColor: (state, action) => {
      state.responseColor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContactsList.fulfilled, (state, action) => {
      const data = action.payload;
      const tempArray = [];
      if (data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({ id: key, ...value });
        });
      }
      state.contacts = tempArray;
    });
    builder.addCase(createContact.fulfilled, (state, action) => {
      state.contacts = [...state.contacts, action.payload];
      message.success('Add Success!');
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      const { id, ...rest } = action.payload;
      const matchedContact = state.contacts.find(
        (contact) => contact.id === id,
      );
      if (matchedContact) {
        Object.keys(rest).forEach((key) => {
          matchedContact[key] = rest[key];
        });
      }
      state.contacts = [...state.contacts];
      message.success('Update Success!');
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.meta.arg,
      );
      message.success('Delete Success!');
    });
    builder.addCase(getContact.fulfilled, (state, action) => {
      state.contact = action.payload;
    });
    builder.addCase(updateContactCustomer.fulfilled, (state, action) => {});
  },
});

export const {
  updateContactId,
  updateOpen,
  updateEditOpen,
  updateSearchData,
  updateResponseMessage,
  updateResponseColor,
} = contactSlice.actions;

export default contactSlice.reducer;

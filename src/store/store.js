import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import invoiceReducer from './reducers/invoiceSlice';
import contactReducer from './reducers/contactSlice';
import productReducer from './reducers/productSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    invoice: invoiceReducer,
    contact: contactReducer,
    product: productReducer,
  },
});

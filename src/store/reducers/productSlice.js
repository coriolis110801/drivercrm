import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import {
  productAddDriverStock,
  productDeleteDriverStock,
  productGetDriverStock,
  productUpdateDriverStock,
} from '../../apis/product';

export const getProductsList = createAsyncThunk(
  'product/list',
  productGetDriverStock,
);

export const createProduct = createAsyncThunk(
  'product/create',
  productAddDriverStock,
);

export const updateProduct = createAsyncThunk(
  'product/update',
  productUpdateDriverStock,
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  productDeleteDriverStock,
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    open: false,
    editOpen: false,
    searchData: '',
    productId: undefined,
  },
  reducers: {
    updateProductId: (state, action) => {
      state.productId = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsList.fulfilled, (state, action) => {
      const data = action.payload;
      const tempArray = [];
      if (data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          tempArray.push({ id: key, ...value });
        });
      }
      state.products = tempArray;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products = [...state.products, action.payload];
      message.success('Add Success!');
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const { id, ...rest } = action.payload;
      const matchedProduct = state.products.find(
        (product) => product.id === id,
      );
      if (matchedProduct) {
        Object.keys(rest).forEach((key) => {
          matchedProduct[key] = rest[key];
        });
      }
      state.products = [...state.products];
      message.success('Update Success!');
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.meta.arg,
      );
      message.success('Delete Success!');
    });
  },
});

export const { updateProductId, updateOpen, updateEditOpen, updateSearchData } =
  productSlice.actions;

export default productSlice.reducer;

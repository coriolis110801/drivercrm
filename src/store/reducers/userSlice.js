import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../apis/user';
import { message } from 'antd';

export const userLogin = createAsyncThunk('user/login', login);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      message.info('登陆中。。。');
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      message.success('登陆成功。。。');
      state.user = action.payload;
      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
      localStorage.setItem('user_info', JSON.stringify(action.payload));
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      message.error('登录失败，请检查用户名或密码.');
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

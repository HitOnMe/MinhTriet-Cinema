import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../services/config";
import { message } from "antd";

export let loginActionService = createAsyncThunk(
  "userSlice/loginActionService",
  async (dataForm) => {
    let result = await http.post("/api/QuanLyNguoiDung/DangNhap", dataForm);
    return result.data.content;
  }
);

// lấy dữ liệu từ localStorage khi user bật web
// localStorage.getItem('key') ? JSON.parse(localStorage.getItem('key)) : null

const initialState = {
  dataLogin: localStorage.getItem("USER_LOGIN")
    ? JSON.parse(localStorage.getItem("USER_LOGIN"))
    : null, // <- chuỗi {} là true, để null để kết quả là false
  // trong trường hợp {} thì logic khi xử lý sẽ bị sai -> user rỗng vẫn load
  // để null cho không bị sai logic
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // tạo action để dispatch từ component
    setUserAction: (state, action) => {
      state.dataLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fullfilled: khi gọi api thành công
    // pending: khi gọi api đang chờ xử lý (loading)
    // reject: khi gọi api thất bại
    builder.addCase(loginActionService.fulfilled, (state, action) => {
      message.success("Đăng nhập thành công");
      state.dataLogin = action.payload;
    });
    builder.addCase(loginActionService.rejected, (state, action) => {
      message.error("Đăng nhập thất bại");
    });
  },
});

export const { setUserAction } = userSlice.actions;

export default userSlice.reducer;

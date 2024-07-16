import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedDataInfoState {
  selectedDataInfo: any[]; // 根据你的实际数据类型调整
}

const initialState: SelectedDataInfoState = {
  selectedDataInfo: [], // 初始值设为 null 或者其他合适的值
};

const selectedDataInfoSlice = createSlice({
  name: "selectedDataInfo",
  initialState,
  reducers: {
    setSelectedDataInfo: (state, action: PayloadAction<any>) => {
      state.selectedDataInfo = action.payload;
    },
  },
});

export const { setSelectedDataInfo } = selectedDataInfoSlice.actions;
export default selectedDataInfoSlice.reducer;

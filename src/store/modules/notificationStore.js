import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    date: "2025-04-15",
    time: "13:25:46",
    message: "人间四月芳菲尽，山寺桃花始盛开",
  },
  {
    date: "2025-04-16",
    time: "08:33:09",
    message: "乡村四月闲人少，才了蚕桑又插田",
  },
  {
    date: "2025-04-17",
    time: "16:48:12",
    message: "四月清和雨乍晴，南山当户转分明",
  },
  {
    date: "2025-04-18",
    time: "21:07:30",
    message: "四月南风大麦黄，枣花未落桐阴长",
  },
  {
    date: "2025-04-19",
    time: "02:50:22",
    message: "四月馀杭道，一晴生意繁",
  },
];

const notificationStore = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      console.log(action.payload);
      return [...state, action.payload];
    },
  },
});

const { addNotification } = notificationStore.actions;
const reducer = notificationStore.reducer;

export { addNotification };
export default reducer;

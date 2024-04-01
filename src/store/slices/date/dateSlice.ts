import { createSlice } from "@reduxjs/toolkit"
import moment from "moment/moment"

export const DATE_FORMAT = "YYYY-MM-DD"
export interface dataState {
  startDate: string
  endDate: string
}
const initialState: dataState = {
  startDate: moment().subtract(6, "days").format(DATE_FORMAT),
  endDate: moment().format(DATE_FORMAT),
}
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setStartDate: (state, { payload }: { payload: string }) => {
      state.startDate = payload
    },
    setEndDate: (state, { payload }: { payload: string }) => {
      state.endDate = payload
    },
  },
})

export const { setStartDate, setEndDate } = dateSlice.actions
export const dateReducer = dateSlice.reducer

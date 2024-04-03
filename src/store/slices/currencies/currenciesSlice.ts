import { createSlice } from "@reduxjs/toolkit"
import { CurrenciesSlice } from "../../../types/currencies.types.ts"
import { fetchCurrencies } from "./currenciesActions.ts"
import { toast } from "react-toastify"

const initialState: CurrenciesSlice = {
  data: {},
  status: "loading",
  apiRequestCounter: 0,
}
export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      Object.assign(state.data, payload.data)
      state.apiRequestCounter += payload.requestCounter
      state.status = "idle"
    })
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.status = "loading"
    })
    builder.addCase(fetchCurrencies.rejected, (_, action) => {
      toast(action.payload as string, { toastId: "show-error" })
    })
  },
})

export const currenciesReducer = currenciesSlice.reducer

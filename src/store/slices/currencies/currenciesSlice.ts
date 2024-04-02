import { createSlice } from "@reduxjs/toolkit"
import { Currencies } from "../../../types/currencies.types.ts"
import { fetchCurrencies } from "./currenciesActions.ts"

interface initialState {
  data: {
    [key: string]: Currencies
  }
  status: "idle" | "loading" | "error"
  apiRequestCounter: number
}

const initialState: initialState = {
  data: {},
  status: "idle",
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
  },
})

export const currenciesReducer = currenciesSlice.reducer

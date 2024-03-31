import { createSlice } from "@reduxjs/toolkit"
import { Currencies } from "../../types/currencies.types.ts"
import { fetchCurrencies } from "./currenciesActions.ts"

const initialState: Record<string, Currencies> = {}
export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrencies.fulfilled, (state, { payload }) => {
      Object.assign(state, payload)
    })
  },
})

export const currenciesReducer = currenciesSlice.reducer

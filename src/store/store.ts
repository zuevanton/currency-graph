import { configureStore } from "@reduxjs/toolkit"
import { currenciesReducer } from "./slices/currencies/currenciesSlice.ts"
import { dateReducer } from "./slices/date/dateSlice.ts"

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    date: dateReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

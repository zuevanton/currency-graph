import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCurrencies } from "../../../services/getCurrencies.ts"
import { RootState } from "../../store.ts"
import { Currencies } from "../../../types/currencies.types.ts"
import { getDatesInRange } from "../../../utils/getDatesInRange.ts"

interface Props {
  startDate: string
  endDate: string
}
export const fetchCurrencies = createAsyncThunk(
  "getCurrencies",
  async ({ startDate, endDate }: Props, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    let requestCounter = 0

    const dates = getDatesInRange(startDate, endDate).filter(
      (date) =>
        !Object.prototype.hasOwnProperty.call(state.currencies.data, date),
    )
    try {
      const currencies = await Promise.all(
        dates.map((date) => {
          requestCounter++
          return getCurrencies(date)
        }),
      )
      const newData = dates.reduce(
        (acc, next, currentIndex) => {
          acc[next] = currencies[currentIndex]
          return acc
        },
        {} as Record<string, Currencies>,
      )
      return { requestCounter, data: newData }
    } catch (e) {
      return thunkAPI.rejectWithValue("Error while fetching")
    }
  },
)

import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCurrencies } from "../../services/getCurrencies.ts"
import { RootState } from "../store.ts"
import { Currencies } from "../../types/currencies.types.ts"
import { getDatesInRange } from "../../utils/getDatesInRange.ts"

interface Props {
  startDate: string
  endDate: string
}
export const fetchCurrencies = createAsyncThunk(
  "getCurrencies",
  async ({ startDate, endDate }: Props, thunkAPI) => {
    const state = thunkAPI.getState() as RootState

    const dates = getDatesInRange(startDate, endDate).filter(
      (date) => !Object.prototype.hasOwnProperty.call(state.currencies, date),
    )
    const datesPromises = []
    console.log(state.currencies)
    try {
      for (const date of dates) {
        datesPromises.push(getCurrencies(date))
      }
      const currencies = await Promise.all(datesPromises)
      return dates.reduce(
        (acc, next, currentIndex) => {
          acc[next] = currencies[currentIndex]
          return acc
        },
        {} as Record<string, Currencies>,
      )
    } catch (e) {
      return thunkAPI.rejectWithValue("Error while fetching")
    }
  },
)

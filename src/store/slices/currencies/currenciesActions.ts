import { createAsyncThunk } from "@reduxjs/toolkit"
import { getCurrencies } from "../../../services/getCurrencies.ts"
import { type RootState } from "../../store.ts"
import { type Currencies } from "../../../types/currencies.types.ts"
import { getDatesInRange } from "../../../utils/getDatesInRange.ts"
import { AxiosError } from "axios"

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
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          return thunkAPI.rejectWithValue(
            "Отсутствуют данные за выбранный период",
          )
        }
      }
      return thunkAPI.rejectWithValue("Error while fetching")
    }
  },
)

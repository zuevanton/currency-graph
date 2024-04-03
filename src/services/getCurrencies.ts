import { $api } from "../http"
import {
  type Currencies,
  type CurrenciesResponse,
} from "../types/currencies.types.ts"

export const getCurrencies = async (date: string): Promise<Currencies> => {
  const response = await $api.get<CurrenciesResponse>(
    `currency-api@${date}/v1/currencies/rub.json`,
  )

  const { usd, eur, cny } = response.data.rub
  return {
    eur: +(1 / eur).toFixed(2),
    usd: +(1 / usd).toFixed(2),
    cny: +(1 / cny).toFixed(2),
  }
}

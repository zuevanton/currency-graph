import {
  type Currencies,
  type CurrenciesChartData,
  type CurrenciesSliceData,
  type CurrenciesToShow,
} from "../types/currencies.types.ts"

export const transformDataToChart = (
  currenciesData: CurrenciesSliceData,
  toShow: CurrenciesToShow,
  days: string[],
): CurrenciesChartData[] => {
  const result = Object.keys(toShow)
    .filter((item) => toShow[item as keyof typeof toShow])
    .map((item) => ({ data: [] as number[], label: item }))

  for (const day of days) {
    const currencies = currenciesData[day as keyof CurrenciesSliceData]
    if (currencies !== undefined) {
      for (const chartObj of result) {
        chartObj.data.push(currencies[chartObj.label as keyof Currencies])
      }
    }
  }
  return result
}

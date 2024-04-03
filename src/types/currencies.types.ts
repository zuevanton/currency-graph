export interface Currencies {
  usd: number
  cny: number
  eur: number
}
export interface CurrenciesResponse {
  date: string
  rub: Currencies
}

export interface CurrenciesSliceData {
  string?: Currencies
}
export interface CurrenciesSlice {
  data: CurrenciesSliceData
  status: "idle" | "loading" | "error"
  apiRequestCounter: number
}

export interface CurrenciesToShow {
  eur: boolean
  usd: boolean
  cny: boolean
}

export interface CurrenciesChartData {
  data: number[]
  label: string
}

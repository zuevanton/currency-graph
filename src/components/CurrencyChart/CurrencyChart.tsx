import { LineChart } from "@mui/x-charts"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/reduxHooks.ts"
import { getDatesInRange } from "../../utils/getDatesInRange.ts"
import { CircularProgress } from "@mui/material"

interface CurrenciesData {
  usd: number[]
  eur: number[]
  cny: number[]
}

export const CurrencyChart = () => {
  const { startDate, endDate } = useAppSelector((state) => state.date)
  const status = useAppSelector((state) => state.currencies.status)
  const currencies = useAppSelector((state) => state.currencies.data)

  const [currenciesData, setCurrenciesData] = useState<CurrenciesData>({
    usd: [],
    eur: [],
    cny: [],
  })
  const [days, setDays] = useState(getDatesInRange(startDate, endDate))

  useEffect(() => {
    setDays(getDatesInRange(startDate, endDate))
  }, [startDate, endDate])

  useEffect(() => {
    const newData = days.reduce(
      (acc, day) => {
        if (currencies[day] === undefined) return acc
        for (const currency in acc) {
          acc[currency as keyof CurrenciesData].push(
            currencies[day][currency as keyof (typeof currencies)[typeof day]],
          )
        }
        return acc
      },
      { usd: [], cny: [], eur: [] } as CurrenciesData,
    )

    setCurrenciesData(newData)
  }, [currencies, days])

  if (status === "loading") return <CircularProgress />

  return (
    <LineChart
      series={[
        { data: currenciesData.eur, label: "eur" },
        { data: currenciesData.usd, label: "usd" },
        { data: currenciesData.cny, label: "cny" },
      ]}
      xAxis={[{ scaleType: "point", data: days }]}
      yAxis={[
        {
          min: 7,
          max: 110,
        },
      ]}
    />
  )
}

import { LineChart } from "@mui/x-charts"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks.ts"
import { getDatesInRange } from "../../utils/getDatesInRange.ts"
import { Box, CircularProgress } from "@mui/material"
import {
  type CurrenciesChartData,
  type CurrenciesToShow,
} from "../../types/currencies.types.ts"
import { transformDataToChart } from "../../utils/transformDataToChart.tsx"
import { fetchCurrencies } from "../../store/slices/currencies/currenciesActions.ts"

interface Props {
  currenciesToShow: CurrenciesToShow
}

export const CurrencyChart = ({ currenciesToShow }: Props) => {
  const dispatch = useAppDispatch()
  const { startDate, endDate } = useAppSelector((state) => state.date)
  const { status, data: currencies } = useAppSelector(
    (state) => state.currencies,
  )

  const [chartData, setChartData] = useState<CurrenciesChartData[]>([])

  const days = useMemo(
    () => getDatesInRange(startDate, endDate),
    [startDate, endDate],
  )
  useEffect(() => {
    if (
      days.every((day) => Object.prototype.hasOwnProperty.call(currencies, day))
    ) {
      setChartData(transformDataToChart(currencies, currenciesToShow, days))
    } else {
      dispatch(fetchCurrencies({ startDate, endDate }))
    }
  }, [days, currenciesToShow, status])

  if (
    Object.keys(currenciesToShow).every(
      (key) => !currenciesToShow[key as keyof CurrenciesToShow],
    )
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        Выберите валюту для отображения данных
      </Box>
    )
  }

  if (status === "loading" || days.length !== chartData[0]?.data.length) {
    return <CircularProgress />
  }

  return (
    <LineChart
      series={chartData}
      xAxis={[{ scaleType: "point", data: days }]}
    />
  )
}

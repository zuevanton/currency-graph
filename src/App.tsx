import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.ts"
import { fetchCurrencies } from "./store/slices/currencies/currenciesActions.ts"
import moment from "moment"
import { Container, Grid, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import {
  DATE_FORMAT,
  setEndDate,
  setStartDate,
} from "./store/slices/date/dateSlice.ts"
import { CheckboxesGroup } from "./components/CheckboxesGroup/CheckboxesGroup.tsx"
import { CurrencyChart } from "./components/CurrencyChart/CurrencyChart.tsx"

function App() {
  const { startDate, endDate } = useAppSelector((state) => state.date)
  const dispatch = useAppDispatch()
  const [checkboxesStatus, setCheckboxesStatus] = useState({
    eur: false,
    usd: false,
    cny: false,
  })

  useEffect(() => {
    dispatch(fetchCurrencies({ startDate, endDate }))
  }, [startDate, endDate])

  return (
    <>
      <Container>
        <Typography variant="h2" component="h2" sx={{ marginBottom: "1rem" }}>
          Тестовое задание NVI Solutions
        </Typography>
        <Grid container>
          <Grid item md={4}>
            <CheckboxesGroup
              status={checkboxesStatus}
              onChange={setCheckboxesStatus}
            />
            <DatePicker
              label="Дата с"
              value={moment(startDate)}
              sx={{ marginBottom: "1rem" }}
              onChange={(newDate) =>
                dispatch(setStartDate(newDate!.format(DATE_FORMAT)))
              }
            />
            <DatePicker
              label="Дата по"
              value={moment(endDate)}
              onChange={(newDate) =>
                dispatch(setEndDate(newDate!.format(DATE_FORMAT)))
              }
            />
          </Grid>
          <Grid item md={8}>
            <CurrencyChart />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default App

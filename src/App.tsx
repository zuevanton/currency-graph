import { useState } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.ts"
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
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const { startDate, endDate } = useAppSelector((state) => state.date)
  const apiRequestCounter = useAppSelector(
    (state) => state.currencies.apiRequestCounter,
  )
  const dispatch = useAppDispatch()
  const [checkboxesStatus, setCheckboxesStatus] = useState({
    eur: false,
    usd: false,
    cny: false,
  })

  return (
    <>
      <Container>
        <Typography variant="h2" component="h2" sx={{ marginBottom: "1rem" }}>
          Тестовое задание NVI Solutions
        </Typography>
        <Grid container sx={{ marginBottom: "2rem" }}>
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
              disableFuture={true}
              maxDate={moment(endDate).subtract(1, "days")}
              format='DD/MM/YYYY'
            />
            <DatePicker
              label="Дата по"
              value={moment(endDate)}
              onChange={(newDate) =>
                dispatch(setEndDate(newDate!.format(DATE_FORMAT)))
              }
              disableFuture={true}
              minDate={moment(startDate).add(1, "days")}
              format='DD/MM/YYYY'
            />
          </Grid>
          <Grid item md={8}>
            <CurrencyChart currenciesToShow={checkboxesStatus} />
          </Grid>
        </Grid>
        <Typography variant="body1" component="p">
          Число запросов в API: {apiRequestCounter}
        </Typography>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </>
  )
}

export default App

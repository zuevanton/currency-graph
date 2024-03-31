import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks.ts"
import { fetchCurrencies } from "./store/slices/currenciesActions.ts"

function App() {
  const currencies = useAppSelector((state) => state.currencies)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchCurrencies({ startDate: "2024-03-25", endDate: "2024-03-30" }),
    )
  }, [])
  return (
    <>
      <ul>
        {Object.keys(currencies).map((date) => {
          const { cny, eur, usd } = currencies[date]
          return (
            <li key={date}>
              {cny} {eur} {usd}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App

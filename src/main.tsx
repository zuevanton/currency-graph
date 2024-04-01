import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import "moment/locale/zh-cn.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="zh-cn">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </LocalizationProvider>
    </BrowserRouter>
  </Provider>,
)

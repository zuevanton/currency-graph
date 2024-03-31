import axios from "axios"

export const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/"
export const $api = axios.create({
  baseURL: BASE_URL,
})

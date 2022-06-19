import { AppState } from "../AppState"
import { api } from "./AxiosService"





class IncomeService {
  async get() {
    const res = await api.get('api/ads')
    // why is this not triggering anymore?
    console.log(res.data)
    // push it to AppState
    AppState.incomeBoxes = res.data
  }
}

export const incomeService = new IncomeService()
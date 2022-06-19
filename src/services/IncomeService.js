import { AppState } from "../AppState"
import { api } from "./AxiosService"





class IncomeService {
  async get() {
    // using await...
    const res = await api.get('api/ads')
    // why is this not triggering anymore?
    // there's definitely an async issue. trying to access data before this service is triggered/completed...
    console.log(res.data)
    // push it to AppState
    // it's res.data not res...
    AppState.incomeBoxes = res.data
  }
}

export const incomeService = new IncomeService()
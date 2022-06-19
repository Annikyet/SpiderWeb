import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class ProfilesService {
  // 626af7659c788f325c9c151c
  async get(id) {
    const res = await api.get('api/profiles/' + id)
    // logger.log(res.data)
    AppState.profile = res.data
  }
}

export const profilesService = new ProfilesService()
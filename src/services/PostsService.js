import axios from "axios"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"





class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    // logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  // api/profiles/:id/posts
  async getByCreator(creatorId) {
    const res = await api.get('api/profiles/' + creatorId + '/posts')
    logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }
}

export const postsService = new PostsService()
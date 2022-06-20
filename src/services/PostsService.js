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
    // logger.log(res.data.posts)
    AppState.posts = res.data.posts
  }

  async likePost(postId) {
    const res = await api.post('api/posts/' + postId + '/like', AppState.account.id)
    // logger.log(res.data)
    // change AppState
    logger.log('likePost res.data: ', res.data.likeIds)
    // logger.log('', AppState.posts.find((p) => p.id == postId).likeIds.find((i) => i == AppState.account.id))
    logger.log('AppState.posts[thisId]', AppState.posts.find((p) => p.id == postId).likeIds)
    try {
      AppState.posts.find((p) => p.id == postId).likeIds = res.data.likeIds
    } catch (error) {
      logger.error('nope didnt work')
      logger.error(error)
    }
  }
}

export const postsService = new PostsService()
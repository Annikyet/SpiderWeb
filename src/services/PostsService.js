import axios from "axios"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
  async getAll(pageUrl = 'api/posts') {
    const res = await api.get(pageUrl)
    // logger.log(res.data)
    AppState.posts = res.data.posts
    AppState.pages.newer = res.data.newer
    AppState.pages.older = res.data.older
    // logger.log(AppState.pages)
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
    // logger.log('likePost res.data: ', res.data.likeIds)
    // logger.log('', AppState.posts.find((p) => p.id == postId).likeIds.find((i) => i == AppState.account.id))
    // logger.log('AppState.posts[thisId]', AppState.posts.find((p) => p.id == postId).likeIds)
    try {
      AppState.posts.find((p) => p.id == postId).likeIds = res.data.likeIds
      // AppState.posts = AppState.posts
    } catch (error) {
      logger.error('nope didnt work')
      logger.error(error)
    }
  }

  async createPost(postData) {
    // logger.log('imgUrl: ' + postData.imgUrl)
    // logger.log('bottomText: ' + postData.bottomText)
    if (postData.imgUrl == '') {postData.imgUrl = undefined}
    postData.creatorId = AppState.account.id
    try {
      const res = await api.post('api/posts', postData)
      logger.log('it worked!')
      logger.log(res.data)
      AppState.posts.unshift(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deletePost(postId) {
    try {
      const res = await api.delete('api/posts/' + postId)
      logger.log('post deleted')
      // probably not the best way to do this
      this.getAll()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const postsService = new PostsService()
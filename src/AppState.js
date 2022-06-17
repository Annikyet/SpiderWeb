import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [
    {
      _id: 'meow123',
      body: 'Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow.',
      imgUrl: 'https://thiscatdoesnotexist.com',
      creator: {
        picture: 'https://thiscatdoesnotexist.com',
        name: 'Meow McMeowFace'
      }
    }
  ]
})


// {
//   "body": {
//     "type": "String",
//     "required": true
//   },
//   "imgUrl": {
//     "type": "String"
//   },
//   "creatorId": {
//     "type": "ObjectId",
//     "required": true,
//     "ref": "Account"
//   },
//   "likeIds": [
//     {
//       "type": "ObjectId",
//       "ref": "Account"
//     }
//   ]
// }
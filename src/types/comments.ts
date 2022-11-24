export interface Comment {
  id: 1,
  body: string,
  postId: number,
  user: {
    id: number,
    username: string
  }
}
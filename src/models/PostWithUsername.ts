import { IPost } from "./Post";

export interface IPostWithUsername extends IPost {
  username: string;
}

import { IPost } from "../../models/Post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postWithCommentsRoute } from "../../routes";
import styles from "./Post.module.css";

export interface IPostProps {
  postId: string;
}

export const Post = ({ postId }: IPostProps) => {
  const [post, setPost] = useState<IPost | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((response) => {
          if (response.data) {
            setPost(response.data);
          }
        });
    } catch (e) {
      console.error(e);
    }
  }, [postId]);

  if (!post) return <div></div>;

  return (
    <div
      className={styles.postWrapper}
      onClick={() => navigate(`post/${post.id}`)}
      data-testid={"post"}
    >
      <h4>Username: {post.userId}</h4>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
    </div>
  );
};

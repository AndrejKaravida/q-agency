import { useNavigate } from "react-router-dom";
import styles from "./Post.module.css";
import { IPostWithUsername } from "../../models/PostWithUsername";
import { withMessage, WithMessageProps } from "../../hocs/withDefaultMessage";
import { useEffect } from "react";

export interface IPostProps extends WithMessageProps {
  post: IPostWithUsername;
}

const Post = ({ post, message }: IPostProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${message} ${Post.name} `);
  }, []);

  if (!post) return <div></div>;

  return (
    <div
      className={styles.postWrapper}
      onClick={() => navigate(`/post/${post.id}`)}
      data-testid={"post"}
    >
      <h4>Username: {post.username}</h4>
      <p>Title: {post.title}</p>
      <p>Body: {post.body}</p>
    </div>
  );
};

export default withMessage(Post);

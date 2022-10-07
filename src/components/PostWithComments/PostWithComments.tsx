import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IComment } from "../../models/Comment";
import Comment from "../Comment/Comment";
import styles from "./PostWithComment.module.css";
import { postsRoute } from "../../routes";
import { withMessage, WithMessageProps } from "../../hocs/withDefaultMessage";

const PostWithComments = ({ message }: WithMessageProps) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<IComment[]>([]);

  let { id } = useParams();

  useEffect(() => {
    console.log(`${message} ${PostWithComments.name} `);
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then((response) => {
          if (response.data) {
            setComments(response.data);
          }
        });
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  return (
    <>
      <div
        data-testid={"post-with-comments"}
        className={styles.postWithComments}
      >
        <p>Comments: </p>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <button onClick={() => navigate(postsRoute)}>HOME</button>
    </>
  );
};

export default withMessage(PostWithComments);

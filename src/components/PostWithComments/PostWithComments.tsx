import { useNavigate, useParams } from "react-router-dom";
import { homeRoute } from "../../routes";
import { useEffect, useState } from "react";
import axios from "axios";
import { IComment } from "../../models/Comment";
import { Comment } from "../Comment/Comment";
import styles from "./PostWithComment.module.css";

export const PostWithComments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState<IComment[]>([]);

  let { id } = useParams();

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
      <button onClick={() => navigate(homeRoute)}>HOME</button>
    </>
  );
};

import { IComment } from "../../models/Comment";
import styles from "./Comment.module.css";

interface IProps {
  comment: IComment;
}

export const Comment = ({ comment }: IProps) => {
  return (
    <div className={styles.comment} data-testid={"comment"}>
      <p>
        <b>User:</b>
      </p>
      <p> {comment.email}</p>
      <p>
        <b>Title:</b>
      </p>
      <p>{comment.name}</p>

      <p>
        <b>Body:</b>
      </p>
      <p>{comment.body}</p>
    </div>
  );
};

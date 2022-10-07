import { IComment } from "../../models/Comment";
import styles from "./Comment.module.css";
import { withMessage, WithMessageProps } from "../../hocs/withDefaultMessage";
import { useEffect } from "react";

interface IProps extends WithMessageProps {
  comment: IComment;
}

const Comment = ({ comment, message }: IProps) => {
  useEffect(() => {
    console.log(`${message} ${Comment.name} `);
  }, []);

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

export default withMessage(Comment);

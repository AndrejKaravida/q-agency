import { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "../../models/Post";
import Post from "../Post/Post";
import styles from "./Posts.module.css";
import { IUser } from "../../models/User";
import { IPostWithUsername } from "../../models/PostWithUsername";
import { withMessage, WithMessageProps } from "../../hocs/withDefaultMessage";

const Posts = ({ message }: WithMessageProps) => {
  const [postsWithUsername, setPostsWithUsername] = useState<
    IPostWithUsername[]
  >([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      const usersResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (usersResponse.data) {
        const postsResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsWithUsernames = postsResponse.data.map((post: IPost) => {
          const username =
            usersResponse.data.find((user: IUser) => user.id === post.userId)
              .username ?? "";

          return {
            ...post,
            username,
          };
        });
        setPostsWithUsername(postsWithUsernames);
      }
    };
    fetchUsersAndPosts();
  }, []);

  useEffect(() => {
    console.log(`${message} ${Posts.name} `);
  }, []);

  const filterPosts = () => {
    if (searchInput) {
      return postsWithUsername.filter((post) =>
        post.username.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    return postsWithUsername;
  };

  return (
    <div className={styles.postsContainer}>
      <h3>Posts</h3>
      <div>
        <p>Search posts by username: </p>
        <input
          data-testid={"search-input"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className={styles.postsWrapper}>
        {filterPosts().map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default withMessage(Posts);

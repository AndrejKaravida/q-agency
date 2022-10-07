import { useEffect, useState } from "react";
import axios from "axios";
import { IPost } from "../../models/Post";
import { Post } from "../Post/Post";
import styles from "./Posts.module.css";
import withConsolePrinting from "../hocs/withConsolePrinting";

export const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchInput, setSearchInput] = useState("");

  // const PostWithLogger = withConsolePrinting(Post);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const filterPosts = () => {
    if (searchInput) {
      return posts.filter(
        (post) => post.userId.toString() === searchInput.toString()
      );
    }
    return posts;
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
          <Post postId={post.id} key={post.id} />
        ))}
      </div>
    </div>
  );
};

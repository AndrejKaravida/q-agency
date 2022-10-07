import Post from "./Post";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IPostWithUsername } from "../../models/PostWithUsername";

describe("Post", () => {
  const post: IPostWithUsername = {
    userId: 1,
    body: "body-1",
    title: "title-1",
    id: 1,
    username: "username-test",
  };

  it("renders username, title and post body", async () => {
    render(
      <MemoryRouter>
        <Post post={post} />
      </MemoryRouter>
    );

    const title = await screen.findByText(post.title, { exact: false });
    const username = await screen.findByText(post.username, { exact: false });
    const body = await screen.findByText(post.body, { exact: false });

    expect(title).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("wraps post with appropriate styling", async () => {
    render(
      <MemoryRouter>
        <Post post={post} />
      </MemoryRouter>
    );

    const postWrapper = await screen.findByTestId("post");

    expect(postWrapper).toHaveClass("postWrapper");
  });
});

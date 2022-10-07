import Post from "./Post";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

    const title = await screen.findByText("title-1", { exact: false });
    const username = await screen.findByText("username-1", { exact: false });
    const body = await screen.findByText("body-1", { exact: false });

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

  it("navigates on post with comments page if post clicked", async () => {
    render(
      <MemoryRouter>
        <Post post={post} />
      </MemoryRouter>
    );

    const postWrapper = await screen.findByTestId("post");

    fireEvent.click(postWrapper);

    const postWithComments = await screen.findByTestId("post-with-comments");

    await new Promise((resolve) => setTimeout(resolve, 100));

    await waitFor(() => {
      expect(postWithComments).toBeInTheDocument();
    });
  });
});

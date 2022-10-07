import { IPost } from "../../models/Post";
import axios from "axios";
import { Post } from "./Post";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Post", () => {
  beforeEach(() => {
    const post: IPost = {
      userId: "username-1",
      body: "body-1",
      title: "title-1",
      id: "id-1",
    };
    axios.get = jest.fn().mockResolvedValue({ data: post });
  });

  it("renders username, title and post body", async () => {
    render(
      <MemoryRouter>
        <Post postId={"1"} />
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
        <Post postId={"1"} />
      </MemoryRouter>
    );

    const postWrapper = await screen.findByTestId("post");

    expect(postWrapper).toHaveClass("postWrapper");
  });

  it("navigates on post with comments page if post clicked", async () => {
    render(
      <MemoryRouter>
        <Post postId={"1"} />
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

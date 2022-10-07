import axios from "axios";
import { IComment } from "../../models/Comment";
import PostWithComments from "./PostWithComments";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("PostWithComment", () => {
  beforeEach(() => {
    const comments: IComment[] = [
      {
        email: "testuser1@user.com",
        name: "comment-title1",
        body: "comment-body1",
        postId: 1,
        id: 1,
      },
      {
        email: "testuser2@user.com",
        name: "comment-title2",
        body: "comment-body2",
        postId: 1,
        id: 2,
      },
      {
        email: "testuser3@user.com",
        name: "comment-title3",
        body: "comment-body2",
        postId: 1,
        id: 3,
      },
    ];

    axios.get = jest.fn().mockResolvedValue({ data: comments });
  });

  it("renders headline", async () => {
    render(
      <MemoryRouter>
        <PostWithComments />
      </MemoryRouter>
    );

    const headline = await screen.findByText("Comments:");

    expect(headline).toBeInTheDocument();
  });

  it("renders home button", async () => {
    render(
      <MemoryRouter>
        <PostWithComments />
      </MemoryRouter>
    );
    const homeButton = await screen.findByRole("button", { name: "HOME" });
    expect(homeButton).toBeInTheDocument();
  });

  it("initially renders all available comments", async () => {
    render(
      <MemoryRouter>
        <PostWithComments />
      </MemoryRouter>
    );

    const comments = await screen.findAllByTestId("comment");

    expect(comments).toHaveLength(3);
  });
});

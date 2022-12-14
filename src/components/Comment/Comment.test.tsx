import Comment from "./Comment";
import { render, screen } from "@testing-library/react";

describe("Comment", () => {
  const singleComment = {
    email: "testuser@user.com",
    name: "comment-title",
    body: "comment-body",
    postId: 1,
    id: 1,
  };
  it("displays user email, title and body", () => {
    render(<Comment comment={singleComment} />);

    const user = screen.getByText(singleComment.email);
    const title = screen.getByText(singleComment.name);
    const body = screen.getByText(singleComment.body);

    expect(user).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("displays comment wrapper with appropriate styling", () => {
    render(<Comment comment={singleComment} />);

    const comment = screen.getByTestId("comment");

    expect(comment).toHaveClass("comment");
  });
});

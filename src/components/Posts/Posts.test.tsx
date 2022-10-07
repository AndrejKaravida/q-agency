import { act, fireEvent, render, screen } from "@testing-library/react";
import Posts from "./Posts";
import { IPost } from "../../models/Post";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

describe("Posts", () => {
  beforeEach(() => {
    const posts: IPost[] = [
      { userId: 1, body: "body-1", title: "title-1", id: 11 },
      { userId: 2, body: "body-2", title: "title-2", id: 22 },
      { userId: 2, body: "body-3", title: "title-3", id: 33 },
    ];

    axios.get = jest.fn().mockResolvedValue({ data: posts });
  });

  it("initially renders all available posts", async () => {
    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    const posts = await screen.findAllByTestId("post");

    expect(posts).toHaveLength(3);
  });

  it("renders search input field correctly", async () => {
    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    await act(async () => {
      const searchInput = await screen.findByTestId("search-input");
      expect(searchInput).toBeInTheDocument();
    });
  });

  it("returns correct number of results for given search entry", async () => {
    render(
      <MemoryRouter>
        <Posts />
      </MemoryRouter>
    );

    const searchInput = await screen.findByTestId("search-input");

    fireEvent.change(searchInput, { target: { value: "2" } });

    const posts = await screen.findAllByTestId("post");

    expect(posts).toHaveLength(2);
  });
});

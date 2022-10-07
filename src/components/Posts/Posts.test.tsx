import { act, fireEvent, render, screen } from "@testing-library/react";
import Posts from "./Posts";
import { IPost } from "../../models/Post";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { IUser } from "../../models/User";
import { postsUrl, usersUrl } from "../utils/api-urls";

describe("Posts", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  beforeEach(() => {
    const posts: IPost[] = [
      { userId: 1, body: "body-1", title: "title-1", id: 11 },
      { userId: 2, body: "body-2", title: "title-2", id: 22 },
      { userId: 2, body: "body-3", title: "title-3", id: 33 },
    ];

    const users: IUser[] = [
      { id: 1, username: "user-1" },
      { id: 2, username: "user-2" },
    ];

    mock.onGet(postsUrl).reply(200, posts);
    mock.onGet(usersUrl).reply(200, users);
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

    fireEvent.change(searchInput, { target: { value: "user-2" } });

    const posts = await screen.findAllByTestId("post");

    expect(posts).toHaveLength(2);
  });
});

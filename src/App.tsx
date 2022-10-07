import Posts from "./components/Posts/Posts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { baseRoute, postRoute, postsRoute } from "./routes";
import PostWithComments from "./components/PostWithComments/PostWithComments";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={baseRoute} element={<Navigate to={postsRoute} />} />
          <Route path={postsRoute} element={<Posts />} />
          <Route path={postRoute} element={<PostWithComments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

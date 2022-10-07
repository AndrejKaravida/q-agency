import { Posts } from "./components/Posts/Posts";
import withConsolePrinting from "./components/hocs/withConsolePrinting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { homeRoute, postWithCommentsRoute } from "./routes";
import { PostWithComments } from "./components/PostWithComments/PostWithComments";
import "./App.css";

function App() {
  const PostsWithLogger = withConsolePrinting(Posts);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={homeRoute} element={<PostsWithLogger />} />
          <Route path={postWithCommentsRoute} element={<PostWithComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

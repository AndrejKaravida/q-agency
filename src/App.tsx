import Posts from "./components/Posts/Posts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { postRoute, postsRoute } from "./routes";
import PostWithComments from "./components/PostWithComments/PostWithComments";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={postsRoute} element={<Posts />} />
          <Route path={postRoute} element={<PostWithComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

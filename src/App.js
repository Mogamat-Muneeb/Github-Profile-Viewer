import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

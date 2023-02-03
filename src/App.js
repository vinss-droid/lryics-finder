import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Lyrics from "./components/Lyrics";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route exact path={'/'} element={<Home />} />
                <Route path={'/search/lyrics/:id'} element={<Lyrics />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;

import { Route } from "react-router-dom";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/MainHeader/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Proj from "./pages/Proj";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
      <Route path="/contact">
          <Contact/>
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/my-projects">
          <Proj />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

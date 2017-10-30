import React, {
  Component
} from 'react';
import Nav from "./components/Nav/Nav";
import Welcome from "./pages/Welcome";
import GoodsContainer from "./pages/GoodsContainer";

import "./App.css";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav_bar">
            <Nav></Nav>
          </div>
          <div className="content">
            <Route path="/welcome" component={Welcome}></Route>
            <Route path="/goods" component={GoodsContainer}></Route>
            <Route path="/product" component={GoodsContainer}></Route>
            <Route path="/" exact component={Welcome}></Route>
          </div>
        </div>
      </Router>
    );
  };
};

export default App;
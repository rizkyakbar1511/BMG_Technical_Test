import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import People from "./pages/People";
import Footer from "./components/Footer";
import "./App.css";
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = { queries: { refetchOnWindowFocus: false } }; //config for refetching data when u refocus the browser tab / window

function App() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/movies" component={Movies} />
          <Route path="/tv" component={Tv} />
          <Route path="/people" component={People} />
        </Switch>
        <Footer />
      </Router>
    </ReactQueryConfigProvider>
  );
}

export default App;

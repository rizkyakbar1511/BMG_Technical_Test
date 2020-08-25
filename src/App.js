import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Popular from "./pages/Movies/Popular";
import NowPlaying from "./pages/Movies/NowPlaying";
import Upcoming from "./pages/Movies/Upcoming";
import TopRated from "./pages/Movies/TopRated";
import PopularTv from "./pages/Tv/Popular";
import Airing from "./pages/Tv/Airing";
import TopRatedTv from "./pages/Tv/TopRated";
import OnTv from "./pages/Tv/OnTv";
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
          <Route exact path="/movie" component={Popular} />
          <Route path="/movie/now-playing" component={NowPlaying} />
          <Route path="/movie/upcoming" component={Upcoming} />
          <Route path="/movie/top-rated" component={TopRated} />
          <Route exact path="/tv" component={PopularTv} />
          <Route path="/tv/airing-today" component={Airing} />
          <Route path="/tv/on-the-air" component={OnTv} />
          <Route path="/tv/top-rated" component={TopRatedTv} />
          <Route path="/person" component={People} />
        </Switch>
        <Footer />
      </Router>
    </ReactQueryConfigProvider>
  );
}

export default App;

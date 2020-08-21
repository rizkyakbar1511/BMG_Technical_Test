import React from "react";
import Jumbotron from "../components/Jumbotron";
import Upcoming from "../components/Film/Upcoming";
import Popular from "../components/Film/Popular";

function Home() {
  return (
    <div>
      <Jumbotron />
      <Upcoming />
      <Popular />
    </div>
  );
}

export default Home;

import React from "react";
import { Popper, List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";

export function MoviesPopper({ popperEl, classes }) {
  const open = Boolean(popperEl);
  const id = open ? "movie-popper" : undefined;
  return (
    <Popper id={id} open={open} anchorEl={popperEl}>
      <div className={classes.paper}>
        <List>
          <ListItem>
            <Link className={classes.paperLink} to="/movie">
              Popular
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={classes.paperLink} to="/movie/now-playing">
              Now Playing
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={classes.paperLink} to="/movie/upcoming">
              Upcoming
            </Link>
          </ListItem>
          <ListItem button>
            <Link className={classes.paperLink} to="/movie/top-rated">
              Top Rated
            </Link>
          </ListItem>
        </List>
      </div>
    </Popper>
  );
}

export function TvPopper({ popperEl, classes }) {
  const open = Boolean(popperEl);
  const id = open ? "tv-popper" : undefined;
  return (
    <Popper id={id} open={open} anchorEl={popperEl}>
      <div className={classes.paper}>
        <List>
          <ListItem>
            <Link className={classes.paperLink} to="/tv">
              Popular
            </Link>
          </ListItem>
          <ListItem>
            <Link className={classes.paperLink} to="/tv/airing-today">
              Airing Today
            </Link>
          </ListItem>
          <ListItem>
            <Link className={classes.paperLink} to="/tv/on-the-air">
              On Tv
            </Link>
          </ListItem>
          <ListItem>
            <Link className={classes.paperLink} to="/tv/top-rated">
              Top Rated
            </Link>
          </ListItem>
        </List>
      </div>
    </Popper>
  );
}

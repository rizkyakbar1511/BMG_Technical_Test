import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Popover,
  Typography,
  InputBase,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { useQuery } from "react-query";
import { API_KEYS_V3 } from "../../keys";

export default function DesktopMenu({
  classes,
  handleClick,
  handleClose,
  anchorEl,
}) {
  const [search, setSearch] = useState("");
  const { isLoading, error, data, refetch } = useQuery("searchFilm", () =>
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEYS_V3}&language=en-US&query=${search}&page=1&include_adult=false`
    ).then((res) => res.json())
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const searchEvent = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    refetch();
  }, [search, refetch]);
  if (isLoading) return <CircularProgress />;
  if (error) return <p>error...</p>;

  return (
    <Fragment>
      <Grid item xs={4} md={8} className={classes.navMidItem}>
        <Box component="div" className={classes.navItemWrapper}>
          <Link className={classes.navLink} to="/movies">
            Movies
          </Link>
          <Link className={classes.navLink} to="/tv">
            TV Shows
          </Link>
          <Link className={classes.navLink} to="/people">
            People
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={searchEvent}
            />
          </div>
          {data && (
            <Fragment>
              {isLoading && <LinearProgress />}
              {data.results && search !== "" ? (
                <div className={classes.searchResult}>
                  {data.results.map((item) => (
                    <ListItem
                      button
                      style={{ display: "flex", color: "#393534" }}
                      key={item.id}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={item.title}
                          src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title || item.original_name}
                      />
                    </ListItem>
                  ))}
                </div>
              ) : null}
            </Fragment>
          )}
        </Box>
      </Grid>
      <Grid item xs={4} md={2} className={classes.navRightItem}>
        <Button
          className={classes.navLink}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Add />
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography className={classes.typography}>
            Can't find a movie or TV show? Login to create it.
          </Typography>
        </Popover>
        <Link className={classes.navLink} to="/login">
          Login
        </Link>
        <Link className={classes.navLink} to="/">
          Register
        </Link>
      </Grid>
    </Fragment>
  );
}

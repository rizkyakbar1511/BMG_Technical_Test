import React, { Fragment, useEffect } from "react";
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
import { useQuery } from "react-query";
import { useStoreState, useStoreActions } from "easy-peasy";
import { MoviesPopper, TvPopper } from "../Popper";
import { fetchSearch } from "../../utils/utils";
import SearchIcon from "@material-ui/icons/Search";

export default function DesktopMenu({ classes }) {
  const { triggerMovie, triggerTv, setSearch, setPopover } = useStoreActions(
    (actions) => ({
      triggerMovie: actions.popper.triggerMovie,
      triggerTv: actions.popper.triggerTv,
      setSearch: actions.search.setSearch,
      setPopover: actions.popover.setPopover,
    })
  );
  const { moviePopperEl, tvPopperEl, popoverEl, search } = useStoreState(
    (state) => ({
      moviePopperEl: state.popper.movie,
      tvPopperEl: state.popper.tv,
      search: state.search.search,
      popoverEl: state.popover.popover,
    })
  );

  const { isLoading, error, data, refetch } = useQuery(["searchFilm"], () =>
    fetchSearch(search)
  );
  const openPopover = Boolean(popoverEl);
  const idPopover = openPopover ? "desktop-menu-popover" : undefined;

  useEffect(() => {
    refetch();
  }, [search, refetch]);
  if (isLoading) return <CircularProgress />;
  if (error) return <p>error...</p>;

  return (
    <Fragment>
      <Grid item xs={4} md={8} className={classes.navMidItem}>
        <Box component="div" className={classes.navItemWrapper}>
          <Link
            className={classes.navLink}
            to="/"
            onMouseOver={(e) =>
              triggerMovie(moviePopperEl ? null : e.currentTarget)
            }
          >
            Movies
          </Link>
          <Link
            className={classes.navLink}
            to="/"
            onMouseOver={(e) => triggerTv(tvPopperEl ? null : e.currentTarget)}
          >
            TV Shows
          </Link>
          <Link className={classes.navLink} to="/person">
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {data && (
            <Fragment>
              {isLoading && <LinearProgress />}
              {data.results && search !== "" ? (
                <div className={classes.searchResult}>
                  {data.results.map(
                    ({
                      id,
                      title,
                      poster_path,
                      profile_path,
                      original_name,
                      name,
                    }) => (
                      <ListItem
                        button
                        style={{ display: "flex", color: "#393534" }}
                        key={id}
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={title}
                            src={
                              !name
                                ? `https://image.tmdb.org/t/p/w185/${poster_path}`
                                : `https://image.tmdb.org/t/p/w185/${profile_path}`
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={title || original_name || name}
                        />
                      </ListItem>
                    )
                  )}
                </div>
              ) : null}
            </Fragment>
          )}
        </Box>
      </Grid>
      <Grid item xs={4} md={2} className={classes.navRightItem}>
        <Button
          className={classes.navLink}
          aria-describedby={idPopover}
          onClick={(e) => setPopover(e.currentTarget)}
        >
          <Add />
        </Button>
        <Popover
          id={idPopover}
          open={openPopover}
          anchorEl={popoverEl}
          onClose={() => setPopover(null)}
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
        <MoviesPopper popperEl={moviePopperEl} classes={classes} />
        <TvPopper popperEl={tvPopperEl} classes={classes} />
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

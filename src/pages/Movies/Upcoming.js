import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  LinearProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { Star } from "@material-ui/icons";
import { useQuery } from "react-query";
import { useStoreState, useStoreActions } from "easy-peasy";
import Snackbar from "@material-ui/core/Snackbar";
import ModalDetail from "../../components/Modal/ModalDetail";
import Alert from "../../components/Alert";
import { fetchUpcoming } from "../../utils/utils";

export default function Upcoming() {
  const classes = useStyles();
  const { setMovieId, setPages, setOpen, setTrigger } = useStoreActions(
    (actions) => ({
      setMovieId: actions.movie.setMovieId,
      setPages: actions.movie.setPages,
      setOpen: actions.movie.setOpen,
      setTrigger: actions.toast.setTrigger,
    })
  );

  const { movieId, pages, open, trigger } = useStoreState((state) => ({
    movieId: state.movie.movieId,
    pages: state.movie.pages,
    open: state.movie.open,
    trigger: state.toast.trigger,
  }));
  const { status, error, data, refetch } = useQuery("getMovies", () =>
    fetchUpcoming(pages)
  );

  const handleOpen = (id) => {
    setMovieId(id);
    setOpen(true);
  };

  useEffect(() => {
    if (status === "error") setTrigger(true);
    refetch();
    return () => {
      refetch();
    };
  }, [pages, refetch, status, setTrigger]);

  return (
    <div className={classes.root}>
      {status === "loading" && <LinearProgress />}
      {data && (
        <Container>
          <Box display="flex" component="div" flexWrap="wrap">
            <Typography variant="h4">Upcoming Movies</Typography>
            <ModalDetail
              handleOpen={handleOpen}
              handleClose={() => setOpen(false)}
              open={open}
              movieId={movieId}
            />
          </Box>
          <Grid container spacing={4} style={{ marginTop: "10px" }}>
            {data.results.map(
              ({ id, poster_path, title, vote_average, release_date }) => (
                <Grid item sm="auto" md="auto" key={id}>
                  <Card className={classes.card}>
                    <CardActionArea onClick={() => handleOpen(id)}>
                      <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/w185/${poster_path}`}
                        title={title}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" noWrap={true}>
                          {title}
                        </Typography>
                        <Typography>
                          <Star style={{ color: "#FF7314" }} /> {vote_average}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Release Date : {release_date}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
          <Box
            component="div"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="14px"
          >
            <Pagination
              count={data.total_pages}
              shape="rounded"
              onClick={(e) => setPages(e.target.textContent)}
            />
          </Box>
        </Container>
      )}
      {status === "error" && (
        <Snackbar
          open={trigger}
          autoHideDuration={6000}
          onClose={() => setTrigger(false)}
        >
          <Alert onClose={() => setTrigger(false)} severity="error">
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: "50px 50px 30px 50px",
  },
  card: {
    maxWidth: 200,
    maxHeight: 320,
    minWidth: 200,
    minHeight: 330,
    "&:hover": {
      webkitBoxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
      mozBoxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
      boxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
    },
  },
  buttonFilter: {
    color: "#FF7314",
  },
  media: {
    height: 225,
    borderRadius: "6px",
    outline: "none",
  },
});

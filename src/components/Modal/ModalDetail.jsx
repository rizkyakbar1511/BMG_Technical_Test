import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { Star } from "@material-ui/icons";
import Snackbar from "@material-ui/core/Snackbar";
import { useStoreState, useStoreActions } from "easy-peasy";
import Modal from "@material-ui/core/Modal";
import Alert from "../Alert";
import { fetchDetailMovie, fetchMovieVideos } from "../../utils/utils";

export default function ModalDetail({ handleClose, open, movieId }) {
  const classes = useStyles();
  const setTrigger = useStoreActions((actions) => actions.toast.setTrigger);
  const { trigger, modalStyle } = useStoreState((state) => ({
    trigger: state.toast.trigger,
    modalStyle: state.modal.modalStyle,
  }));
  const { isFetching, status, error, data, refetch } = useQuery(
    "detailMovie",
    () => fetchDetailMovie(movieId)
  );
  const { data: videos, refetch: videoRefetch } = useQuery("getVideos", () =>
    fetchMovieVideos(movieId)
  );

  useEffect(() => {
    if (status === "error") setTrigger(true);
    refetch();
    videoRefetch();
    return () => {
      refetch();
      videoRefetch();
    };
  }, [movieId, videoRefetch, refetch, status, setTrigger]);

  return (
    <div>
      {isFetching && <LinearProgress />}
      {data && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="all-modal-detail"
          aria-describedby="all-modal-description"
        >
          {isFetching ? (
            <Box className={classes.loadingContainer} component="div">
              <CircularProgress />
            </Box>
          ) : (
            <div style={modalStyle} className={classes.paper} key={data.id}>
              <Grid container>
                <Grid item md={4}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                    alt={data.original_title}
                  />
                </Grid>
                <Grid item md={8}>
                  <h2 id="simple-modal-title">{data.original_title}</h2>
                  <Box display="flex" component="div" width="350px">
                    <Typography>
                      <Star style={{ color: "#FF7314" }} /> {data.vote_average}
                    </Typography>
                    <Box
                      display="flex"
                      component="div"
                      justifyContent="space-between"
                      width="80%"
                      alignItems="center"
                      marginLeft="10px"
                    >
                      {videos && videos.results ? (
                        <>
                          {videos.results.map(({ key, id, size }) => (
                            <a
                              rel="noopener noreferrer"
                              className={classes.trailerButton}
                              href={`https://www.youtube.com/watch?v=${key}`}
                              target="_blank"
                              key={id}
                            >
                              {size}p
                            </a>
                          ))}
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  <Typography variant="caption">
                    {data.genres && data.genres[0] ? data.genres[0].name : null}
                  </Typography>
                  <p id="simple-modal-description">
                    {data.overview !== ""
                      ? data.overview
                      : "We don't have an overview translated in English. Help us expand our database by adding one."}
                  </p>
                </Grid>
              </Grid>
            </div>
          )}
        </Modal>
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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  trailerButton: {
    display: "block",
    textDecoration: "none",
    padding: "10px",
    backgroundColor: "#FF7314",
    color: "#393534",
    borderRadius: "10px",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}));

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
import Modal from "@material-ui/core/Modal";
import { fetchDetailTv, fetchVideos } from "../../utils/utils";
import { useStoreState, useStoreActions } from "easy-peasy";
import Alert from "../Alert";

export default function ModalDetailTv({ handleClose, open, tvId }) {
  const classes = useStyles();
  const setTrigger = useStoreActions((actions) => actions.toast.setTrigger);
  const { trigger, modalStyle } = useStoreState((state) => ({
    trigger: state.toast.trigger,
    modalStyle: state.modal.modalStyle,
  }));
  const { isFetching, status, error, data, refetch } = useQuery(
    "detailTv",
    () => fetchDetailTv(tvId)
  );
  const { data: videos, refetch: videoRefetch } = useQuery("getVideos", () =>
    fetchVideos(tvId)
  );

  useEffect(() => {
    if (status === "error") setTrigger(true);
    refetch();
    videoRefetch();
  }, [tvId, refetch, videoRefetch, status, setTrigger]);

  return (
    <div>
      {status === "loading" && <LinearProgress />}
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
            <div style={modalStyle} className={classes.paper}>
              <Grid container>
                <Grid item md={4}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${data.poster_path}`}
                    alt={data.original_name}
                  />
                </Grid>
                <Grid item md={8}>
                  <h2 id="simple-modal-title">{data.original_name}</h2>
                  <Box
                    display="flex"
                    component="div"
                    width="400px"
                    flexDirection="column"
                  >
                    <Box display="flex" component="div" alignItems="center">
                      <Star style={{ color: "#FF7314" }} />
                      <Typography>{data.vote_average}</Typography>
                    </Box>
                    <Box
                      display="flex"
                      component="div"
                      justifyContent="flex-start"
                      width="150%"
                      flexWrap="wrap"
                      alignItems="center"
                      marginBottom="14px"
                      marginTop="14px"
                    >
                      {videos && videos.results ? (
                        <>
                          {videos.results.map(({ key, size }) => (
                            <a
                              rel="noopener noreferrer"
                              className={classes.trailerButton}
                              href={`https://www.youtube.com/watch?v=${key}`}
                              target="_blank"
                            >
                              {size}p
                            </a>
                          ))}
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  <Typography variant="caption">
                    Genre :{" "}
                    {data.genres && data.genres[0]
                      ? data.genres[0].name
                      : "unknown"}
                  </Typography>
                  <Typography className={classes.typographTitle}>
                    Overview
                  </Typography>
                  <>
                    {data.overview && (
                      <Typography
                        className={classes.typographBody}
                        noWrap={data.overview.length > 800 ? true : false}
                      >
                        {data.overview !== ""
                          ? data.overview
                          : "We don't have an overview translated in English. Help us expand our database by adding one."}
                      </Typography>
                    )}
                  </>
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
    width: 1050,
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
    marginRight: 10,
    marginBottom: 5,
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  typographTitle: {
    fontWeight: 600,
    fontSize: "1.3em",
    marginBottom: 8,
    marginTop: 8,
  },
  typographBody: {
    textAlign: "justify",
  },
}));

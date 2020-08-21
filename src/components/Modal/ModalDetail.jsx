import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { API_KEYS_V3 } from "../../keys";
import { Star } from "@material-ui/icons";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
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

export default function ModalDetail({ handleClose, open, movieId }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const {
    isFetching,
    isLoading,
    error,
    data,
    refetch,
  } = useQuery("detailMovie", () =>
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEYS_V3}&language=en-US`
    ).then((res) => res.json())
  );
  const { data: videos, refetch: videoRefetch } = useQuery("getVideos", () =>
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEYS_V3}&language=en-US`
    ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
    videoRefetch();
  }, [movieId, videoRefetch, refetch]);

  return (
    <div>
      {isLoading && <LinearProgress />}
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
                    src={`https://image.tmdb.org/t/p/w300/${data.backdrop_path}`}
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
                          {videos.results.map((video) => (
                            <a
                              rel="noopener noreferrer"
                              className={classes.trailerButton}
                              href={`https://www.youtube.com/watch?v=${video.key}`}
                              target="_blank"
                            >
                              {video.size}p
                            </a>
                          ))}
                        </>
                      ) : null}
                    </Box>
                  </Box>
                  <Typography variant="caption">
                    {data.genres ? data.genres[0].name : null}
                  </Typography>
                  <p id="simple-modal-description">{data.overview}</p>
                </Grid>
              </Grid>
            </div>
          )}
        </Modal>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}

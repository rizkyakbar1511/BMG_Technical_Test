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

export default function ModalPeople({ handleClose, open, personId }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const {
    isFetching,
    isLoading,
    error,
    data,
    refetch,
  } = useQuery("detailPeople", () =>
    fetch(
      `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEYS_V3}&language=en-US`
    ).then((res) => res.json())
  );

  useEffect(() => {
    refetch();
  }, [personId, refetch]);

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
            <div style={modalStyle} className={classes.paper}>
              <Grid container>
                <Grid item md={4}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`}
                    alt={data.original_title}
                  />
                </Grid>
                <Grid item md={8}>
                  <h2 id="simple-modal-title">{data.name}</h2>
                  <Box display="flex" component="div" width="350px">
                    <Typography>
                      <Star style={{ color: "#FF7314" }} /> {data.popularity}
                    </Typography>
                  </Box>
                  <Typography variant="caption">{data.imdb_id}</Typography>
                  <p id="simple-modal-description">{data.homepage}</p>
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

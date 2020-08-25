import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { useQuery } from "react-query";
import { Star } from "@material-ui/icons";
import { useStoreState, useStoreActions } from "easy-peasy";
import { fetchDetailPeople } from "../../utils/utils";
import Snackbar from "@material-ui/core/Snackbar";
import Modal from "@material-ui/core/Modal";
import Alert from "../Alert";

export default function ModalPeople({ handleClose, open, personId }) {
  const classes = useStyles();
  const setTrigger = useStoreActions((actions) => actions.toast.setTrigger);
  const { trigger, modalStyle } = useStoreState((state) => ({
    trigger: state.toast.trigger,
    modalStyle: state.modal.modalStyle,
  }));
  const { isFetching, status, error, data, refetch } = useQuery(
    "detailPeople",
    () => fetchDetailPeople(personId)
  );

  useEffect(() => {
    if (status === "error") setTrigger(true);
    refetch();
  }, [personId, refetch, status, setTrigger]);

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
                    src={`https://image.tmdb.org/t/p/w300/${data.profile_path}`}
                    alt={data.name}
                  />
                </Grid>
                <Grid item md={8}>
                  <h2 id="simple-modal-title">{data.name}</h2>
                  <Box
                    display="flex"
                    component="div"
                    width="350px"
                    alignItems="center"
                  >
                    <Star style={{ color: "#FF7314", width: "30px" }} />
                    <Typography>{data.popularity}</Typography>
                  </Box>
                  <Typography className={classes.typographTitle} variant="h3">
                    Biography
                  </Typography>
                  {data.biography && (
                    <Typography
                      className={classes.typographBody}
                      noWrap={data.biography.length > 1000 ? true : false}
                    >
                      {data.biography}
                    </Typography>
                  )}
                  <Button variant="contained" style={{ marginTop: 14 }}>
                    More
                  </Button>
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

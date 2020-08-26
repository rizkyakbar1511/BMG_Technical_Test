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
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import { useStoreState, useStoreActions } from "easy-peasy";
import Snackbar from "@material-ui/core/Snackbar";
import ModalPeople from "../components/Modal/ModalPeople";
import Alert from "../components/Alert";
import { fetchPeople } from "../utils/utils";

export default function People() {
  const classes = useStyles();
  const { setPersonId, setPages, setOpen, setTrigger } = useStoreActions(
    (actions) => ({
      setPersonId: actions.person.setPersonId,
      setPages: actions.movie.setPages,
      setOpen: actions.movie.setOpen,
      setTrigger: actions.toast.setTrigger,
    })
  );

  const { personId, pages, open, trigger } = useStoreState((state) => ({
    personId: state.person.personId,
    pages: state.movie.pages,
    filterBy: state.movie.filterBy,
    open: state.movie.open,
    trigger: state.toast.trigger,
  }));
  const { isFetching, status, error, data, refetch } = useQuery(
    "getMovies",
    () => fetchPeople(pages)
  );

  const handleOpen = (id) => {
    setPersonId(id);
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
            <Typography variant="h4">Popular People</Typography>
            <ModalPeople
              handleOpen={handleOpen}
              handleClose={() => setOpen(false)}
              open={open}
              personId={personId}
            />
          </Box>
          <Grid container spacing={4} style={{ marginTop: "10px" }}>
            {data.results.map((item) => (
              <Grid item sm="auto" md="auto" key={item.id}>
                <Card className={classes.card}>
                  {isFetching ? (
                    <Box className={classes.loadingContainer} component="div">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CardActionArea onClick={() => handleOpen(item.id)}>
                      <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}
                        title={item.name}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" noWrap={true}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.known_for_department}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  )}
                </Card>
              </Grid>
            ))}
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
    maxHeight: 300,
    minWidth: 200,
    minHeight: 300,
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
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 318,
  },
});

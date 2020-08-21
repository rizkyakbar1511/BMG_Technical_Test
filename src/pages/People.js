import React, { useState, useEffect } from "react";
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
import { Star } from "@material-ui/icons";
import { useQuery } from "react-query";
import { API_KEYS_V3 } from "../keys";
import ModalPeople from "../components/Modal/ModalPeople";

export default function People() {
  const [pages, setPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [personId, setPersonId] = useState("");
  const classes = useStyles();
  const { isFetching, isLoading, error, data, refetch } = useQuery(
    "getMovies",
    () =>
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
      ).then((res) => res.json())
  );
  const paginate = (e) => {
    setPages(e.target.textContent);
  };

  useEffect(() => {
    if (pages) refetch();
  }, [pages, refetch]);

  const handleOpen = (id) => {
    setPersonId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {isLoading && <LinearProgress />}
      {data && (
        <Container>
          <Box display="flex" component="div" flexWrap="wrap">
            <Typography variant="h4">Popular People</Typography>
            <ModalPeople
              handleOpen={handleOpen}
              handleClose={handleClose}
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
                        <Typography>
                          <Star style={{ color: "#FF7314" }} />{" "}
                          {item.popularity}
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
              onClick={paginate}
            />
          </Box>
        </Container>
      )}
      {error && <p>{error.message}</p>}
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
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 318,
  },
});

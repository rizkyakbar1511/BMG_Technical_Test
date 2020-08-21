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
  Button,
  ButtonGroup,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Star } from "@material-ui/icons";
import { usePaginatedQuery } from "react-query";
import { API_KEYS_V3 } from "../../keys";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";

export default function Popular() {
  const [filterBy, setFilterBy] = useState("movie");
  const [pages, setPages] = useState(1);
  const classes = useStyles();
  const {
    isFetching,
    status,
    resolvedData,
    error,
    refetch,
  } = usePaginatedQuery(["getPopular"], async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${filterBy}/popular?api_key=${API_KEYS_V3}&language=en-US&page=${pages}&include_adult=false`
    );
    return data;
  });

  const paginate = async (e) => {
    setPages(e.target.textContent);
  };
  useEffect(() => {
    refetch();
  }, [filterBy, pages, refetch]);

  return (
    <div className={classes.root}>
      {status === "loading" && <LinearProgress />}
      {resolvedData && (
        <Container>
          <Box display="flex" component="div" flexWrap="wrap">
            <Typography variant="h4">What's Popular</Typography>
            <ButtonGroup style={{ marginLeft: "14px" }}>
              <Button
                value="movie"
                onClick={() => {
                  setFilterBy("movie");
                }}
                className={classes.buttonFilter}
              >
                Movies
              </Button>
              <Button
                onClick={() => {
                  setFilterBy("tv");
                }}
                className={classes.buttonFilter}
              >
                On TV
              </Button>
            </ButtonGroup>
          </Box>

          <Grid container spacing={4} style={{ marginTop: "10px" }}>
            {resolvedData.results.map((item) => (
              <Grid item sm="auto" md="auto" key={item.id}>
                {status === "loading" && <LinearProgress />}
                <Card className={classes.card}>
                  {isFetching ? (
                    <Box className={classes.loadingContainer} component="div">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
                        title={item.title}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" noWrap={true}>
                          {item.title}
                        </Typography>
                        <Typography>
                          <Star style={{ color: "#FF7314" }} />{" "}
                          {item.vote_average}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Release Date : {item.release_date}
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
            paddingTop="33px"
          >
            <Pagination
              count={resolvedData.total_pages}
              shape="rounded"
              onClick={paginate}
            />
          </Box>
        </Container>
      )}
      {status === "error" && <p>{error.message}</p>}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    margin: "50px 50px 30px 50px",
    "&:hover": {
      webkitBoxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
      mozBoxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
      boxShadow: "0px 3px 5px 0px rgba(255,115,20,1)",
    },
    transition: "all 0.5s ease-out",
    borderRadius: 10,
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

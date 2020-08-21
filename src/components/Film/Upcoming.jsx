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
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { Star } from "@material-ui/icons";
import { usePaginatedQuery } from "react-query";
import { API_KEYS_V3 } from "../../keys";
import { Today } from "../../misc/misc";

export default function Upcoming() {
  const [pages, setPages] = useState(1);
  const classes = useStyles();
  const {
    isFetching,
    status,
    resolvedData,
    error,
    refetch,
  } = usePaginatedQuery(["getUpcoming"], async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEYS_V3}&language=en-US&page=${pages}`
    );
    return data;
  });
  const paginate = (e) => {
    setPages(e.target.textContent);
  };
  useEffect(() => {
    if (pages) refetch();
  }, [pages, refetch]);
  return (
    <div className={classes.root}>
      {status === "loading" && <LinearProgress />}
      {resolvedData && (
        <Container>
          <Box
            display="flex"
            component="div"
            flexWrap="wrap"
            flexDirection="column"
          >
            <Typography variant="h4">
              Upcoming in 20
              <span
                style={{
                  color: "#FF7314",
                  backgroundColor: "#22211F",
                  borderTopRightRadius: 6,
                  borderBottomRightRadius: 6,
                }}
              >
                20
              </span>
            </Typography>
            <Typography variant="caption">Updated : {Today()}</Typography>
          </Box>

          <Grid container spacing={4} style={{ marginTop: "10px" }}>
            {resolvedData.results.map((item) => (
              <Grid item sm="auto" md="auto" key={item.id}>
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
      {error && <p>{error.message}</p>}
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

import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useWindowWidth } from "@react-hook/window-size/throttled";

export default function Jumbotron() {
  const classes = useStyles();
  const pageSize = useWindowWidth();

  return (
    <Box
      className={classes.root}
      display="flex"
      component="div"
      alignItems="center"
      justifyContent="center"
      height="400px"
      style={
        pageSize > 750
          ? { backgroundSize: "100%" }
          : { backgroundSize: "100% 100%" }
      }
    >
      <Container>
        <Box
          display="flex"
          component="div"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <Typography className={classes.mainTitle} variant="h2">
            Welcome.
          </Typography>
          <Typography className={classes.subTitle} variant="h3">
            Millions of movies, TV shows and people to discover. Explore now.
          </Typography>
          <Box
            display="flex"
            component="div"
            maxWidth="700px"
            height="40px"
            flexWrap="wrap"
            marginTop="10px"
          >
            <form noValidate autoComplete="off">
              <input
                className={classes.input}
                type="text"
                placeholder="Email address"
              />
              <button
                onClick={(e) => e.preventDefault()}
                className={classes.buttonStart}
              >
                <Link
                  style={{ textDecoration: "none", color: "#F4F4F4" }}
                  to="/login"
                >
                  GET STARTED
                </Link>
              </button>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${"https://vistapointe.net/images/begin-again-8.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    color: "#F4F4F4",
  },
  mainTitle: {
    fontSize: "3em",
    fontWeight: 700,
    lineHeight: 1,
  },
  subTitle: {
    fontSize: "2em",
    fontWeight: 600,
    margin: 0,
  },
  buttonStart: {
    background: "#FF7314",
    height: "100%",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  input: {
    height: "100%",
  },
}));

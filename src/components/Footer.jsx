import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item md={4}>
            <Typography variant="h5">
              Questions? Call +62 838-0259-5929
            </Typography>
          </Grid>
          <Grid
            container
            item
            md={8}
            style={{ textAlign: "center", color: "#F4F4F4" }}
          >
            <Grid item sm={4} md={4}>
              <Typography>FAQ</Typography>
              <Typography>Investor Relatins</Typography>
              <Typography>Privacy</Typography>
              <Typography>Speed Test</Typography>
            </Grid>
            <Grid item sm={4} md={4}>
              <Typography>Help Center</Typography>
              <Typography>Jobs</Typography>
              <Typography>Cookie Preferences</Typography>
              <Typography>Legal Notices</Typography>
            </Grid>
            <Grid item sm={4} md={4}>
              <Typography>Account</Typography>
              <Typography>Ways to Watch</Typography>
              <Typography>Corporate Information</Typography>
              <Typography>Kasumi Originals</Typography>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Typography variant="caption">
              © 2014-2020, Kasumidb.com, Inc. or it affiliates
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    position: "relative",
    paddingTop: 20,
    paddingBottom: 20,
    bottom: 0,
    left: 0,
    width: "100%",
    maxHeight: "35vh",
    background: "#22211F",
    color: "#757575",
  },
});

import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  IconButton,
  Grid,
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function MobileMenu() {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Box
          component="div"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar
            alt="Remy Sharp"
            src="https://lh3.googleusercontent.com/-0L8NMxqi7vo/XlIVD3MkOwI/AAAAAAAAAAs/gQEcp3lMJToVhFl6tMKHNe263TcBRtm0wCEwYBhgLKtMDAL1OcqyBgYg7mMqCAg2RHVHobxCpJdbf1s-1YzLgEhlni8IdoRN2OTSGUgqLyyivG_EJgbU-1vrL6ZgaXbmjkZsocntZUhPpbKvMjW76AZRshGpyS_tJ3NblPmLwCZThBqQrYixajcpUY5VavLPgZxoi_DcSCPU3QKSzHlFp0ETb9QqYImLnZUN3cLcqHt7LaPfTGjAM98xwkHN3PlpSz2xEVum2kA6bzJvGKyHjXkwTzps5mNDFOuhltekYNOJmbC4RJ0FqmZs8IcGilJHmvpB1cBHvCz6n8DFw6ULvqNtvFg7_kivT6Hda5h-XHExML4S8ATxX5aYEm5sLszIytRXP2_ynrloCcNzYvZNH7UZjLPua8lNvTsOdqAfQ48EMxqhoGIJ3yBYHuSGkUD8FAfEsntaYNWP1Y2rseGqAFTDuX1eQ55SYv2ciUMYL_mg4APjaOEzZgXKgh2Ba8yFTK7WRwGhjd9Utntf-MG4_aAyunLgjCOGKdv3OLSdioIkVQXQrQFMerqCJXySD-DHdR6u07OBkKTztxpKCx70RZ3RUb2v3Emu6MjX55_IL7eY8ia0WyUgq9DJp6z1Sj6pVqOwa8J2nlosC2B_-0xRlC1KAoIYw9O_v-QU/w139-h140-p/ok_IMG_6985.jpg"
          />
          <ListItemText primary="Muhammad Rizki Akbar" />
        </Box>
      </List>
      <Divider />
      <List>
        <ListItem button>Movie</ListItem>
        <ListItem button>TV Shows</ListItem>
        <ListItem button>People</ListItem>
        <ListItem button>More</ListItem>
      </List>
    </div>
  );
  return (
    <Grid item xs={1}>
      <IconButton
        onClick={toggleDrawer("right", true)}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </Grid>
  );
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

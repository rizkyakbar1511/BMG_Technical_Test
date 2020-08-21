import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_KEYS_V3 } from "../keys";
import {
  Box,
  Container,
  Button,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "react-query";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Email from "@material-ui/icons/Email";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const { isLoading, error, data } = useQuery("auth", () =>
    fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEYS_V3}`
    ).then((res) => res.json())
  );

  const classes = useStyles();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  if (isLoading)
    return (
      <Box className={classes.loadingContainer} component="div">
        <CircularProgress />
      </Box>
    );
  if (error) return <p>error...</p>;

  return (
    <Box className={classes.root} display="flex" component="div">
      <Container>
        <Typography variant="h6">Login to your account</Typography>
        <Typography variant="subtitle1">
          In order to use the editing and rating capabilities of KasumiDB, as
          well as get personal recommendations you will need to login to your
          account. If you do not have an account, registering for an account is
          free and simple. <Link to="/">Click here</Link> to get started.
        </Typography>
        <Box
          display="flex"
          component="form"
          flexDirection="column"
          height="300px"
          justifyContent="space-evenly"
        >
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              value={values.email}
              onChange={handleChange("email")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Email />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Box className={classes.btnWrapper} component="div">
            <Button
              className={classes.btnLogin}
              type="submit"
              onClick={(e) => {
                localStorage.setItem("token", data.request_token);
                e.preventDefault();
              }}
            >
              Login
            </Button>
            <Link to="/login">Reset Password</Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    height: 450,
    padding: 30,
  },
  btnWrapper: {
    display: "flex",
    width: "200px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnLogin: {
    color: "#F4F4F4",
    background: "#FF7314",
  },
  loadingContainer: {
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

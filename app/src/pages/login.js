import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Component } from "react";
import { Link } from "react-router-dom";

const Login = () => (
  <div>
    <center>
      <Typography style={{ marginTop: 50 }} variant="display3">
        Welcome to ForeSome
      </Typography>
      <Link to="/menu" />
      {/* <Button
    //     style={{ marginTop: 60, padding: 30 }}
    //     component={Link}
    //     to="/menu"
    //     variant="contained"
    //     size="large"
    //     color="primary"
    //   >
    //     Register Here!
    //   </Button> */}
      <div>
        <img
          style={{ marginTop: 20, padding: 0, marginBottom: 20 }}
          width="280"
          height="280"
          alt="logo"
          src="/png-images/golf-310994_1280.png"
        />
      </div>
      {/* <div>
        {/* <Button
          component={Link}
          style={{ marginTop: 0, padding: 30 }}
          to="/login"
          variant="contained"
          size="large"
          color="secondary"
        >
          Login
        </Button> */}
      {/* </div>  */}
    </center>
  </div>
);

export default Login;

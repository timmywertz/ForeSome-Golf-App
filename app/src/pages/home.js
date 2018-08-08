import React from "react";
import { Button, withStyles } from "@material-ui/core";
import { Component } from "react";
import { Link } from "react-router-dom";

// const styles = theme => ({
//   container: {
//     display: "flex",
//     flexWrap: "wrap"
//   },
//   button: {
//     margin: theme.spacing.unit
//   }
// });

const register = props => <Link to="/register" {...props} />;

const Home = () => (
  <div>
    <Button variant="contained" size="large" component={register}>
      Register Here!
    </Button>
  </div>
);

export default Home;

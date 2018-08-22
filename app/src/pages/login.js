import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { createNewGolfer } from "../action-creators/golfers";
import { NEW_GOLFER_FORM_UPDATED } from "../constants";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justify: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const Login = props => {
  const {
    classes,
    onTextFieldChange,
    history,
    createGolfer,
    isError,
    isLoading,
    errMsg
  } = props;

  return (
    <div>
      <center>
        <form
          className={classes.container}
          onSubmit={createGolfer(history)}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="firstName"
            label="First Name"
            className={classes.textField}
            onChange={e => onTextFieldChange("firstName", e.target.value)}
            margin="normal"
          />
          <TextField
            required
            id="lastName"
            label="Last Name"
            className={classes.textField}
            onChange={e => onTextFieldChange("lastName", e.target.value)}
            margin="normal"
          />
          <TextField
            required
            id="email"
            label="Email"
            className={classes.textField}
            onChange={e => onTextFieldChange("emailAddress", e.target.value)}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={e => onTextFieldChange("password", e.target.value)}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="gender"
            label="Gender"
            className={classes.textField}
            onChange={e => onTextFieldChange("gender", e.target.value)}
            autoComplete="current-password"
            margin="normal"
          />
          <TextField
            id="handicap"
            label="handicap"
            type="range"
            defaultValue="36"
            className={classes.textField}
            onChange={e => onTextFieldChange("handicap", e.target.value)}
            margin="normal"
          />

          <Button
            variant="fab"
            color="primary"
            type="submit"
            value="submit"
            aria-label="add"
            className="fab-button"
            to="/menu"
          >
            <SaveIcon />
          </Button>
          <Button //type: submit? // or add tracker
            component={Link}
            style={{ marginLeft: 20, marginTop: 30, padding: 20 }}
            to="/menu"
            variant="contained"
            aria-label="add"
            size="large"
            color="secondary"
          >
            Next
          </Button>
        </form>
        {props.isError && (
          <CustomSnackBar message={props.errMessage} snackType="error" />
        )}
        {props.isSaving && (
          <CustomSnackBar message="Golfer Loading..." snackType="info" />
        )}
        {props.isAdded && (
          <CustomSnackBar
            message="Successfully Added Golfer"
            snackType="success"
          />
        )}
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  newGolfers: state.newGolfer.data,
  isError: state.newGolfer.isError,
  isLoading: state.newGolfer.isLoading,
  errMsg: state.newGolfer.errMsg,
  isAdded: state.newGolfer.isAdded
});

const mapActionsToProps = dispatch => {
  return {
    onTextFieldChange: (field, value) => {
      dispatch({ type: NEW_GOLFER_FORM_UPDATED, payload: { [field]: value } });
    },
    createGolfer: history => e => {
      e.preventDefault();
      dispatch(createNewGolfer(history));
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);

export default connector(withStyles(styles)(Login));

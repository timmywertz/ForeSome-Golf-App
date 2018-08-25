import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CustomSnackbar from "../components/snackbar";
import { HumanMale, HumanFemale } from "mdi-material-ui";
import { createNewGolfer } from "../action-creators/golfers";
import Typography from "@material-ui/core/Typography";
import { NEW_GOLFER_FORM_SAVE_STARTED } from "../constants";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  textField: {
    marginTop: 15,
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
    handleGenderSelected,
    gender,
    isError,
    isLoading,
    isAdded,
    errMsg,
    isSaving
  } = props;

  const genders = [
    {
      value: "male",
      label: <HumanMale />
    },
    {
      value: "female",
      label: <HumanFemale />
    },
    {
      value: "I'd rather not say",
      label: "I'd rather not say"
    }
  ];
  return (
    <div>
      {/* <Button
              style={{
                marginRight: 20,
                marginTop: 20,
                padding: 20,
                marginBottom: 20
              }}
              component={Link}
              type="submit"
              to="/"
              variant="contained"
              size="large"
              color="primary"
            >
              <
            </Button> */}
      <center>
        <Typography
          font="36"
          color="primary"
          style={{ marginTop: 40, marginBottom: 10 }}
          variant="display2"
        >
          LOGIN:
        </Typography>
        <form
          aria-describedby="Login Information"
          style={{ marginTop: 0 }}
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
            select
            label="Select"
            className={classes.textField}
            value={gender}
            onChange={handleGenderSelected}
            helperText="Please select your gender"
            margin="normal"
          >
            {genders.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="handicap"
            label="handicap"
            defaultValue="36"
            className={classes.textField}
            onChange={e => onTextFieldChange("handicap", e.target.value)}
            margin="normal"
          />
          <div>
            <Button
              className={classes.buttons}
              component={Link}
              type="submit"
              value="submit"
              aria-label="add"
              style={{
                marginRight: 20,
                marginTop: 20,
                padding: 20,
                marginBottom: 20
              }}
              to="/menu"
              variant="contained"
              size="large"
              color="primary"
            >
              SAVE AND NEXT {<SaveIcon />}
            </Button>
          </div>
        </form>
        {props.isError && (
          <CustomSnackbar message={props.errMessage} snackType="error" />
        )}
        {props.isLoading && (
          <CustomSnackbar message="New Golfer Loading..." snackType="info" />
        )}
        {props.isSaving && (
          <CustomSnackbar message="Golfer Saving..." snackType="info" />
        )}
        {props.isAdded && (
          <CustomSnackbar
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
  gender: state.newGolfer.data.gender,
  isError: state.newGolfer.isError,
  isLoading: state.newGolfer.isLoading,
  errMsg: state.newGolfer.errMsg,
  isAdded: state.newGolfer.isAdded,
  isSaving: state.newGolfer.isSaving
});

const mapActionsToProps = dispatch => {
  return {
    onTextFieldChange: (field, value) => {
      dispatch({
        type: NEW_GOLFER_FORM_SAVE_STARTED,
        payload: { [field]: value }
      });
    },
    // handleGenderSelected: (e, gender) => {
    //   dispatch({
    //     type: GOLFER_GENDER_SELECTED,
    //     payload: gender
    //   });
    // },
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

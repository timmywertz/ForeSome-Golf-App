import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginTop: 20,
    marginLeft: 100,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

function DatePickers(props) {
  const { classes, teeTimes } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Select Date"
        type="date"
        defaultValue="2018-08-26"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
  teeTimes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  teeTimes: state.teeTimes
});

const connector = connect(mapStateToProps);

export default connector(withStyles(styles)(DatePickers));

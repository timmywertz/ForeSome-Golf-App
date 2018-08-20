import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { NEW_TEETIME_SELECTED } from "../constants";

const styles = theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

// handleChange = event => {
//   this.setState({ value: event.target.value });
// };

const SelectButtons = props => {
  const { children, classes, value, onChange, label, handleChange } = props;

  // const handleChange = event => {
  //   this.setState({ value: event.target.value });
  // };
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Now Pick Your Time</FormLabel>
        <RadioGroup
          row={true}
          aria-label="golf course"
          name="golf course"
          className={classes.group}
          value={value}
          onChange={onChange}
        >
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            onChange={onChange}
          >
            {children}
          </FormControlLabel>
          {/* <FormControlLabel
            value="availableTeeTime2"
            control={<Radio />}
            label="Male"
            onChange={onChange}
          /> */}
          {/* <FormControlLabel value="other" control={<Radio />} label="Other" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel
            value="neither"
            control={<Radio />}
            label="Neither"
          /> */}
        </RadioGroup>
      </FormControl>
      {/* <FormControl component="fieldset" className={classes.formControl} /> */}
    </div>
  );
};

SelectButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectButtons);

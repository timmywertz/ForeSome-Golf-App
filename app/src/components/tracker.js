import React from "react";

import { withStyles } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = {
  root: {
    maxWidth: 400,
    flexGrow: 1
  }
};

class Tracker extends React.Component {
  state = {
    activeStep: 0
  };

  // const Tracker = props => {
  //   const { handleNext, handleBack, classes, theme } = props
  // }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <MobileStepper
        variant="progress"
        steps={4}
        position="static"
        activeStep={this.state.activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={this.handleNext}
            disabled={this.state.activeStep === 3}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={this.handleBack}
            disabled={this.state.activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(Tracker);

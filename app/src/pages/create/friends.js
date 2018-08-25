import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import IconTabs from "../../components/tabs";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Wc } from "@material-ui/icons";
import { cyan } from "@material-ui/core/colors";

import {
  HumanMale,
  HumanFemale,
  AccountMultiplePlus,
  AccountPlus,
  AccountGroup
} from "mdi-material-ui";
import {
  GROUP_SIZE_SELECTED,
  GENDER_SELECTED,
  HANDICAP_RANGE_SELECTED
} from "../../constants";

const styles = theme => ({
  buttons: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    padding: 20,
    marginBottom: 40
  }
});

const Friends = props => {
  const {
    handleSizeChanged,
    groupSize,
    handleGenderChanged,
    gender,
    handleHcpRangeChanged,
    hcpRange,
    classes
  } = props;

  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 20, marginBottom: 20, color: cyan[500] }}
          variant="display2"
        >
          YOUR GROUP:
        </Typography>
        <IconTabs title="SIZE" onChange={handleSizeChanged} value={groupSize}>
          <Tab value={2} icon={<AccountPlus />} label="Twosome" />
          <Tab value={3} icon={<AccountMultiplePlus />} label="Threesome" />
          <Tab value={4} icon={<AccountGroup />} label="ForeSome!" />
        </IconTabs>
        <IconTabs title="GENDER" onChange={handleGenderChanged} value={gender}>
          <Tab value={"Male"} icon={<HumanMale />} label="Male" />
          <Tab value={"Female"} icon={<HumanFemale />} label="Female" />
          <Tab value={"Both"} icon={<Wc />} label="Both" />
        </IconTabs>

        <IconTabs
          style={{ width: 500 }}
          title="HANDICAP RANGE"
          onChange={handleHcpRangeChanged}
          value={hcpRange}
        >
          <Tab
            style={{ width: 100 }}
            value={"10 and Lower"}
            label="10 and Lower"
          />
          <Tab style={{ width: "20%" }} value={"5 - 15"} label="5 - 15" />
          <Tab style={{ width: "20%" }} value={"10 - 20"} label="10 - 20" />
          <Tab style={{ width: "20%" }} value={"15 - 25"} label="15 - 25" />
          <Tab style={{ width: "20%" }} value={"25+"} label="25+" />
          <Tab
            style={{ width: "20%" }}
            value={"Any Ability"}
            label="Any Ability"
          />
        </IconTabs>
        <Button
          className={classes.buttons}
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/teetime/new/date"
          variant="contained"
          size="large"
          color="secondary"
        >
          Go Back
        </Button>
        <Button
          className={classes.buttons}
          component={Link}
          style={{ marginTop: 30, padding: 20 }}
          to="/teetime/new/final"
          variant="contained"
          size="large"
          color="primary"
        >
          NEXT
        </Button>
      </center>
    </div>
  );
};

const mapStateToProps = state => ({
  courses: state.courses,
  currentCourse: state.courses.currentCourse,
  groupSize: state.courses.groupSize,
  gender: state.courses.gender,
  hcpRange: state.courses.hcpRange
});

const mapActionsToProps = dispatch => {
  return {
    handleSizeChanged: (e, size) => {
      dispatch({ type: GROUP_SIZE_SELECTED, payload: size });
    },
    handleGenderChanged: (e, gender) => {
      dispatch({
        type: GENDER_SELECTED,
        payload: gender
      });
    },
    handleHcpRangeChanged: (e, hcpRange) => {
      dispatch({
        type: HANDICAP_RANGE_SELECTED,
        payload: hcpRange
      });
    }
  };
};

const connector = connect(
  mapStateToProps,
  mapActionsToProps
);
export default connector(withStyles(styles)(Friends));

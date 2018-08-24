import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { Link } from "react-router-dom";
import IconTabs from "../../components/tabs";
import { connect } from "react-redux";
import {
  ExposurePlus1TwoTone,
  ExposurePlus2TwoTone,
  Wc
} from "@material-ui/icons";
import {
  GROUP_SIZE_SELECTED,
  GENDER_SELECTED,
  HANDICAP_RANGE_SELECTED
} from "../../constants";
import { Paper, Tabs } from "@material-ui/core";

const Friends = props => {
  const {
    handleSizeChanged,
    groupSize,
    handleGenderChanged,
    gender,
    handleHcpRangeChanged,
    hcpRange
  } = props;

  return (
    <div>
      <center>
        <Typography
          style={{ marginTop: 20, marginBottom: 20 }}
          variant="display2"
        >
          Select Your Group's:
        </Typography>
        <IconTabs title="Size" onChange={handleSizeChanged} value={groupSize}>
          <Tab value={2} icon={<ExposurePlus1TwoTone />} label="Twosome" />
          <Tab value={3} icon={<ExposurePlus2TwoTone />} label="Threesome" />
          <Tab value={4} icon={<PersonPinIcon />} label="ForeSome!" />
        </IconTabs>
        <IconTabs title="Gender" onChange={handleGenderChanged} value={gender}>
          <Tab value={"Male"} icon={<PhoneIcon />} label="Male" />
          <Tab value={"Female"} icon={<FavoriteIcon />} label="Female" />
          <Tab value={"Both"} icon={<Wc />} label="Both" />
        </IconTabs>

        <IconTabs
          style={{ width: 500 }}
          title="Handicap Range"
          onChange={handleHcpRangeChanged}
          value={hcpRange}
        >
          <Tab value={"10 and Lower"} label="10 and Lower" />
          <Tab value={"5 - 15"} label="5 - 15" />
          <Tab value={"10 - 20"} label="10 - 20" />
          <Tab value={"15 - 25"} label="15 - 25" />
          <Tab value={"25+"} label="25+" />
          <Tab value={"Any Ability"} label="Any Ability" />
        </IconTabs>
        <Button
          style={{ marginRight: 20, marginTop: 30, padding: 20 }}
          component={Link}
          to="/teetime/new/date"
          variant="contained"
          size="large"
          color="primary"
        >
          Go Back
        </Button>
        <Button
          component={Link}
          style={{ marginTop: 30, padding: 20 }}
          to="/teetime/new/final"
          variant="contained"
          size="large"
          color="secondary"
        >
          NEXT
        </Button>
      </center>
    </div>
  );
};
//console.log("state", state);
const mapStateToProps = state => ({
  courses: state.courses,
  currentCourse: state.courses.currentCourse,
  groupSize: state.courses.groupSize,
  gender: state.courses.gender,
  hcpRange: state.courses.hcpRange
  // currentGroupSize: state.courses.currentCourse.groupSize,
  // currentGenderPreferences: state.courses.currentCourse.gender,
  // currentHcpRange: state.courses.currentCourse.hcpRange
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
export default connector(Friends);

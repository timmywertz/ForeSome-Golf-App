import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import {
  ExposurePlus1TwoTone,
  ExposurePlus2TwoTone,
  Wc
} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

export default class IconTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <Typography
          style={{ marginTop: 20, marginBottom: 0 }}
          variant="subheading"
        >
          Size
        </Typography>
        <div>
          <Paper style={{ marginTop: 15, width: 300 }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab icon={<ExposurePlus1TwoTone />} label="One" />
              <Tab icon={<ExposurePlus2TwoTone />} label="Two" />
              <Tab icon={<PersonPinIcon />} label="Three" />
            </Tabs>
          </Paper>
        </div>
        <Typography
          style={{ marginTop: 20, marginBottom: 0 }}
          variant="subheading"
        >
          Gender
        </Typography>
        <div>
          <Paper style={{ marginTop: 15, width: 300 }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab icon={<PhoneIcon />} label="Male" />
              <Tab icon={<FavoriteIcon />} label="Female" />
              <Tab icon={<Wc />} label="Both" />
            </Tabs>
          </Paper>
        </div>
        <Typography
          style={{ marginTop: 20, marginBottom: 0 }}
          variant="subheading"
        >
          Handicap Range
        </Typography>
        <div>
          <Paper style={{ marginTop: 15, marginBottom: 50, width: 400 }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="10 and Lower" />
              <Tab label="5 - 15" />
              <Tab label="10 - 20" />
              <Tab label="15 - 25" />
              <Tab label="25 and Above" />
              <Tab label="Any Ability" />
            </Tabs>
          </Paper>
        </div>
      </div>
    );
  }
}

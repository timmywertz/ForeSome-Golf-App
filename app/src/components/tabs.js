import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const IconTabs = props => {
  const { onChange, title, children, value, classes } = props;
  return (
    <div className={classes.root}>
      <Typography
        style={{ marginTop: 20, marginBottom: 0 }}
        variant="subheading"
      >
        {title}
      </Typography>
      <div>
        <Paper style={{ marginTop: 15, width: 300 }}>
          <Tabs
            value={value}
            onChange={onChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary"
          >
            {children}
          </Tabs>
        </Paper>
      </div>
    </div>
  );
};

export default withStyles(styles)(IconTabs);

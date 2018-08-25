import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core";
import { cyan, grey } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    fontColor: grey[700]
    //backgroundColor: theme.palette.background.paper
  }
});

const IconTabs = props => {
  const { onChange, title, children, value, classes } = props;
  return (
    <div className={classes.root}>
      <Typography style={{ marginTop: 20, marginBottom: 0 }} variant="title">
        {title}
      </Typography>
      <div>
        <Paper
          style={{
            backgroundColor: cyan[500],
            marginTop: 15,
            width: 300,
            height: 80
          }}
        >
          {/* //style={{ marginTop: 15, width: 300 }}> */}
          <Tabs
            labelIcon="grey[700]"
            value={value}
            onChange={onChange}
            fullWidth
            indicatorColor="secondary"
            textColor="grey[500]"
          >
            {children}
          </Tabs>
        </Paper>
      </div>
    </div>
  );
};

export default withStyles(styles)(IconTabs);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { deepPurple, amber, green, teal, cyan } from "@material-ui/core/colors";

import store from "./store";
import { Provider } from "react-redux";
import { getCourses } from "./action-creators/courses";
import { createNewGolfer } from "./action-creators/golfers";
import { getTeeTimes } from "./action-creators/teetimes";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: green[700] },
    secondary: { main: green[300] }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App dispatch={store.dispatch} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
store.dispatch(getCourses);
store.dispatch(createNewGolfer);
store.dispatch(getTeeTimes);

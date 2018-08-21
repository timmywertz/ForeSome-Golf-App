import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import store from "./store";
import { Provider } from "react-redux";
import { getCourses } from "./action-creators/courses";
import { createNewGolfer } from "./action-creators/golfers";

ReactDOM.render(
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
store.dispatch(getCourses);
store.dispatch(createNewGolfer);

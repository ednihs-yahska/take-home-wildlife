import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Home from './screens/home'

ReactDOM.render(<Home />, document.getElementById("app"));

module.hot.accept();

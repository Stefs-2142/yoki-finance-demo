"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
var App_1 = require("./App");
var safe_apps_react_sdk_1 = require("@safe-global/safe-apps-react-sdk");
client_1["default"].createRoot(document.getElementById('root')).render(<react_1["default"].StrictMode>
    <safe_apps_react_sdk_1["default"]>
      <App_1["default"] />
    </safe_apps_react_sdk_1["default"]>
  </react_1["default"].StrictMode>);

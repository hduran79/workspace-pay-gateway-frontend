import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-credit-cards/es/styles-compiled.css";
import axios from "axios";
import { getParamUrl } from "pay-gateway-utility";
import request from "./interceptors/Http-request-interceptor";
import response from "./interceptors/Http-response-interceptor";
import App from "./App";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_COSTA_RICA_BANK_API;

// get initial query params
const params = getParamUrl(document.location.href);

const EXECUTIVE_JWT_ENDPOINT =
  process.env.REACT_APP_INSURANCE_EXECUTIVE_JWT_ENDPOINT;

const headers = {};

const supplanted = typeof userSessionData !== "undefined" || params.supplanted;
// get the JWT token

params.company = "100";
params.dni = "106440160";

if (params.company && params.dni) {
  headers["X-Company"] = params.company;
  headers["X-DNI"] = params.dni;
}

const endpoint = supplanted
  ? `${EXECUTIVE_JWT_ENDPOINT}?suplantadoPor=${supplanted}`
  : EXECUTIVE_JWT_ENDPOINT;

axios.interceptors.response.use((resp) => resp, response());

axios
  .post(endpoint, null, { headers })
  .then(({ data: { token: jwt } }) => {
    const interceptor = request(jwt);
    axios.interceptors.request.use((r) => interceptor(r));
  })
  .finally(() => {
    // Init the APP
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });

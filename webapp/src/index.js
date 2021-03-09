import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

ReactDOM.render(<App />, document.getElementById("root"));

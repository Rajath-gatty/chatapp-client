import React from "react";
import ReactDOM from "react-dom";
import Context from "./Context/Context";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "https://chatapp-backend-kd8k.onrender.com";
// axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.render(
    <React.StrictMode>
        <Context>
                <App />
        </Context>
    </React.StrictMode>,
    document.getElementById("root")
);

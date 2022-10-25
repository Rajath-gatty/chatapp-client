import {io} from "socket.io-client";
import axios from "axios";

export const socket = io(axios.defaults.baseURL);
import React,{useLayoutEffect} from "react";
import { Route, BrowserRouter, Switch  } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import { useGlobalContext } from "./Context/Context";

function App() {
const {setAuthenticated,token,darkMode,setThemeMode} = useGlobalContext();

useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        setAuthenticated(user.user,user.token);
    }
    const mode = JSON.parse(localStorage.getItem("darkMode"));
    if(mode) {
        setThemeMode(true);
    } else {
        localStorage.setItem("darkMode",JSON.stringify(false));
    }
},[])

axios.defaults.headers.common["Authorization"] = token;

    return (
        <div className="App" 
        style={{background: darkMode ? "var(--dark-conv-color)" : "var(--grey-color)"}}>
            <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
                </BrowserRouter>
        </div>
    );
}

export default App;

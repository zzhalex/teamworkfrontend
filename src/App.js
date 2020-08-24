import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import axios from "axios";

export default function App() {
  const [isLogin, setIslogin] = useState(false);
  useEffect(() => {
    let access_token = localStorage.getItem("token");
    console.log("local storage");
    console.log(access_token);
    if (access_token != null) {
      axios
        .get("checkToken", {
          headers: {
            Authorization: access_token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setIslogin(true);
        })
        .catch((err) => {
          setIslogin(false);
        });
    } else {
      setIslogin(false);
    }
  }, []);

  const exit = () => {
    localStorage.removeItem("token");
    setIslogin(false);
    // setRedirect(true);
  };

  const loginStateUpdate = (data) => {
    setIslogin(data);
  };

  let navLi;
  if (!isLogin) {
    navLi = (
      <ul>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    );
  } else {
    navLi = (
      <ul>
        <li>
          <Link to="/">
            {" "}
            <img
              className="h-8 w-8 rounded-full mx-auto"
              src={process.env.PUBLIC_URL + "/dashboard.png"}
            />
          </Link>
        </li>
        <li>
          <Link to="/users">
            <img
              className="h-8 w-8 rounded-full mx-auto"
              src={process.env.PUBLIC_URL + "/account.png"}
            />
          </Link>
        </li>
        <li>
          <Link to="/signin">
            <img
              className="h-8 w-8 rounded-full mx-auto"
              src={process.env.PUBLIC_URL + "/logout.png"}
              onClick={exit}
            />
          </Link>
        </li>
      </ul>
    );
  }

  // if (redirect) {
  //   return <Redirect to="/signin" />;
  // } else {
  return (
    <Router>
      <div className="AppContainer">
        <nav>{navLi}</nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/signin">
            <Signin loginStateUpdate={loginStateUpdate} />
          </Route>
          <Route path="/signup">
            <Signup loginState={isLogin} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home loginState={isLogin} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// }

function Home(props) {
  return (
    <React.Fragment>
      <Dashboard loginState={props.loginState} />
    </React.Fragment>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return (
    <React.Fragment>
      <User />
    </React.Fragment>
  );
}

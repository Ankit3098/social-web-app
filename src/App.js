import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, HashRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";
// components
import NavBar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";
import chat from "./pages/joinChat";
import Messanger from "./pages/messanger";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  console.log(new Date(decodedToken.exp) < Date.now());
  if (decodedToken.exp < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
axios.defaults.baseURL =
  "https://us-central1-e-office-fb4f4.cloudfunctions.net/api";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  invisibleSeprator: {
    border: "none",
    borderBottom: 4
  },
  visibleSeprator: {
    border: "1px solid rgba(0,0,0,0.1)",
    width: "100%",
    marginBottom: 20
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <HashRouter>
              <NavBar />
              <div className="container">
                <Switch>
                  <AuthRoute excat path="/sign-up" component={signup} />
                  <AuthRoute excat path="/login" component={login} />
                  <Route exact path="/user/:handle" component={user} />
                  <Route
                    exact
                    path="/user/:handle/scream/:screamId"
                    component={user}
                  />
                  <Route exact path="/join-chat" component={chat} />
                  <Route path="/messanger" component={Messanger} />
                  <Route excat path="/" component={home} />
                </Switch>
              </div>
            </HashRouter>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

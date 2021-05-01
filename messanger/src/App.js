import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

// Routes
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import AddFriends from "./pages/Friends/AddFriends/AddFriends";
import Profile from "./pages/User/Profile/Profile";
import Configurations from "./pages/UserConfigurations/Configurations";

// Context
import UserDataProvider from "./store/userDataProvider";
import MessagesProvider from "./store/messagesProvider";
import FriendProvider from "./store/friendProvider";
import { SocketProvider } from "./store/socketProvider";
import { CookiesProvider, withCookies } from "react-cookie";

// HOCs
import CheckUserLogged from "./HOCs/checkUserLogged";

const App = () => {
  return (
    <StylesProvider injectFirst>
      <CheckUserLogged>
        <CookiesProvider>
          <SocketProvider>
            <UserDataProvider>
                <MessagesProvider>
                  <FriendProvider>
                      <Router>
                        <Switch>
                          <Route
                            path="/"
                            exact
                            render={(props) => <Home title="Home" />}
                          />
                          <Route
                            path="/login"
                            render={(props) => <Login title="Login" />}
                          />
                          <Route
                            path="/register"
                            render={(props) => <Register title="Register" />}
                          />
                          <Route
                            path="/chat"
                            render={(props) => <Chat title="Chat" />}
                          />
                          <Route
                            path="/friends/add"
                            render={(props) => (
                              <AddFriends title="Add friends" />
                            )}
                          />
                          <Route
                            path="/profile"
                            render={(props) => <Profile title="Profile" />}
                          />
                          <Route
                            path="/config"
                            render={(props) => (
                              <Configurations title="Configurations" />
                            )}
                          />
                        </Switch>
                      </Router>
                  </FriendProvider>
                </MessagesProvider>
            </UserDataProvider>
          </SocketProvider>
        </CookiesProvider>
      </CheckUserLogged>
    </StylesProvider>
  );
};

export default withCookies(App);

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
import Configurations from "./pages/User/UserConfigurations/Configurations";
import PageNotFound from "./pages/PageNotFound/PageNotFound"

// Context
import UserDataProvider from "./store/userDataProvider";
import MessagesProvider from "./store/messagesProvider";
import FriendProvider from "./store/friendProvider";
import ContactsProvider from "./store/contactsProvider";
import { SocketProvider } from "./store/socketProvider";

// HOCs
import CheckUserLogged from "./HOCs/checkUserLogged";
import FriendInfo from "./pages/Friends/FriendInfo/FriendInfo";

const App = () => {
  return (
    <StylesProvider injectFirst>
      <CheckUserLogged>
          <SocketProvider>
            <UserDataProvider>
              <MessagesProvider>
                <ContactsProvider>
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
                          render={(props) => <AddFriends title="Add friends" />}
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
                        <Route
                          path="/:name/:id/info"
                          render={(props) => (
                            <FriendInfo title="Friend Info" />
                          )}
                        />
                        <Route render={(props) => (
                          <PageNotFound title="Not Found" />
                        )} />
                      </Switch>
                    </Router>
                  </FriendProvider>
                </ContactsProvider>
              </MessagesProvider>
            </UserDataProvider>
          </SocketProvider>
      </CheckUserLogged>
    </StylesProvider>
  );
};

export default App;

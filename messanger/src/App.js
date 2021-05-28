import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

// Routes
import { Home } from "./pages/index";
import { Login } from "./pages/index";
import { Register } from "./pages/index";
import { AddFriends } from "./pages/index";
import { Profile } from "./pages/index";
import { UserConfig } from "./pages/index";
import { PageNotFound } from "./pages/index";
import { FriendInfo } from "./pages/index";
import { Chat } from "./pages/index";

// Wrappers
import AppContextsWrapper from "./AppContextsWrapper";

// HOCs
import { CheckUserLogged } from './HOCs/index'
import { GetFriendRealTimeInfo } from './HOCs/index'
// import { GetUserData } from './HOCs/index'

const App = () => {
  return (
    <StylesProvider injectFirst>
      <CheckUserLogged>
        <AppContextsWrapper>
          <Router>
            <Switch>
              <Route path="/" exact render={(props) => <Home title="Home" />} />
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
                render={(props) => (
                  <GetFriendRealTimeInfo>
                    <Chat title="Chat" />
                  </GetFriendRealTimeInfo>
                )}
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
                render={(props) => <UserConfig title="Configurations" />}
              />
              <Route
                path="/:name/:id/info"
                render={(props) => <FriendInfo title="Friend Info" />}
              />
              <Route
                path="*"
                exact
                render={(props) => <PageNotFound title="Not Found" />}
              />
            </Switch>
          </Router>
        </AppContextsWrapper>
      </CheckUserLogged>
    </StylesProvider>
  );
};

export default App;

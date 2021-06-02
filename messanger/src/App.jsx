import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { StylesProvider } from "@material-ui/core/styles";

// Routes
import {
  Home,
  Login,
  Register,
  AddFriends,
  Profile,
  UserConfig,
  PageNotFound,
  FriendInfo,
  Chat,
} from "./pages/index";

// Wrappers
import AppContextsWrapper from "./AppContextsWrapper";

// HOCs
import { CheckUserLogged, GetFriendRealTimeInfo } from "./HOCs/index";
// import { GetUserData } from './HOCs/index'

const App = () => (
  <StylesProvider injectFirst>
    <CheckUserLogged>
      <AppContextsWrapper>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Home title="Home" />} />
            <Route path="/login" render={() => <Login title="Login" />} />
            <Route
              path="/register"
              render={() => <Register title="Register" />}
            />
            <Route
              path="/chat"
              render={() => (
                <GetFriendRealTimeInfo>
                  <Chat title="Chat" />
                </GetFriendRealTimeInfo>
              )}
            />
            <Route
              path="/friends/add"
              render={() => <AddFriends title="Add friends" />}
            />
            <Route path="/profile" render={() => <Profile title="Profile" />} />
            <Route
              path="/config"
              render={() => <UserConfig title="Configurations" />}
            />
            <Route
              path="/:name/:id/info"
              render={() => <FriendInfo title="Friend Info" />}
            />
            <Route
              path="*"
              exact
              render={() => <PageNotFound title="Not Found" />}
            />
          </Switch>
        </Router>
      </AppContextsWrapper>
    </CheckUserLogged>
  </StylesProvider>
);

export default App;

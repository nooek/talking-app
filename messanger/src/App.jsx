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
import AppHOCsWrapper from "./AppHOCsWrapper";

// Routes HOCs
import { GetFriendRealTimeInfo } from "./HOCs/index";

const App = () => (
  <StylesProvider injectFirst>
    <AppContextsWrapper>
      <Router>
        <AppHOCsWrapper>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <GetFriendRealTimeInfo>
                  <Chat title="Chat" />
                </GetFriendRealTimeInfo>
              )}
            />
            <Route path="/home" exact render={() => <Home title="Home" />} />
            <Route path="/login" exact render={() => <Login title="Login" />} />
            <Route path="/register" exact render={() => <Register title="Register" />} />
            <Route path="/friends/add" exact render={() => <AddFriends title="Add friends" />} />
            <Route path="/profile" render={() => <Profile title="Profile" />} />
            <Route path="/config" exact render={() => <UserConfig title="Configurations" />} />
            <Route exact path="/:name/:id/info" render={() => <FriendInfo title="Friend Info" />} />
            <Route path="*" exact render={() => <PageNotFound title="Not Found" />} />
          </Switch>
        </AppHOCsWrapper>
      </Router>
    </AppContextsWrapper>
  </StylesProvider>
);

export default App;

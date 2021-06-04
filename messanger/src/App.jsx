import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withCookies, CookiesProvider } from "react-cookie";
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
    <CookiesProvider>
      <AppContextsWrapper>
        <Router>
          <AppHOCsWrapper>
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
          </AppHOCsWrapper>
        </Router>
      </AppContextsWrapper>
    </CookiesProvider>
  </StylesProvider>
);

export default withCookies(App);

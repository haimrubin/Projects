import React, { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {AuthContext} from "./shared/context/auth-context";
import {useAuth} from "./shared/hooks/auth-hook";
import AllPosts from "./posts/pages/AllPosts";
import Profile from "./users/pages/Profile";
import UserPosts from "./posts/pages/UserPosts";
import NewPost from "./posts/pages/NewPost";
import UpdatePost from "./posts/pages/UpdatePost";
import UpdateUser from "./users/pages/UpdateUser";
import NewAdminPost from "./posts/pages/NewAdminPost";
import UpdateAdminPost from "./posts/pages/UpdateAdminPost";
import Auth from "./users/pages/Auth";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Users from "./users/pages/Users";
import Review from "./users/pages/Review";
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import Stats from "./posts/pages/Stats";

const App = () => {
  const { token, login, logout, userId, isAdmin } = useAuth();

  let routes;

  if (token && !isAdmin) {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <AllPosts />
        </Route>

        <Route path="/users/:userId">
          <Profile />
        </Route>

        <Route path="/:userId/posts">
          <UserPosts />
        </Route>

        <Route path="/posts/new" exact={true}>
          <NewPost />
        </Route>

        <Route path="/posts/:postId" exact={true}>
          <UpdatePost />
        </Route>

        <Route path="/update/:userId">
          <UpdateUser />
        </Route>

        <Route path="/review" exact={true}>
          <Review />
        </Route>

          <Route path="/stats" exact={true}>
              <Stats />
          </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else if (token && isAdmin) {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <AllPosts />
        </Route>

        <Route path="/users" exact={true}>
            <Users/>
        </Route>

        <Route path="/users/:userId">
          <Profile />
        </Route>

        <Route path="/:userId/posts">
          <UserPosts />
        </Route>

        <Route path="/posts/new" exact={true}>
          <NewAdminPost />
        </Route>

        <Route path="/posts/:postId" exact={true}>
          <UpdateAdminPost />
        </Route>

        <Route path="/review" exact={true}>
          <Review />
        </Route>

          <Route path="/stats" exact={true}>
              <Stats />
          </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <AllPosts />
        </Route>

        <Route path="/:userId/posts">
            <UserPosts />
        </Route>

        <Route path="/auth" exact={true}>
          <Auth />
        </Route>

        <Route path="/review" exact={true}>
          <Review />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }
    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '2cfd91ccaa7cba171f67648224f8fd26',
        lat: '31.0461',
        lon: '34.8516',
        lang: 'en',
        unit: 'metric', // values are (metric, standard, imperial)
    });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId,
        isAdmin,
        login,
        logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      <footer className={'weather'}>
          <ReactWeather
              isLoading={isLoading}
              errorMessage={errorMessage}
              data={data}
              lang="en"
              locationLabel="Israel"
              unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
              showForecast
          />
      </footer>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

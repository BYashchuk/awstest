/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import HomePage from "../pages/home/HomePage";
import ErrorsPage from "../pages/errors/ErrorsPage";
import LogoutPage from "../pages/auth/Logout";
import { LayoutContextProvider } from "../../_metronic";
import Layout from "../../_metronic/layout/Layout";
import * as routerHelpers from "../router/RouterHelpers";
import AuthPage from "../pages/auth/AuthPage";
import { Auth } from 'aws-amplify';
import store from '../store/store';
import { actionTypes } from '../store/ducks/auth.duck';

export const Routes = withRouter(({ history }) => {
  const [isAuthoriz, setAuthorized] = useState(false)
  const lastLocation = useLastLocation();
  routerHelpers.saveLastLocation(lastLocation);
  const { isAuthorized, menuConfig, userLastLocation } = useSelector(
    ({ auth, urls, builder: { menuConfig } }) => ({
      menuConfig,
      isAuthorized: auth.user != null,
      userLastLocation: routerHelpers.getLastLocation()
    }),
    shallowEqual
  );

  // console.log('================isAuthorized, menuConfig, userLastLocation====================');
  // console.log(isAuthorized,'-', menuConfig,'-', userLastLocation);
  // console.log('==============isAuthorized, menuConfig, userLastLocation======================');


  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setAuthorized(true)
        console.log('==============currentAuthenticatedUser======================');
        console.log(user);
        console.log('==============currentAuthenticatedUser======================');
        store.dispatch({ type: actionTypes.UserLoaded, payload: user.attributes })
      })
      .catch(err => {
        setAuthorized(false)
        console.log('111111', err)
      });
  }, [])

  return (
    /* Create `LayoutContext` from current `history` and `menuConfig`. */
    <LayoutContextProvider history={history} menuConfig={menuConfig}>
      <Switch>
        {!isAuthoriz ? (
          /* Render auth page when user at `/auth` and not authorized. */
          <AuthPage />
        ) : (
            /* Otherwise redirect to root page (`/`) */
            <Redirect from="/auth" to={userLastLocation} />
          )}

        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={LogoutPage} />

        {!isAuthoriz ? (
          /* Redirect to `/auth` when user is not authorized */
          <Redirect to="/auth/login" />
        ) : (
            <Layout>
              <HomePage userLastLocation={userLastLocation} />
            </Layout>
          )}
      </Switch>
    </LayoutContextProvider>
  );
});

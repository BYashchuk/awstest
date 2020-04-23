import React, { Component, useEffect } from "react";
import * as auth from "../../store/ducks/auth.duck";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { LayoutSplashScreen } from "../../../_metronic";


import { Auth } from 'aws-amplify';


function Logout(props) {
  let history = useHistory();

  useEffect(() => {
    props.logout();
    async function signOut() {
      try {
        await Auth.signOut();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log('error signing out: ', error);
      }
    }
    signOut()
  }, [])




  const { hasAuthToken } = props;

  return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth" />;

}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);

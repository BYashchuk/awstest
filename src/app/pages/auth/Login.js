import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik } from "formik";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { TextField } from "@material-ui/core";
import clsx from "clsx";
import * as auth from "../../store/ducks/auth.duck";
import { login } from "../../crud/auth.crud";

import { Auth } from 'aws-amplify';



function Login(props) {
  const { intl } = props;

  //   useEffect(()=>{
  //     Auth.signOut();
  // },[])


  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [loadingButtonStyle, setLoadingButtonStyle] = useState({
    paddingRight: "2.5rem"
  });

  const enableLoading = () => {
    setLoading(true);
    setLoadingButtonStyle({ paddingRight: "3.5rem" });
  };

  const disableLoading = () => {
    setLoading(false);
    setLoadingButtonStyle({ paddingRight: "2.5rem" });
  };

  async function SignIn({ username, password }) {
    try {
      const user = await Auth.signIn(username, password);
      console.log('=============signIn=======================');
      console.log(user);
      console.log('============signIn========================');
      disableLoading();
      props.login('access-token-8f3ae836da744329a6f93bf20594b5cc');
      setTimeout(() => {
      history.push("/compareCapacity")
      window.location.reload();
      }, 1000);
      // props.register(user.signInUserSession.accessToken.jwtToken);
      // props.login(user.signInUserSession.accessToken.jwtToken);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  return (
    <>

      <div className="kt-login__body">
        <div className="kt-login__form">
          <div className="kt-login__title">
            <h3>
              {/* https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage */}
              <img src='../../assets/group.png' alt='qwerty' style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: "center",
                marginLeft: '23%',
                marginBottom: 25
              }} />
              <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
          </div>

          <Formik
            initialValues={{
              // email: "admin@demo.com",
              // password: "demo"

              // email: "bohdany@tallium.com",
              // password: "bohdany@tallium.com"

              email: "diesel.cnw@gmail.com",
              password: "diesel.cnw@gmail.com"
              
            }}
            validate={values => {
              const errors = {};

              if (!values.email) {
                // https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = intl.formatMessage({
                  id: "AUTH.VALIDATION.INVALID_FIELD"
                });
              }

              if (!values.password) {
                errors.password = intl.formatMessage({
                  id: "AUTH.VALIDATION.REQUIRED_FIELD"
                });
              }

              return errors;
            }}
            onSubmit={(values, { setStatus, setSubmitting }) => {



              SignIn({ username: values.email, password: values.password })


              // enableLoading();
              // setTimeout(() => {
              //   login(values.email, values.password)
              //     .then(({ data: { accessToken } }) => {
              //       disableLoading();
              //       props.login(accessToken);
              //     })
              //     .catch(() => {
              //       disableLoading();
              //       setSubmitting(false);
              //       setStatus(
              //         intl.formatMessage({
              //           id: "AUTH.VALIDATION.INVALID_LOGIN"
              //         })
              //       );
              //     });
              // }, 1000);
            }}
          >
            {({
              values,
              status,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
                <form
                  noValidate={true}
                  autoComplete="off"
                  className="kt-form"
                  onSubmit={handleSubmit}
                >
                  {/* {status ? (
                  <div role="alert" className="alert alert-danger">
                    <div className="alert-text">{status}</div>
                  </div>
                ) :
                 (
                  <div role="alert" className="alert alert-info">
                    <div className="alert-text">
                      Use account <strong>admin@demo.com</strong> and password{" "}
                      <strong>demo</strong> to continue.
                    </div>
                  </div>
                )
                } */}

                  <div className="form-group">
                    <TextField
                      type="email"
                      label="Email"
                      margin="normal"
                      className="kt-width-full"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      helperText={touched.email && errors.email}
                      error={Boolean(touched.email && errors.email)}
                    />
                  </div>

                  <div className="form-group">
                    <TextField
                      type="password"
                      margin="normal"
                      label="Password"
                      className="kt-width-full"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      helperText={touched.password && errors.password}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </div>

                  <div className="kt-login__actions">
                    {/* <Link
                      to="/auth/forgot-password"
                      className="kt-link kt-login__link-forgot"
                    >
                      <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                    </Link> */}
                    {/* <Link
                      to="/auth/registration"
                      className="kt-link kt-login__link-forgot"
                    >
                      <FormattedMessage id="AUTH.GENERAL.SIGNUP_BUTTON" />
                    </Link> */}
                    {/* <Link
                      to="/auth/confirm"
                      className="kt-link kt-login__link-forgot"
                    >
                      <FormattedMessage id="AUTH.GENERAL.CONFIRM" />
                    </Link> */}

                    <button
                      id="kt_login_signin_submit"
                      type="submit"
                      // disabled={isSubmitting}
                      className={`btn btn-primary btn-elevate kt-login__btn-primary ${clsx(
                        {
                          "kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light": loading
                        }
                      )}`}
                      style={loadingButtonStyle}
                    >
                      Sign In
                  </button>
                  </div>
                </form>
              )}
          </Formik>

        </div>
      </div>
    </>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Login)
);

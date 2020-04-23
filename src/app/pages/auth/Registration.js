import React, { useEffect } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";
import { Auth, JS } from 'aws-amplify';


function Registration(props) {
  const { intl } = props;
  let history = useHistory();


async function signUp(values, { setStatus, setSubmitting }) {
    try {
        const user = await Auth.signUp({
            username: values.email,
            password: values.password,
            attributes: {
                email: values.email,          // optional
                name: JSON.stringify({name:values.username, fullname:values.fullname}),
                // fullname: values.fullname,
                // phone_number: values.username,
                // accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
                // refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
                // roles: "[1]", 
                // pic: 'null',
                // occupation: "CEO",
                // companyName: "Keenthemes",
                // phone: "456669067890",
                // phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        // console.log({ user });
        console.log('===============signUp=====================');
        console.log(user);
        console.log('===============signUp=====================');
        history.push("/auth/confirm")
    } catch (error) {
        console.log('error signing up:', error);
    }
}


  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
        </div>

        <Formik
          initialValues={{
            email: "bohdany@tallium.com",
            fullname: "Bohdan",
            username: "Bodya",
            password: "bohdany@tallium.com",
            acceptTerms: true,
            confirmPassword: "bohdany@tallium.com"
          }}
          validate={values => {
            const errors = {};

            if (!values.email) {
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

            if (!values.fullname) {
              errors.fullname = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.username) {
              errors.username = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.password) {
              errors.password = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            if (!values.confirmPassword) {
              errors.confirmPassword = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password didn't match.";
            }

            if (!values.acceptTerms) {
              errors.acceptTerms = "Accept Terms";
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            signUp(values, { setStatus, setSubmitting })
            // register(
            //   values.email,
            //   values.fullname,
            //   values.username,
            //   values.password
            // )
            //   .then(({ data: { accessToken } }) => {
            //     props.register(accessToken);
            //   })
            //   .catch(() => {
            //     setSubmitting(false);
            //     setStatus(
            //       intl.formatMessage({
            //         id: "AUTH.VALIDATION.INVALID_LOGIN"
            //       })
            //     );
            //   });
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
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {status && (
                <div role="alert" className="alert alert-danger">
                  <div className="alert-text">{status}</div>
                </div>
              )}

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Fullname"
                  className="kt-width-full"
                  name="fullname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullname}
                  helperText={touched.fullname && errors.fullname}
                  error={Boolean(touched.fullname && errors.fullname)}
                />
              </div>

              <div className="form-group mb-0">
                <TextField
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

              <div className="form-group mb-0">
                <TextField
                  margin="normal"
                  label="Username"
                  className="kt-width-full"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                />
              </div>

              <div className="form-group mb-0">
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

              <div className="form-group">
                <TextField
                  type="password"
                  margin="normal"
                  label="Confirm Password"
                  className="kt-width-full"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirmPassword}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                />
              </div>

              <div className="form-group mb-0">
                <FormControlLabel
                  label={
                    <>
                      I agree the{" "}
                      <Link
                        to="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Terms & Conditions
                      </Link>
                    </>
                  }
                  control={
                    <Checkbox
                      color="primary"
                      name="acceptTerms"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      checked={values.acceptTerms}
                    />
                  }
                />
              </div>

              <div className="kt-login__actions">
                {/* <Link
                  to="/auth/forgot-password"
                  className="kt-link kt-login__link-forgot"
                >
                  <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                </Link> */}

                <Link to="/auth">
                  <button type="button" className="btn btn-secondary btn-elevate kt-login__btn-secondary">
                    Back
                  </button>
                </Link>

                <button
                  // disabled={isSubmitting || !values.acceptTerms}
                  className="btn btn-primary btn-elevate kt-login__btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default injectIntl(
  connect(
    null,
    auth.actions
  )(Registration)
);

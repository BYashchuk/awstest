import React, { useEffect } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import * as auth from "../../store/ducks/auth.duck";
import { register } from "../../crud/auth.crud";
import { Auth } from 'aws-amplify';


function Confirm(props) {
  const { intl } = props;
  let history = useHistory();


  async function confirmSignUp(username, code) {
    try {
      let confirmSignUpData = await Auth.confirmSignUp(username, code);
      console.log('============confirmSignUp========================');
      console.log(confirmSignUpData);
      console.log('==============confirmSignUp======================');
      // props.register(signInUserSession);
      // props.login(accessToken);
      history.push("/auth/login")
      
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }


  return (
    <div className="kt-login__body">
      <div className="kt-login__form">
        <div className="kt-login__title">
          <h3>
            <FormattedMessage id="AUTH.GENERAL.CONFIRM" />
          </h3>
        </div>

        <Formik
          initialValues={{
            email: "",
            code: "",
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

            if (!values.code) {
              errors.code = intl.formatMessage({
                id: "AUTH.VALIDATION.REQUIRED_FIELD"
              });
            }

            return errors;
          }}
          onSubmit={(values, { setStatus, setSubmitting }) => {
            confirmSignUp(values.email, values.code)
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
                    label="Code"
                    className="kt-width-full"
                    name="code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.code}
                    helperText={touched.code && errors.code}
                    error={Boolean(touched.code && errors.code)}
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
  )(Confirm)
);

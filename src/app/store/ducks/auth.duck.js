import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "../../crud/auth.crud";
import * as routerHelpers from "../../router/RouterHelpers";
import { toAbsoluteUrl } from '../../../_metronic/utils/utils';

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: {
    id: 1,
    username: "admin",
    password: "demo",
    email: "admin@demo.com",
    accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
    refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
    roles: [1], // Administrator
    pic: toAbsoluteUrl("/media/users/300_25.jpg"),
    fullname: "Ahmad Nabeel",
    occupation: "CEO",
    companyName: "Keenthemes",
    phone: "456669067890",
    address: {
      addressLine: "L-12-20 Vertex, Cybersquare",
      city: "San Francisco",
      state: "California",
      postCode: "45000"
    },
    socialNetworks: {
      linkedIn: "https://linkedin.com/admin",
      facebook: "https://facebook.com/admin",
      twitter: "https://twitter.com/admin",
      instagram: "https://instagram.com/admin"
    }
  },
  authToken: undefined
};

export const reducer = persistReducer(
  { storage, key: "demo1-auth", whitelist: ["user", "authToken"] },
  (state = initialAuthState, action) => {
    const users = {
      id: 1,
      username: "admin",
      password: "demo",
      email: "admin@demo.com",
      accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
      refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
      roles: [1], // Administrator
      pic: toAbsoluteUrl("/media/users/300_25.jpg"),
      fullname: "Ahmad Nabeel",
      occupation: "CEO",
      companyName: "Keenthemes",
      phone: "456669067890",
      address: {
        addressLine: "L-12-20 Vertex, Cybersquare",
        city: "San Francisco",
        state: "California",
        postCode: "45000"
      },
      socialNetworks: {
        linkedIn: "https://linkedin.com/admin",
        facebook: "https://facebook.com/admin",
        twitter: "https://twitter.com/admin",
        instagram: "https://instagram.com/admin"
      }
    }
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: users };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: users };
      }

      case actionTypes.Logout: {
        routerHelpers.forgotLastLocation();
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {

        const userData = action.payload;
        let { name, fullname } = JSON.parse(userData.name)
        let usera = {
          id: 1,
          username: name,
          password: "demo",
          email: userData.email,
          accessToken: "access-token-8f3ae836da744329a6f93bf20594b5cc",
          refreshToken: "access-token-f8c137a2c98743f48b643e71161d90aa",
          roles: [1], // Administrator
          pic: toAbsoluteUrl("/media/users/300_25.jpg"),
          fullname: fullname,
          occupation: "CEO",
          companyName: "Tallium",
          phone: "456669067890",
          address: {
            addressLine: "L-12-20 Vertex, Cybersquare",
            city: "San Francisco",
            state: "California",
            postCode: "45000"
          },
          socialNetworks: {
            linkedIn: "https://linkedin.com",
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            instagram: "https://instagram.com"
          }
        }

        return { ...state, user:usera };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: authToken => ({ type: actionTypes.Login, payload: { authToken } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });
}

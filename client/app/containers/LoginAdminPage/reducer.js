/*
 *
 * LoginAdminPage reducer
 *
 */
import produce from 'immer';
import * as types from './constants';

export const initialState = {
  email: '',
  password: '',
  errors: {},
  loading: false,
  twoFactor: {},
  helperObj: { showEmailTwoFactor: false, showGoogleTwoFactor: false },
};

/* eslint-disable default-case, no-param-reassign */
const loginAdminPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_VALUE:
        draft[action.payload.name][action.payload.key] = action.payload.value;
        break;
      case types.CLEAR_STORE:
        draft[action.payload.name] = initialState[action.payload.name];
        break;
      case types.SET_STORE_VALUE:
        draft[action.payload.key] = action.payload.value;
        draft.errors[action.payload.key] = '';
        break;
      case types.LOGIN_REQUEST:
        draft.loading = true;
        draft.twoFactor = initialState.twoFactor;
        break;
      case types.LOGIN_SUCCESS:
        draft.loading = false;
        draft.twoFactor = action.payload.data;
        draft.helperObj.showGoogleTwoFactor =
          action.payload &&
          action.payload.data &&
          action.payload.data.multi_fa &&
          action.payload.data.multi_fa.google_authenticate &&
          action.payload.data.multi_fa.google_authenticate.is_authenticate;
        draft.helperObj.showEmailTwoFactor =
          action.payload &&
          action.payload.data &&
          action.payload.data.multi_fa &&
          action.payload.data.multi_fa.email &&
          action.payload.data.multi_fa.email.is_authenticate;
        break;
      case types.LOGIN_FAILURE:
        draft.loading = false;
        draft.errors = { ...action.payload.errors };
        break;
      case types.ADD_TWO_FACTOR_FAILURE:
        draft.errors = { ...action.payload.errors };
        break;
    }
  });

export default loginAdminPageReducer;

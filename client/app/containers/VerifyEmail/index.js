/**
 *
 * VerifyEmail
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as mapDispatchToProps from './actions';
// import { makeSelectDefaultData } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'verifyEmail';

export const VerifyEmail = props => {
  const {
    match: {
      params: { email, code },
    },
  } = props;

  // useEffect(() => {
  //   props.loadVerifyEmailRequest({ email: email, code: code });
  // }, []);
  const handleVerify = () => {
    props.loadVerifyEmailRequest({ email: email, code: code });
  };
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <div>
      <div className="text-blue-500">Click to verify</div>
      <button
        className="py-2 px-6 rounded mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 btn-theme"
        onClick={handleVerify}
      >
        Verify
      </button>
    </div>
  );
};

VerifyEmail.propTypes = {
  // defaultData: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // defaultData: makeSelectDefaultData(),
});

const withConnect = connect(
  mapStateToProps,
  { ...mapDispatchToProps, push },
);
export default compose(
  withConnect,
  memo,
)(VerifyEmail);

import React, {useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {bindActionCreators} from 'redux';

import {IBaseProps} from '../../common/interface';
import {resetError} from './reducer';
interface IErrorBoundary extends IBaseProps {
  error?: any;
  resetError: () => (dispatch: any) => Promise<void>;
}

const ErrorBoundary: React.FC<IErrorBoundary> = (props) => {
  const {children, error, resetError} = props;

  const showAlert = useCallback(() => {
    if (error?.message) {
      setTimeout(() => {
        Alert.alert(
          null,
          error.message,
          [
            {
              text: 'OK',
              onPress: () => {
                resetError();
              },
            },
          ],
          {
            cancelable: false,
          },
        );
      }, 1000);
    }
  }, [error]);
  useEffect(showAlert, [error]);
  return <>{children}</>;
};

const mapStateToProps = (state) => ({
  error: state.error,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetError,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);

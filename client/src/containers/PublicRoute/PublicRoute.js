// PublicRoute
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import { isLogin } from '../utils';

const PublicRoute = ({component: Component, auth: auth, restricted, ...rest}) => {
    // console.log("PublicRoute props", auth);
    // console.log("PublicRoute rest", rest);
    return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      //TODO: проверить реализацию privateroute в https://reacttraining.com/react-router/web/example/auth-workflow На данный момент работает и проверяет через localStorage. Нужно сделать переадресацию, если юзер не вошел, то после входа его перебросило на страницу, откуда он пришел
      <Route
        {...rest}
        render={
            props => (
              // auth.isAuthenticated === true  && restricted
              localStorage.getItem('access_token') && restricted
                ? (<Redirect to="/"/>)
                : (<Component {...props} />)
            )
        }
      />
    );
};

PublicRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.userInfo
    auth: state.Auth
});

export default connect(mapStateToProps)(PublicRoute);
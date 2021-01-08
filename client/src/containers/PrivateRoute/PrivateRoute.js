import React from 'react';
import {Redirect, Route} from "react-router-dom";

/*// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export default function PrivateRoute({component: Component, auth, ...rest}) {
    return (
      <Route {...rest}>
          {
              (props) =>
                auth ? (
                  <Component {...props}/>
                ) : (
                  <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                  />
                )
          }
      </Route>
    );
}*/


import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, auth: auth, ...rest}) => {
    // console.log("PrivateRoute time=%s props", new Date().toISOString(), auth);
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      //TODO: проверить реализацию privateroute в https://reacttraining.com/react-router/web/example/auth-workflow На данный момент работает и проверяет через localStorage. Нужно сделать переадресацию, если юзер не вошел, то после входа его перебросило на страницу, откуда он пришел
      <Route
        {...rest}
        render={
            props => (
              // auth.isAuthenticated === true
                localStorage.getItem('access_token')
                ? (<Component {...props} />)
                : (<Redirect to={{
                      pathname: "/login",
                      state: {from: props.location}
                  }}/>)
            )
        }
      />
    )
};


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    // auth: state.userInfo
    auth: state.Auth
});

export default connect(mapStateToProps)(PrivateRoute);
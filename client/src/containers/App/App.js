import './App.css';
import React, {Component, Fragment} from 'react';
import {PrivateRoute, PublicRoute, Main, LoginForm } from "../index";
import store from "../../store/store";
import {loadUSER} from "../../store/actions/authActions";
import {withRouter} from "react-router-dom";


class App extends Component {

    // при создании компонента вызываем функцию получения token из данных user
    componentDidMount() {
        store.dispatch(loadUSER());
    }

    render() {
        // const {isLoading, isError, orderList} = this.props;
        // const { history } = this.props;
        // console.log("App this.props =", this.props);
        return (
          <Fragment>
              <div className="new">
                  <div className="App">
                      <PublicRoute exact restricted={true} component={LoginForm} path="/login" />
                      <PrivateRoute exact path="/" component={Main}/>
                  </div>
              </div>
          </Fragment>
        )
    }
}
export default withRouter(App);
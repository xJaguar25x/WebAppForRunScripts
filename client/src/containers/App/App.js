import React, {Component} from 'react';
import {PrivateRoute, PublicRoute, Main, AuthForm, Programs, Compilers, Tasks, Results} from "../index";
import store from "../../store/store";
import {loadUSER} from "../../store/actions/authActions";
import {withRouter, Switch} from "react-router-dom";
import LayoutWithMenu from "../../hoc/LayoutWithMenu/LayoutWithMenu";


class App extends Component {

    // при создании компонента вызываем функцию получения token из данных user
    componentDidMount() {
        store.dispatch(loadUSER());
    }

    render() {
        // const {isLoading, isError, orderList} = this.props;
        const { history } = this.props;
        // console.log("App this.props =", this.props);
        return (
          <Switch>

              <PublicRoute exact path="/login" restricted={true} component={AuthForm}/>
              <PrivateRoute exact path="/" component={Main}/>{/*// можно использовать, если нужна главная страница */}

              <LayoutWithMenu history={history}>
                  <PrivateRoute exact path="/programs" component={Programs}/>
                  <PrivateRoute exact path="/compilers" component={Compilers}/>
                  <PrivateRoute exact path="/tasks" component={Tasks}/>
                  <PrivateRoute exact path="/results" component={Results}/>
              </LayoutWithMenu>

          </Switch>
        )
    }
}

export default withRouter(App);
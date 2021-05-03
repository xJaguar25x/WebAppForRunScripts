import React, {Component} from 'react';
import classes from './UserPreview.module.scss';
import {ClickOutsideWrapper, PreloaderWrapper} from "../../hoc";
import {Button} from "../../components";
import {connect} from "react-redux";
import {loadUSER, logoutUSER} from "../../store/actions/authActions";
import store from "../../store/store";


class UserPreview extends Component {
    componentDidMount() {
        store.dispatch(loadUSER());
    }
    state = {
        isOpenPopoverMenu: false
    };

    /* ~~~~~~~~~~~~~~~~~~ Обработчики событий UI ~~~~~~~~~~~~~~~~~~~~~~*/
    // показать/скрыть popover
    togglePopoverMenu = () => {
        this.setState({isOpenPopoverMenu: !this.state.isOpenPopoverMenu});
    };

    // выйти из системы
    handleUserLogout = () => {
        // очистка localstorage
        this.props.logoutUSER();
        //редирект на страницу авторизации
        this.props.history.push("/login");
    };
    // перейти на страницу пользователя
    // handleUserProfile = () => {
    //     let history = useHistory();
    //     history.push("/profile");
    // };

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    OpenPopoverMenu() {
        return (
          <ClickOutsideWrapper handleClickOutside={this.togglePopoverMenu}>
              <div className={classes.UserProfile}>
                  <div className={classes.UserProfile_Header}
                  onClick={this.togglePopoverMenu}
                  >
                      <div>{this.props.Auth.user.name}</div>
                  </div>
                  <div className={classes.PopoverColumn}>
                      {/* <div className={classes.Popover_Header}>
                          <div>Column actions</div>
                      </div>*/}
                      <div className={classes.Popover_Content}>
                          <div className={classes.Popover_List}>
                              <Button
                                type="button"
                                className="Popover_List_btn"
                                onClick={this.handleUserLogout}
                                // onClick={this.props.logout()}
                              >
                                  Logout
                              </Button>
                          </div>
                      </div>
                  </div>
              </div>
          </ClickOutsideWrapper>
        )
    }

    ClosePopoverMenu() {
        return (
          <Button
            className="btnOpenPopoverUserProfile"
            onClick={this.togglePopoverMenu}
          >
              <div>{this.props.Auth.user.name}</div>

          </Button>
        )
    }

    render() {
        const {isLoading, error} = this.props.Auth;
        const user = Object.values(this.props.Auth.user).length;
        // console.log("Auth =", this.props.Auth);
        return (
          <PreloaderWrapper
            isLoading={isLoading}
            isError={error}
            isEmpty={!user}
            // fetch={this.fetchOrdersList}
            emptyText="User"
          >
              {
                  this.state.isOpenPopoverMenu
                    ? this.OpenPopoverMenu()
                    : this.ClosePopoverMenu()
              }
          </PreloaderWrapper>
        )
    }
}

const mapStateToProps = state => ({
    Auth: state.Auth
});
export default connect(
  mapStateToProps,
  {logoutUSER}
)(UserPreview);
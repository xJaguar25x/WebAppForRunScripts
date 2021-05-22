import React, {Component} from "react";
import store from "../../store/store";
import {loadUSER, logoutUSER} from "../../store/actions/authActions";
import {compose} from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
    },
    profileButton: {
        marginRight: theme.spacing(2),
    },
    menuIcons: {
        marginRight: theme.spacing(2),
    },
});

class MenuUserProfile extends Component {
    componentDidMount() {
        store.dispatch(loadUSER());
    }

    state = {
        isOpenPopoverMenu: false,
        anchorEl: null,
    };


    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        const open = Boolean(this.state.anchorEl);
        const {user} = this.props.Auth.user;
        // console.log("props MenuUserProfile =", this.props);

        const handleOpenMenu = (event) => {
            this.setState({
                ...this.state,
                anchorEl: event.currentTarget
            });
        };

        const handleCloseMenu = () => {
            this.setState({
                ...this.state,
                anchorEl: null
            });
        };
        //TODO: доделать функциии
        // перейти на страницу пользователя
        const handleClickProfile = () => {
            // this.props.history.push("/profile");
        };
        // выйти из системы
        const handleClickLogout = () => {
            // очистка localstorage
            this.props.logoutUSER();
            //редирект на страницу авторизации
            this.props.history.push("/login");
        };

        return (
          <div>
              {/*кнопка с иконкой и именем пользователя*/}
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                variant="text"
                color="inherit"
                className={classes.button}
                startIcon={<AccountCircle/>}
                onClick={handleOpenMenu}
                size='large'
              >
                  {user.user_name}
              </Button>
              {/*кнопка с иконкой*/}
              {/*  <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
              >
                  <AccountCircle/>
              </IconButton>*/}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleCloseMenu}
              >
                  <MenuItem onClick={handleClickProfile}>
                      <SettingsIcon className={classes.menuIcons}/>
                      Profile
                  </MenuItem>
                  <MenuItem onClick={handleClickLogout}>
                      <ExitToAppIcon className={classes.menuIcons}/>
                      Logout
                  </MenuItem>
              </Menu>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    Auth: state.Auth
});
export default compose(
  withStyles(styles, {withTheme: true}),
  connect(
    mapStateToProps,
    {logoutUSER}
  ),
)(MenuUserProfile);
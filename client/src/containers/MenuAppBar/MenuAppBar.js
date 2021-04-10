import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from "react-redux";
import {loadUSER, logoutUSER} from "../../store/actions/authActions";
import store from "../../store/store";
import {compose} from "redux";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class MenuAppBar extends Component {
    componentDidMount() {
        store.dispatch(loadUSER());
    }

    state = {
        isOpenPopoverMenu: false,
        auth:true,
        anchorEl:null,

    };

    render() {
        const {classes} = this.props;
        const {auth, anchorEl}= this.state;
        const open = Boolean(this.state.anchorEl);

        const handleChange = (event) => {
            this.setState({
                ...this.state,
                auth: event.target.checked
            });
        };

        const handleMenu = (event) => {
            this.setState({
                ...this.state,
                anchorEl: event.currentTarget
            });
        };

        const handleClose = () => {
            this.setState({
                ...this.state,
                anchorEl: null
            });
        };

        return (
          <div className={classes.root}>
              <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch"/>}
                    label={auth ? 'Logout' : 'Login'}
                  />
              </FormGroup>
              <AppBar position="static">
                  <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          <MenuIcon/>
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                          Photos
                      </Typography>
                      {auth && (
                        <div>
                            <IconButton
                              aria-label="account of current user"
                              aria-controls="menu-appbar"
                              aria-haspopup="true"
                              onClick={handleMenu}
                              color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
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
                              onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                      )}
                  </Toolbar>
              </AppBar>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    Auth: state.Auth
});
export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    {logoutUSER}
  ),
)(MenuAppBar);
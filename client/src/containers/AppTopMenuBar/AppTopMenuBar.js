import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from "@material-ui/core/styles/withStyles";

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {MenuUserProfile, MenuLinks} from "../../containers/index";


const drawerWidth = 240;
const styles = (theme) => ({
    root: {
        // display: 'flex',
        // flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    title: {
        flexGrow: 1,
    },
    userProfile: {
        justifyContent: 'flex-end',
    },
    myToolbar: {
        display: "flex",
        justifyContent: "space-between"
    },
});


class AppTopMenuBar extends Component {

    state = {
        isOpenLeftMenu: false,
    };

    render() {
        const {classes, theme, history} = this.props;
        const open = this.state.isOpenLeftMenu;
        // console.log("history", this.props);

        const toggleDrawer = (open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            this.setState({
                ...this.state,
                isOpenLeftMenu: open
            });
        };

        const handleLeftMenuOpen = () => {
            this.setState({
                ...this.state,
                isOpenLeftMenu: true
            });
        };

        const handleLeftMenuClose = () => {
            this.setState({
                ...this.state,
                isOpenLeftMenu: false
            });
        };
        // TODO: смотри ниже

        return (
          <div className={classes.root}>
              <CssBaseline/>
              <AppBar position="static">
                  <Toolbar className={classes.myToolbar}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleLeftMenuOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                      >
                          <MenuIcon/>
                      </IconButton>
                      {/*//TODO: сделать показ актуальной страницы вместо текста "Photos" . Убрать класс "myToolbar", после настройки*/}
                      {/* <Typography variant="h6" className={classes.title}>
                          Photos
                      </Typography>*/}

                      <MenuUserProfile history={history} classname={classes.userProfile}/>

                  </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                onClose={toggleDrawer( false)}
                classes={{
                    paper: classes.drawerPaper,
                }}
              >
                  <div className={classes.drawerHeader}>
                      <IconButton onClick={handleLeftMenuClose}>
                          {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                      </IconButton>
                  </div>

                  <MenuLinks
                    history={history}
                    toggleDrawer = {toggleDrawer}
                  />

              </Drawer>
          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AppTopMenuBar);
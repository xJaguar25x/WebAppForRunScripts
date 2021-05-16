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

const styles = (theme) => ({
    root: {
        // display: 'flex',
        // flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1, 0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    title: {
        // flexGrow: 1,
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
        const {pathname} = history.location;
        console.log("AppTopMenuBar props", this.props);

        const toggleDrawer = (open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
            this.setState({
                ...this.state,
                isOpenLeftMenu: open
            });
        };

        return (
          <div className={classes.root}>
              <CssBaseline/>
              <AppBar position="static">
                  <Toolbar className={classes.myToolbar}>
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        edge="start"
                        className={clsx(classes.menuButton)}
                      >
                          <MenuIcon/>
                      </IconButton>
                       <Typography variant="h6" className={classes.title}>
                          {
                              pathname.substr(1,1).toUpperCase() + pathname.slice(2)
                          }
                      </Typography>

                      <MenuUserProfile history={history} classname={classes.userProfile}/>

                  </Toolbar>
              </AppBar>
              <Drawer
                variant="temporary"
                anchor="left"
                open={this.state['isOpenLeftMenu']}
                onClose={toggleDrawer(false)}
              >
                  <div className={classes.drawerHeader}>
                      <Typography>Menu</Typography>
                      <IconButton onClick={toggleDrawer(false)}>
                          {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                      </IconButton>
                  </div>

                  <MenuLinks
                    history={history}
                    toggleDrawer={toggleDrawer}
                  />

              </Drawer>
          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AppTopMenuBar);
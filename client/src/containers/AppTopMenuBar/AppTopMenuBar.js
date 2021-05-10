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
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {MenuUserProfile} from "../../containers/index";
import AppsIcon from '@material-ui/icons/Apps';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import QueueIcon from '@material-ui/icons/Queue';
import Icon from "@material-ui/core/Icon";
import ListIcon from '@material-ui/icons/List';
import SubjectIcon from '@material-ui/icons/Subject';
import GridOnIcon from '@material-ui/icons/GridOn';

const drawerWidth = 240;
const styles = (theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
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

/*const menuLinks = [
    {
        name: 'Programs',
        url: '/programs',
        icon: "AppsIcon"
    },
    {
        name: 'Compilers',
        url: '/compilers',
        icon: "SettingsApplicationsIcon"
    },
    {
        name: 'Tests',
        url: '/tests',
        icon: "QueueIcon"
    },
];*/

class AppTopMenuBar extends Component {

    state = {
        isOpenLeftMenu: false,
    };

    render() {
        const {classes, theme, history} = this.props;
        const open = this.state.isOpenLeftMenu;

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
              <AppBar position="static" >
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
                classes={{
                    paper: classes.drawerPaper,
                }}
              >
                  <div className={classes.drawerHeader}>
                      <IconButton onClick={handleLeftMenuClose}>
                          {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                      </IconButton>
                  </div>
                  <Divider/>
                  <List>
                      {/* TODO: реализовани вывод иконок с помощью списка констант*/}
                      {/* {menuLinks.map((text, index) => (
                        <ListItem button key={text.name}>
                            <ListItemIcon>{React.createElement(window[text.icon], {})}</ListItemIcon>
                            <ListItemText primary={text.name}/>
                        </ListItem>
                      ))}*/}
                      <ListItem button key="Programs">
                          <ListItemIcon><AppsIcon/></ListItemIcon>
                          <ListItemText primary="Programs"/>
                      </ListItem>
                      <ListItem button key="Compilers">
                          <ListItemIcon><SettingsApplicationsIcon/></ListItemIcon>
                          <ListItemText primary="Compilers"/>
                      </ListItem>
                      <ListItem button key="Tasks">
                          <ListItemIcon><QueueIcon/></ListItemIcon>
                          <ListItemText primary="Tasks"/>
                      </ListItem>
                      <ListItem button key="Results">
                          <ListItemIcon><GridOnIcon/></ListItemIcon>
                          <ListItemText primary="Results"/>
                      </ListItem>
                  </List>
                  <Divider/>
                  {/*  <List>
                      {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                      ))}
                  </List>*/}
              </Drawer>
          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(AppTopMenuBar);
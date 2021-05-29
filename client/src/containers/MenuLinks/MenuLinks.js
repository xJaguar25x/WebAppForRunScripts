import React, {Component, Fragment} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer/Drawer";
import AppsIcon from '@material-ui/icons/Apps';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import QueueIcon from '@material-ui/icons/Queue';
import Icon from "@material-ui/core/Icon";
import ListIcon from '@material-ui/icons/List';
import SubjectIcon from '@material-ui/icons/Subject';
import GridOnIcon from '@material-ui/icons/GridOn';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";


const menuLinks = [
    {
        name: 'Programs',
        url: '/programs',
        icon: <AppsIcon/>
    },
    {
        name: 'Compilers',
        url: '/compilers',
        icon: <SettingsApplicationsIcon/>
    },
    {
        name: 'Tasks',
        url: '/tasks',
        icon: <QueueIcon/>
    },
];
const menuLinks2 = [
    {
        name: 'Results',
        url: '/results',
        icon: <DoneAllIcon/>
    },
];

//Шаблонная функция. https://material-ui.com/guides/composition/#link
function ListItemLink(props) {
    const {icon, primary, to} = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) =>
        <RouterLink to={to} ref={ref} {...itemProps} />
        ),
      [to],
    );

    return (
      <li>
          <ListItem button component={renderLink}>
              {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
              <ListItemText primary={primary}/>
          </ListItem>
      </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

const styles = (theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

class MenuLinks extends Component {
    render() {
        const {classes, toggleDrawer} = this.props;

        return (
          <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer( false)}
          >
              <Divider/>
              <List>
                  {menuLinks.map((item, index) => (
                    <ListItemLink key={item.name} to={item.url} primary={item.name} icon={item.icon} history={this.history}/>
                  ))}
              </List>
              <Divider/>
              <List>
                  {menuLinks2.map((item, index) => (
                    <ListItemLink key={item.name} to={item.url} primary={item.name} icon={item.icon} history={this.history}/>
                  ))}
              </List>
              {/*<Divider/>*/}
              {/*  <List>
                      {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                      ))}
                  </List>*/}
          </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MenuLinks);
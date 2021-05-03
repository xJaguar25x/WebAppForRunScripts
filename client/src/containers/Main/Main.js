import './Main.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
    FormCompilers,
    FormProgs,
    TableProgsFromDB,
    TableCompilersFromDB,
    FormTests,
    UserPreview
} from "../../containers/index";
import MenuAppBar from "../MenuAppBar/MenuAppBar";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
          {value === index && (
            <Box p={3}>
                {/*<Typography>*/}
                {children}
                {/*</Typography>*/}
            </Box>
          )}
      </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    AppBar: {
        "flex-flow": "row nowrap",
        "align-items": "center",
        "justify-content": "center",
    },

}));

function Main(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
      <div className={classes.root}>
          <MenuAppBar {...props}/>
          <AppBar className={classes.AppBar} position="static">
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                  <Tab label="Programs" {...a11yProps(0)} />
                  <Tab label="Compilers" {...a11yProps(1)} />
                  <Tab label="Tests" {...a11yProps(2)} />
              </Tabs>
              <UserPreview {...props}/>
          </AppBar>
          <TabPanel value={value} index={0}>
              <FormProgs type="Programs"/>
              <TableProgsFromDB/>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <FormCompilers type="Compilers"/>
              <TableCompilersFromDB/>
          </TabPanel>
          <TabPanel value={value} index={2}>
              <FormTests/>
          </TabPanel>
      </div>
    );
}
export default (Main);
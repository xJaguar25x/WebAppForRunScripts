import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuLinks from "../MenuLinks/MenuLinks";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: "0px 1px",
        justifyContent: 'space-around',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, left: open});
    };

    return (
      <div>
          <Button onClick={toggleDrawer( true)}>left</Button>
          <Drawer open={state['left']} onClose={toggleDrawer( false)}>
              <div className={classes.drawerHeader}>
                  <div>Menu</div>
                  <IconButton >
                       <ChevronLeftIcon/>
                  </IconButton>
              </div>
              <MenuLinks
                toggleDrawer = {toggleDrawer}
              />
          </Drawer>
      </div>
    );
}

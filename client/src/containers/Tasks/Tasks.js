import React, {Component} from "react";
import {FormTasks, TaskMonitor} from "../index";
import Box from "@material-ui/core/Box";
import {Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {w3cwebsocket as W3CWebSocket} from "websocket";

//создание нового соединения WebSocket
const clientWS = new W3CWebSocket('ws://localhost:5000');

const styles = (theme) => ({
    container: {
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "center",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});

class Tasks extends Component {
    componentDidMount() {
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Http ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ WebSocket ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        clientWS.onopen = () => {
            console.log('WebSocket Client Connected');
        };
    }

    render() {
        const {classes, theme, history} = this.props;

        return (
          <Container className={classes.container}>
              <Box p={3}>
                  <FormTasks clientWS={clientWS}/>
              </Box>
              <Box>
                  <TaskMonitor clientWS={clientWS}/>
              </Box>
          </Container>

        );
    }
}

export default withStyles(styles, {withTheme: true})(Tasks);
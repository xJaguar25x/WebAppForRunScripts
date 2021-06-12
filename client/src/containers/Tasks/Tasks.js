import React, {Component} from "react";
import {FormTasks, TaskMonitor} from "../index";
import Box from "@material-ui/core/Box";
import {Container} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

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
    render() {
        const {classes, theme, history} = this.props;

        return (
          <Container className={classes.container}>
              <Box p={3}>
                  <FormTasks/>
              </Box>
              <Box>
                  <TaskMonitor/>
              </Box>
          </Container>

        );
    }
}

export default withStyles(styles, {withTheme: true})(Tasks);
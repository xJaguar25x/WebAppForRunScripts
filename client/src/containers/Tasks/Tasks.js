import React, {Component, Fragment} from "react";
import {FormTasks} from "../index";
import Box from "@material-ui/core/Box";

class Tasks extends Component {
    render() {
        return (
          <Box p={3}>
              <FormTasks/>
          </Box>
        );
    }
}

export default Tasks;
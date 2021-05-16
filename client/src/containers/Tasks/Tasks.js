import React, {Component, Fragment} from "react";
import {FormTests} from "../index";
import Box from "@material-ui/core/Box";

class Tasks extends Component {
    render() {
        return (
          <Box p={3}>
              <FormTests/>
          </Box>
        );
    }
}

export default Tasks;
import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {FormWorkstations} from "../index";

class Workstations extends Component {
    render() {
        return (
          <Box p={3}>
              <FormWorkstations/>
          </Box>
        );
    }
}

export default Workstations;
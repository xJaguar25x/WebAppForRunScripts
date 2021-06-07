import React, {Component} from "react";
import {FormProgs, TableProgsFromDB} from "../index";
import Box from "@material-ui/core/Box";

class Programs extends Component {
    render() {
        return (
          <Box p={3}>
              <FormProgs type="Programs"/>
              <TableProgsFromDB/>
          </Box>
        );
    }
}

export default Programs;
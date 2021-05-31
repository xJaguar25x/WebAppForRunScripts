import React, {Component} from "react";
import {FormCompilers, TableCompilersFromDB} from "../index";
import Box from "@material-ui/core/Box";

class Compilers extends Component {
    render() {
        return (
          <Box p={3}>
              <FormCompilers type="Compilers"/>
              <TableCompilersFromDB/>
          </Box>
        );
    }
}

export default Compilers;
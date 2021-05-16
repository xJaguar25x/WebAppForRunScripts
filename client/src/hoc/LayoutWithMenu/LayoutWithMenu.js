import React, {Component} from 'react'
import classes from './Layout.module.scss'
import {AppTopMenuBar, TestTopBar} from "../../containers";
import Box from "@material-ui/core/Box";

class LayoutWithMenu extends Component {
    render() {
        // console.log(" this.props", this.props);
        return (
          <div>
          {/*<div className={classes.Layout}>*/}
              <AppTopMenuBar history={this.props.history}/>
              <TestTopBar  history={this.props.history}/>

              {this.props.children}
          </div>
        )
    }
}

export default LayoutWithMenu;
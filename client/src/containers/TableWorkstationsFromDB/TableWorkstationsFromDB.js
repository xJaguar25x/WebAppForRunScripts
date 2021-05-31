import React, {Fragment, useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './TableWorkstationsFromDB.module.scss';
import axios from "axios";
import Message from "../../components/Message/Message";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Fade from "@material-ui/core/Fade";


export default function TableWorkstationsFromDB(props) {
    const {workstations, message} = props.state;
    const {handlerDelete} = props;
    console.log("props ", props);
    return (
      <div className={classes.dataFromDb}>
          {message && message.messageFor === "TableWorkstations" ? <Message msg={message}/> : null}
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Type</TableCell>
                          <TableCell align="right">Ip address</TableCell>
                          <TableCell align="right">Location</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Create date</TableCell>
                          <TableCell align="right">Delete</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {/*<TransitionGroup>*/}
                              {workstations !== null ? workstations.map((row) => (
                                <Fragment>
                                    {/*<Fade in={true} timeout={1000}>*/}
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">{row.name}</TableCell>
                                        <TableCell align="right">{row.type}</TableCell>
                                        <TableCell align="right">{row.ip_address}</TableCell>
                                        <TableCell align="right">{row.location}</TableCell>
                                        <TableCell align="right">{row.description}</TableCell>
                                        <TableCell align="right">{row.create_date}</TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" id={row._id}
                                                        onClick={() => handlerDelete(row._id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {/*</Fade>*/}
                                </Fragment>
                              )) : null}
                      {/*</TransitionGroup>*/}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
    );
}
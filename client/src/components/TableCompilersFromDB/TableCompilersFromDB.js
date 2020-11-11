import React, {useEffect, useState} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './TableCompilersFromDB.module.scss';
import axios from "axios";
import Message from "../Message/Message";


export default function TableCompilersFromDB() {
    // react-hooks
    const [message, setMessage] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              '/api/compilers/',
            );
            setPosts(result.data);
        };
        fetchData();
    }, []);

    const handlerDelete = async (id) => {
        console.log("delete item: ", id);

        try {
            const res = await axios.delete('api/compilers/' + id);
            setMessage({status: res.status, msg: res.data.msg});
        } catch (err) {
            setMessage({status: err.response.status, msg: err.response.data.msg});
        }
    };

    return (
      <div className={classes.dataFromDb}>
          {message ? <Message msg={message}/> : null}
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell>Compiler name</TableCell>
                          <TableCell align="right">Command to compile</TableCell>
                          <TableCell align="right">Command to run</TableCell>
                          <TableCell align="right">Create date</TableCell>
                          <TableCell align="right">Delete</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {posts.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">{row.compiler_name}</TableCell>
                            <TableCell align="right">{row.command_to_compile}</TableCell>
                            <TableCell align="right">{row.command_to_run}</TableCell>
                            <TableCell align="right">{row.creation_date}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="delete" id={row._id} onClick={() => handlerDelete(row._id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
      </div>
    );
}
import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {TerminalContainer} from "../../containers/index"
import TextField from "@material-ui/core/TextField/TextField";
import {Field} from "formik";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: "5px"
    },
    buttonAddTest: {
        margin: "5px"
    },
    buttonStartTests: {background: "#1bd400"},
    root: {
        "align-items": "center",
        "justify-content": "center",
        display: "flex",
        "flex-grow": 1,
        "flex-flow": "column wrap",
    },
    form: {
        "align-items": "center",
        "justify-content": "center",
        display: "flex",
        "flex-grow": 1,
        "flex-flow": "row",
        margin: "10px",
    }
}));

export default function FormTests() {
    const classes = useStyles();
    // react-hooks
    const [progs, setProgs] = useState([]);
    const [compilers, setCompilers] = useState([]);
    const [terminal, setTerminalOpen] = useState(false);
    const [numbIter, setNumbIter] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              '/api/progs/',
            );
            setProgs(result.data);
            const result2 = await axios(
              '/api/compilers/',
            );
            setCompilers(result2.data);
        };
        fetchData();
    }, []);


    function handlerRunScript() {
        setTerminalOpen(!terminal);

    }

    return (
      <div className={classes.root}>
          <h3>Test group</h3>
          <div className={classes.form}>
              {/*<Button
                  variant="contained"
                  color="default"
                  size="small"
                  className={classes.buttonAddTest}
                  // onClick={() => arrayHelpers.push({
                  //     id: "" + Math.random()
                  // })}
                >
                    Add Test
                </Button>*/}
              <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectProgs">Programs</InputLabel>
                  <Select defaultValue="" id="selectProgs" name="selectProgs">
                      <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                      {progs.map((row) => (
                        <MenuItem value={row._id} key={row._id}>{row.prog_name}</MenuItem>
                      ))}
                  </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectCompilers">Compilers</InputLabel>
                  <Select defaultValue="" id="selectCompilers" name="selectCompilers">
                      <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                      {compilers.map((row) => (
                        <MenuItem value={row._id} key={row._id}>{row.compiler_name}</MenuItem>
                      ))}
                  </Select>
              </FormControl>

              <TextField
                name="numbIter"
                id="standard-basic"
                label="Numbers of iterations"
                type="number"
                value={numbIter}
                onChange={(e) => setNumbIter(e.target.value)}
              />

              {/*для отладки*/}
              {/*<pre>{JSON.stringify(formProps.values, null, 2)}</pre>*/}
          </div>

          <Button
            variant="contained"
            size="large"
            className={classes.buttonStartTests}
            startIcon={<SaveIcon/>}
            type="submit"
            onClick={() => handlerRunScript()}
          >
              Run test group
          </Button>

          {terminal ? <TerminalContainer props='testprop'/> : null}
      </div>

    );
}

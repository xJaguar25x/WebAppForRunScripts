import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {InputLabel, MenuItem, FormControl, Select, Button, TextField} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {TerminalContainer} from "../index"

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
    const [selectedProg, setSelectedProg] = useState('');
    const [selectedCompiler, setSelectedCompiler] = useState('');
    const [formData, setFormData] = useState('');

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
        setFormData({
            prog_name: selectedProg.prog_name,
            compiler_name: selectedCompiler.compiler_name,
            numbIter: numbIter,
            //не работает
            // toString: function () {
            //     return selectedProg.prog_name + ' ' + selectedCompiler.compiler_name + ' ' + numbIter;
            // }
        });
        console.log(formData);
    };
    return (
      <div className={classes.root}>
          <h3>Test</h3>
          {/*<h3>Test group</h3>*/}
          <div className={classes.form}>
              {/*
              //для реализации добавления еще 1 теста
              <Button
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
                  <Select
                    defaultValue=""
                    id="selectProgs"
                    name="selectProgs"
                    selected={selectedProg}
                    onChange={(e) => setSelectedProg(e.target.value)}
                  >
                      <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                      {progs.map((row) => (
                        <MenuItem value={row} key={row._id}>{row.prog_name}</MenuItem>
                      ))}
                  </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="selectCompilers">Compilers</InputLabel>
                  <Select
                    defaultValue=""
                    id="selectCompilers"
                    name="selectCompilers"
                    selected={selectedCompiler}
                    onChange={(e) => setSelectedCompiler(e.target.value)}
                  >
                      <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                      {compilers.map((row) => (
                        <MenuItem value={row} key={row._id}>{row.compiler_name}</MenuItem>
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

          {terminal ? <TerminalContainer props={formData}/> : null}
      </div>

    );
}

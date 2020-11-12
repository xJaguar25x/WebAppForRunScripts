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
import {Field, useFormik} from "formik";

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
        "flex-flow": "row wrap",
    },
    formInputs: {
        "align-items": "center",
        "justify-content": "center",
        display: "flex",
        "flex-grow": 1,
        "flex-flow": "row wrap",
        margin: "10px",
        width: "100%",
    }
}));

export default function FormTests() {
    const classes = useStyles();
    // react-hooks
    // const [progs, setProgs] = useState([]);
    // const [compilers, setCompilers] = useState([]);
    const [terminal, setTerminalOpen] = useState(false);
    // const [numbIter, setNumbIter] = useState('');
    const {values, handleChange, handleSubmit, handleReset, setFieldValue, setValues} = useFormik({
        initialValues: {
            progs: '',
            compilers: '',
            numbIter: ''
        },
        onSubmit: ({progs, compilers, numbIter}) => {
            handlerRunScript();
            console.log(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              '/api/progs/',
            );
            // setProgs(result.data);
            // setFieldValue({field: 'progs', value: [{1:1,2:2}], shouldValidate: false});
            setValues({fields: {'progs':"1"}, shouldValidate: false});
            console.log('values.progs: ', values.progs);
            console.log(values.progs);
            const result2 = await axios(
              '/api/compilers/',
            );
            // setCompilers(result2.data);
            // setValues({compilers: result2.data});
        };
        fetchData();
    }, []);

    function handlerRunScript() {
        setTerminalOpen(!terminal);
    };
    return (
      <div className={classes.root}>
          <h3>Test group</h3>
          <form className={classes.form} onReset={handleReset} onSubmit={handleSubmit} >
              <div className={classes.formInputs}>
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
                      <Select
                        defaultValue=""
                        id="selectProgs"
                        name="selectProgs"
                        selected={values.progs}
                        onChange={handleChange}>
                          <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                         {/* {values.progs.map((row) => (
                            <MenuItem value={row._id} key={row._id}>{row.prog_name}</MenuItem>
                          ))}*/}
                      </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="selectCompilers">Compilers</InputLabel>
                      <Select
                        defaultValue=""
                        id="selectCompilers"
                        name="selectCompilers"
                        selected={values.compilers}
                        onChange={handleChange}>
                          <MenuItem value="" key={"" + Math.random()}><em>None</em></MenuItem>
                         {/* {values.compilers.map((row) => (
                            <MenuItem value={row._id} key={row._id}>{row.compiler_name}</MenuItem>
                          ))}*/}
                      </Select>
                  </FormControl>

                  <TextField
                    name="numbIter"
                    id="standard-basic"
                    label="Numbers of iterations"
                    type="number"
                    value={values.numbIter}
                    // value={numbIter}
                    // onChange={(e) => setNumbIter(e.target.value)}
                    onChange={handleChange}
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
                onClick={() => handleSubmit()}
              >
                  Run test group
              </Button>
          </form>
          {terminal ? <TerminalContainer props='testprop'/> : null}
      </div>

    );
}

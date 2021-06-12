import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {InputLabel, MenuItem, FormControl, Select, Button, TextField} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {TerminalContainer} from "../index"
import Input from "@material-ui/core/Input/Input";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
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
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function FormTasks() {
    const classes = useStyles();
    const theme = useTheme();
    // react-hooks
    const [progs, setProgs] = useState([]);
    const [compilers, setCompilers] = useState([]);
    const [terminal, setTerminalOpen] = useState(false);

    // const [numbIter, setNumbIter] = useState('');
    const [selectedProg, setSelectedProg] = useState('');
    const [selectedCompiler, setSelectedCompiler] = useState('');
    const [formData, setFormData] = useState('');

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ NEW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    /*const ipAdress = [
        '127.0.0.1',
        '192.168.2.103',
        '192.168.2.104',
        '192.168.2.105',
        '192.168.2.106',
        '12.18.2.10',
        '12.18.2.11',
        '123.142.185.33',
    ];*/
   /* function getStyles(name, personName, theme) {
        return {
            fontWeight:
              personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        };
    }*/
    const [selectedIpAdress, setSelectedIpAdress] = React.useState([]);

    const handleChange = (event) => {
        setSelectedIpAdress(event.target.value);
    };
    const [ipAdress, setIpAdress] = React.useState([]);

    /*const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    };*/
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~ NEW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
            const result3 = await axios(
              '/api/workstations/',
            );
            setIpAdress(result3.data);
        };
        fetchData();
    }, []);

    function handlerRunScript() {
        setTerminalOpen(!terminal);
        setFormData({
            prog_name: selectedProg.prog_name,
            compiler_name: selectedCompiler.compiler_name,
            ip_address: selectedIpAdress
            // numbIter: numbIter,
            //не работает
            // toString: function () {
            //     return selectedProg.prog_name + ' ' + selectedCompiler.compiler_name + ' ' + numbIter;
            // }
        });
        console.log(formData);
    };
    return (
      <div className={classes.root}>
          <h3>Configure task</h3>
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
                  <InputLabel htmlFor="selectProgs">Program</InputLabel>
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
                  <InputLabel htmlFor="selectCompilers">Compiler</InputLabel>
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

             {/* <TextField
                name="numbIter"
                id="standard-basic"
                label="Numbers of iterations"
                type="number"
                value={numbIter}
                onChange={(e) => setNumbIter(e.target.value)}
              />*/}

              <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">Ip-address</InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedIpAdress}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                      {ipAdress.map((item) => (
                        <MenuItem key={item._id} value={item.ip_address}>
                            <Checkbox checked={selectedIpAdress.indexOf(item.ip_address) > -1} />
                            <ListItemText primary={item.ip_address} />
                        </MenuItem>
                      ))}
                  </Select>
              </FormControl>
             {/* <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                          ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                      {names.map((name) => (
                        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                            {name}
                        </MenuItem>
                      ))}
                  </Select>
              </FormControl>*/}

              {/*для отладки*/}
              {/*<pre>{JSON.stringify(formData.values, null, 2)}</pre>*/}
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

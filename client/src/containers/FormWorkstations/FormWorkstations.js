import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Message} from "../../components";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {Field, Form, Formik} from 'formik';
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function FormWorkstations() {
    const classes = useStyles();
    // react-hooks
    const [message, setMessage] = useState('');
    const [workstations, setWorkstations] = useState('');

    //запускается 1 раз при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
              '/api/workstations',
            );
            setWorkstations(result.data);
            // console.log("workstation: ", result.data);
        };
        fetchData();
    }, []);

   /* const [age, setAge] = React.useState('Pc');

    const handleChange = (event) => {
        setAge(event.target.value);
    };*/

    const onSubmit = async (values) => {
        console.log("submit: ", values);
        console.log(values);

        try {
            const res = await axios.post('api/workstations', values);
            setMessage({status: 200, msg: 'Save successful'});
            console.log("upload data: ", res);
        } catch (err) {
            if (err.response.status === 500) {
                setMessage({status: '500', msg: 'There was a problem with a server'});
            } else {
                setMessage({status: err.response.status, msg: err.response.data.msg});
            }
        }
    };

    return (
      <Formik
        initialValues={{name: "", type: "", ip_address: "", location: "", description: ""}}
        onSubmit={values => {
            onSubmit(values)
        }}
      >
          {(formProps) => (
            <Form className={classes.root}>
                {message ? <Message msg={message}/> : null}
                <Field name="name"
                       id="form-name"
                       label="name"
                       value={formProps.values.name}
                       as={TextField}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="form-type"
                      //id="form-type-label"
                    >type</InputLabel>
                    <Field name="type"
                           id="form-type"
                           //labelId="form-type-label"
                           label="type"
                           value={formProps.values.type}
                           // defaultValue={formProps.values.type}//если нужно значение по умолчанию
                           as={Select}>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="pc">Pc</MenuItem>
                        <MenuItem value="server">Server</MenuItem>
                        <MenuItem value="boards">Boards</MenuItem>
                    </Field>
                </FormControl>
                <Field name="ip_address"
                       id="form-type-ip_address"
                       label="ip_address"
                       value={formProps.values.ip_address}
                       as={TextField}
                />
                <Field name="location"
                       id="form-type-location"
                       label="location"
                       value={formProps.values.location}
                       multiline
                       as={TextField}
                />
                <Field name="description"
                       id="form-type-description"
                       label="description"
                       value={formProps.values.description}
                       multiline
                       as={TextField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon/>}
                  type="submit"
                >
                    Save
                </Button>
                {/*для отладки*/}
                {/*<pre>{JSON.stringify(formProps.values, null, 2)}</pre>*/}
            </Form>
          )}
      </Formik>
    );
}
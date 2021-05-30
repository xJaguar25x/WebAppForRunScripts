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
import FormHelperText from "@material-ui/core/FormHelperText";

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

    const validateName = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    };
    const validateType = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        }
        return error;
    };
    const validateIpAddress = (value) => {
        let error;
        if (!value) {
            error = 'Required';
        } else if (!/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/i.test(value)) {
            error = 'Invalid ip address';
        } else if (workstations.some(n => {
            return n.ip_address === value
        })) {
            error = 'This ip already exists! Ip address must be unique';
        }
        return error;
    };

    const onSubmit = async (values) => {
        // console.log("submit: ", values);
        // console.log(values);

        try {
            const res = await axios.post('api/workstations', values);
            setMessage({status: 200, msg: 'Save successful'});
            // console.log("upload data: ", res);
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
          {({errors, touched, handleChange, values, isValid, isValidating}) => (
            <Form className={classes.root}>
                {message ? <Message msg={message}/> : null}
                <FormControl required className={classes.formControl}>
                    <Field name="name"
                           id="form-name"
                           label="name"
                           value={values.name}
                           required
                           validate={validateName}
                           error={errors["name"]}
                           as={TextField}
                    />
                    <FormHelperText>{errors.name && touched.name && errors.name}</FormHelperText>
                </FormControl>
                <FormControl required className={classes.formControl}>
                    <InputLabel
                      htmlFor="form-type"
                      // id="form-type-label"
                    >type</InputLabel>
                    <Field name="type"
                           id="form-type"
                      // labelId="form-type-label"
                           label="type"
                           value={values.type}
                      // defaultValue={values.type}//если нужно значение по умолчанию
                           validate={validateType}
                           error={errors["type"]}
                           as={Select}>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="pc">Pc</MenuItem>
                        <MenuItem value="server">Server</MenuItem>
                        <MenuItem value="boards">Boards</MenuItem>
                    </Field>
                    <FormHelperText>{errors.type && touched.type && errors.type}</FormHelperText>
                </FormControl>
                <FormControl required className={classes.formControl}>
                    <Field name="ip_address"
                           id="form-type-ip_address"
                           label="ip_address"
                           value={values.ip_address}
                           as={TextField}
                           required
                           validate={validateIpAddress}
                           error={errors["ip_address"]}
                    />
                    <FormHelperText>{errors.ip_address && touched.ip_address && errors.ip_address}</FormHelperText>
                </FormControl>
                <Field name="location"
                       id="form-type-location"
                       label="location"
                       value={values.location}
                       multiline
                       as={TextField}
                />
                <Field name="description"
                       id="form-type-description"
                       label="description"
                       value={values.description}
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
                {/* <pre>"values" :{JSON.stringify(values, null, 2)}</pre>
                <pre>"errors" :{JSON.stringify(errors, null, 2)}</pre>
                <pre>"touched" :{JSON.stringify(touched, null, 2)}</pre>*/}
            </Form>
          )}
      </Formik>
    );
}
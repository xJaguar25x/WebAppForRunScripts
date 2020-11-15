import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Message} from "../../components";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import {Field, Form, Formik} from 'formik';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function FormCompilers() {
    const classes = useStyles();
    // react-hooks
    const [message, setMessage] = useState('');

    const onSubmit = async (values) => {
        console.log("submit: ", values);
        console.log(values);

        try {
            const res = await axios.post('api/compilers', values);
            setMessage({status: 200, msg: 'Data uploaded'});
            console.log("upload data: ",res);
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
        initialValues={{compiler_name: "", command_to_compile: "", command_to_run: ""}}
        onSubmit={values => {
            onSubmit(values)
        }}
      >
          {(formProps) => (
            <Form className={classes.root}>
                {message ? <Message msg={message}/> : null}
                <Field name="compiler_name" id="standard-basic" label="compiler_name"
                       value={formProps.values.compiler_name}
                       as={TextField}/>
                <Field name="command_to_compile" id="standard-basic" label="command_to_compile"
                       value={formProps.values.command_to_compile}
                       multiline
                       as={TextField}/>
                <Field name="command_to_run" id="standard-basic" label="command_to_run"
                       value={formProps.values.command_to_run}
                       multiline
                       as={TextField}/>
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
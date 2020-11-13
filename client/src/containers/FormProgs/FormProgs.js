import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {ButtonUpload, Message} from "../../components/index";
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

export default function FormProgs() {
    const classes = useStyles();
    const [message, setMessage] = useState({status: null});

   /* const onSubmit = data => {
        console.log("submit: ", data);
        const formData = new FormData();
        formData.append('data', data);
    };*/
    const handlerSubmit = async (values) => {
        // event.preventDefault();
        console.log("submit: ", values);
        const formData = new FormData();
        formData.append('prog_name', values.prog_name);
        formData.append('fileCode', values.code );
        formData.append('fileMeta', values.meta );
        console.log(formData);
        console.log(values.code );
        // проверить на существование свойства объекта
        console.info( values.code.hasOwnProperty('name'));

        try {
            const res = await axios.post('api/progs/', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            setMessage({status: 200, msg:'Data uploaded'});
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
        initialValues={{prog_name: "", code: "", meta: ""}}
        onSubmit={values => {
            handlerSubmit(values)
        }}
      >
          {(formProps) => (
            <Form className={classes.root}>
                {message ? <Message msg={message}/> : null}
                <Field name="prog_name" id="standard-basic" label="Program name" value={formProps.values.prog_name}
                       as={TextField}/>
                <ButtonUpload
                  name="code"
                  onChange={(event) => formProps.setFieldValue("code", event.target.files[0])}
                  value={formProps.values.code.name}/>
                <ButtonUpload
                  name="meta"
                  onChange={(event) => formProps.setFieldValue("meta", event.target.files[0])}
                  value={formProps.values.meta.name}/>
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
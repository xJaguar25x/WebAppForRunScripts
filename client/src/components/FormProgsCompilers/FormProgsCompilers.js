import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {ButtonUpload} from "../index";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import { Formik } from 'formik';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function FormProgsCompilers(props) {
    const { type, ...other } = props;
    const classes = useStyles();
    const label = type + ' name';

    return (
      <Formik>
          <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" label={label} />
              <ButtonUpload name="code"/>
              <ButtonUpload name="meta"/>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                  Save
              </Button>
          </form>
      </Formik>
    );
}
FormProgsCompilers.propTypes = {
    children: PropTypes.node,
    type: PropTypes.any.isRequired,
};
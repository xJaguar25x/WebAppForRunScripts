import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    //чтобы скрыть стандартный обработчик загрузки файла, убрать коммент ниже
    input: {
        display: 'none',
    },
}));

export default function TextArea(props) {
    const {name, onChange, value, ...rest} = props;
    const classes = useStyles();

    return (
      <div className={classes.root}>
          <label
            className="mdc-text-field
            mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label">
              <span className="mdc-notched-outline">
                <span className="mdc-notched-outline__leading"></span>
                <span className="mdc-notched-outline__trailing"></span>
              </span>
                          <span className="mdc-text-field__resizer">
                <textarea className="mdc-text-field__input" {...props}
                          rows="8" cols="40" aria-label="Label"></textarea>
              </span>
          </label>
      </div>
    );
}
TextArea.propTypes = {
    children: PropTypes.node,
    name: PropTypes.any.isRequired
};
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

export default function ButtonUpload(props) {
    const {name, onChange, value} = props;
    const classes = useStyles();

    return (
      <div className={classes.root}>
          {/*тут высвечивается имя файла, вместо стандартного инпут*/}
          <p>{value}</p>
          <input
            className={classes.input}
            id={name}
            type="file"
            name={name}
            onChange={onChange}
          />
          <label htmlFor={name}>
              <Button variant="contained" color="default" component="span" startIcon={<CloudUploadIcon/>}>
                  {name}
              </Button>
          </label>
      </div>
    );
}
ButtonUpload.propTypes = {
    children: PropTypes.node,
    name: PropTypes.any.isRequired
};
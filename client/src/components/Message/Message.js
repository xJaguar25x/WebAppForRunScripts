import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Message({msg}) {
    const classes = useStyles();
    const checkStatus = () =>{
        if (msg.status === null){
            return null;
        }else if(msg.status === 200){
            return  <Alert severity="success">{msg.msg}</Alert>;
        } else{
            return  <Alert severity="error">{msg.msg}</Alert>;
        }
    };

    return (
      <div className={classes.root}>
          {checkStatus()}
      </div>
    );
}
Message.propTypes = {
    msg: PropTypes.any.isRequired
};
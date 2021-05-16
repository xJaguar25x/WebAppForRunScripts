import React from 'react';
import classes from './LabeledInput.module.scss';

const LabeledInput = props => {
    let className = props.className ? props.className : classes.Input;
    if (props.additionalClass){
        className += (' ' + props.additionalClass);
    }
    // console.log(cls);

    return (
        <div
            className={classes.div}
        >
            <label
                className={classes.label}
            >
                {props.title}
            </label>
            <input
                {...props}
                className={className}
            >
              {props.children}
          </input>
        </div>
    );

};
export default LabeledInput;
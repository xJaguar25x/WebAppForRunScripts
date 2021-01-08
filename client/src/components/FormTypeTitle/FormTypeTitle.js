import React from 'react';
import classes from './FormTypeTitle.module.scss';

const FormTypeTitle = props => {
    let className = props.className ? props.className : classes.FormTypeTitle;
    if (props.active){
        className += (' ' + classes.Active);
    }
    if (props.additionalClass){
        className += (' ' + props.additionalClass);
    }

    return (
        <button
            {...props}
            className={className}
        >
            {props.title}
        </button>
    );

};
export default FormTypeTitle;
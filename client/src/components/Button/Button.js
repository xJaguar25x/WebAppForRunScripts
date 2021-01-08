import React from 'react';
import classes from './Button.module.scss';

const Button = props => {
    const cls = [
        classes.Button,
        classes[props.className]
    ];
    // console.log("props ",props);

    return (
      <button
        {...props}
        className={cls.join(' ')}
        disabled={props.disabled}
      >
          {props.children}
      </button>
    );

};
export default Button;
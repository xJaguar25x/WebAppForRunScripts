// Preloader
import React from 'react';
import classes from './Preloader.module.scss';
/*import styled from 'styled-components';

const StyledPreloader = styled.div`
    width: ${(props)=> props.size && `${props.size}`};
    height: ${(props)=> props.size };
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: rotatePreloader $time + s infinite ease-in;
`;*/
//TODO: доделать возможность изменять размер и цвет через пропсы
function Preloader() {

    return (
      <div className={classes.holder}>
          <div className={classes.preloader}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
    );
}

export default Preloader;
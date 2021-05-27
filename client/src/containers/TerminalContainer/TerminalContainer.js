import React, {Component} from 'react';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import classes from './TerminalContainer.module.scss';
import PropTypes from "prop-types";

const client = new W3CWebSocket('ws://localhost:5000');

export default class TerminalContainer extends Component {
    state = {
        userName: '',
        isLoggedIn: false,
        messages: []
    };
    onButtonClicked = (value) => {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
            user: this.state.userName
        }));
    };

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.send(JSON.stringify(this.props.props));

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            // const dataFromServer = (message.data);
            // console.log('got reply! ', dataFromServer);
            console.log(JSON.parse(message.data));
            // if (dataFromServer.type === "message") {
                this.setState((state) =>
                  ({
                      messages: [...state.messages,
                          {
                              msg: dataFromServer.msg,
                              user: dataFromServer.user
                          }]
                  })
                );
            // }
        };
    }

    render() {
        return (
          <div className={classes.root}>
              {/*<button onClick={() => this.onButtonClicked("hello")}>send message</button>*/}
              <div className={classes.msgContainer}>
                  {this.state.messages.map(message =>
                    <div key={message.msg}>
                        <span>{message.msg}</span>
                    </div>
                  )}
              </div>
          </div>
        );
    }
}
TerminalContainer.propTypes = {
    children: PropTypes.node,
    props: PropTypes.any.isRequired
};
import React, {Component, useState} from 'react';
import {w3cwebsocket as W3CWebSocket} from "websocket";
import classes from './TerminalContainer.module.scss';
import Card from "@material-ui/core/Card";
import ButtonUpload from "../../components/ButtonUpload/ButtonUpload";
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
        this.setState({searchVal: ''})
    };

    componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.send(JSON.stringify({msg: this.props.props}));

        client.onmessage = (message) => {
            // const dataFromServer = JSON.parse(message.data);
            const dataFromServer = (message.data);
            // console.log('got reply! ', dataFromServer);
            console.log(dataFromServer);
            // if (dataFromServer.type === "message") {
                this.setState((state) =>
                  ({
                      messages: [...state.messages,
                          {
                              msg: dataFromServer,
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
              <button onClick={() => this.onButtonClicked("hello")}>send message</button>
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
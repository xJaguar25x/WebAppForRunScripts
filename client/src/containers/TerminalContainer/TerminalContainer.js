import React, {Component} from 'react';
import classes from './TerminalContainer.module.scss';
import PropTypes from "prop-types";

export default class TerminalContainer extends Component {
    state = {
        userName: '',
        isLoggedIn: false,
        messages: []
    };

    sendTask = (state, props) => {
        console.log("props terminal", props);
          props.clientWS.send(JSON.stringify({
              data: props.formData.props,
              type: "userevent",
              user: {
                  name: state.userName,
                  //id: this.state //тутнужно передать user_id
              }
          }));
    };

    componentDidMount() {

        // this.sendTask(this.state, this.props);

      /*  this.props.clientWS.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            // const dataFromServer = (message.data);
            // console.log('got reply! ', dataFromServer);
            console.log(JSON.parse(message.data));

            //фильтрация по типу сообщения для клиента или для агента
            if (dataFromServer.type === "userevent") {
                this.setState((state) =>
                  ({
                      messages: [...state.messages,
                          {
                              msg: dataFromServer.msg,
                              user: dataFromServer.user
                          }]
                  })
                );
            }
        };*/
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
    clientWS: PropTypes.any.isRequired,
    formData: PropTypes.any.isRequired
};
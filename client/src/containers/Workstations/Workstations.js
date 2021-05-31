import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {FormWorkstations, TableWorkstationsFromDB} from "../index";
import axios from "axios";

class Workstations extends Component {
    state = {
        workstations: null,
        message: null,
    };

    componentDidMount() {
        const fetchData = async () => {
            const result = await axios(
              '/api/workstations/',
            );
            this.setState({
                  ...this.state,
                  workstations: result.data
              }
            );
        };
        fetchData();
    }

    /* componentDidUpdate(prevProps) {
         // Популярный пример (не забудьте сравнить пропсы):
         if (this.props.userID !== prevProps.userID) {
             this.fetchData(this.props.userID);
         }
     }*/
    handlerDelete = async (id) => {
        console.log("delete item: ", id);

        try {
            const res = await axios.delete('api/workstations/' + id);
            this.setState(
              prevState => ({
                  ...prevState,
                  workstations: prevState.workstations.filter(ws => ws._id !== id)
              })
            ); //удаление эл-та из state
            this.setState({
                ...this.state,
                message: {status: res.status, msg: res.data.msg, messageFor: "TableWorkstations"}
            });
        } catch (err) {
            this.setState(
              {
                  ...this.state,
                  message: {status: err.response.status, msg: err.response.data.msg, messageFor: "TableWorkstations"}
              }
            );
        }
    };

    handleFormsSubmit = async (values) => {
        // console.log("submit: ", values);
        // console.log(values);

        try {
            const res = await axios.post('api/workstations', values);
            console.log("res post", res);
            this.setState(prevState => ({
                ...prevState,
                workstations: [...prevState.workstations, res.data],
                message: {status: 200, msg: 'Save successful', messageFor: "FormWorkstations"}
            }));
            // console.log("upload data: ", res);
        } catch (err) {
            if (err.response.status === 500) {
                this.setState({
                    ...this.state,
                    message: {status: '500', msg: 'There was a problem with a server', messageFor: "FormWorkstations"}
                });
            } else {
                this.setState({
                    ...this.state,
                    message: {status: err.response.status, msg: err.response.data.msg, messageFor: "FormWorkstations"}
                });
            }
        }
    };

    render() {
        return (
          <Box p={3}>
              <FormWorkstations state={this.state} handleFormsSubmit={this.handleFormsSubmit}/>
              <TableWorkstationsFromDB state={this.state} handlerDelete={this.handlerDelete}/>
          </Box>
        );
    }
}

export default Workstations;
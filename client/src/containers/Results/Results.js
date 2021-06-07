import React, {Component} from "react";
import Box from "@material-ui/core/Box";
import {DataGrid, GridToolbar, GridRowsProp, GridColDef} from '@material-ui/data-grid';
import axios from "axios";

class Results extends Component {
    state = {
        results: {
            rows: [],
            columns: [
                {field: 'col1', headerName: 'Name', width: 150},
                {field: 'col2', headerName: 'Elapsed time', width: 150},
                {field: 'col3', headerName: 'Start time', width: 150},
                {field: 'col4', headerName: 'Creation date', width: 150},
            ],
        },
        message: null,
    };

    componentDidMount() {
        const fetchData = async () => {
            const result = await axios(
              '/api/results/',
            );
            const convertedData = this.prepareRows(result.data);
            this.setState({
                  ...this.state,
                  results: {
                      ...this.state.results,
                      rows: convertedData
                  }
              }
            );
        };
        fetchData();
        // .then(()=> this.prepareRows());
    }

    prepareRows = (data) => {
        const temp = data.map(item => {
            return {
                id: item._id,
                col1: item.name,
                col2: item.elapsed_time,
                col3: item.start_time,
                col4: item.creation_date
            };
        });

        console.log("prepareRows completed ", temp);
        return temp;
    };

    render() {
       /* const rows: GridRowsProp = [
            {id: "60b034b1120cf060f4e38e91", col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World'},
            {id: "60b035333c98316944419ad1", col1: 'XGrid', col2: 'is Awesome', col3: 'Hello', col4: 'World'},
            {id: "60b035f05c66235164d6509d", col1: 'Material-UI', col2: 'is Amazing', col3: 'Hello', col4: 'World'},
        ];
        // let rows2 = this.prepareRows(this.state.results);

        const columns: GridColDef[] = [
            {field: 'col1', headerName: 'Name', width: 150},
            {field: 'col2', headerName: 'Elapsed time', width: 150},
            {field: 'col3', headerName: 'Start time', width: 150},
            {field: 'col4', headerName: 'Creation date', width: 150},
        ];*/

        const {rows, columns} = this.state.results;
        return (
          <Box p={3}>
              <div style={{height: 400, width: '100%'}}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    localeText={{
                        toolbarDensity: 'Size',
                        toolbarDensityLabel: 'Size',
                        toolbarDensityCompact: 'Small',
                        toolbarDensityStandard: 'Medium',
                        toolbarDensityComfortable: 'Large',
                    }}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                  />
              </div>
          </Box>
        );
    }
}

export default Results;
import React, {Component} from "react";
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
// import Button from '@material-ui/core/Button';
// import Divider from '@material-ui/core/Divider';
// import DoneIcon from '@material-ui/icons/Done';
// import Badge from '@material-ui/core/Badge';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {green, orange} from '@material-ui/core/colors';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

const statusTheme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: orange[500],
        },
        // default: {
        //     main: orange[500],
        // }
    },
});

const styles = (theme) => ({
    root: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexGrow: 1,
        flexFlow: "column wrap",
    },
    accordion: {
        width: '100%',
    },
    accordionSummaryContent: {
        alignItems: "center",
        // color: "green",
        // backgroundColor: "green",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '30.33%',
        padding: theme.spacing(0, 1),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    chip: {
        flexBasis: "auto",
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

class TaskMonitor extends Component {
    state = {
        workstations: [
            {
                name: "workstation",
                ip_address: "127.127.123.223",
                count_tasks: 0,
                agent_status: "ready",
                workstation_status: "online",
                color: "default"
            },
            {
                name: "workstation",
                ip_address: "127.127.123.223",
                count_tasks: 0,
                agent_status: "offline",
                workstation_status: "offline",
                color: "default"
            },
            {
                name: "workstation",
                ip_address: "127.127.123.223",
                count_tasks: 1,
                agent_status: "in progress",
                workstation_status: "online",
                color: "default"
            },
        ]
    };

    componentDidMount() {

        this.props.clientWS.onmessage = (message) => {
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
        };
    }

    setStatusColor = () => {
    //TODO: дописать функцию
    };

    render() {
        const {classes, theme, history} = this.props;
        const {workstations} = this.state;
        //TODO:
        return (
          <div className={classes.root}>
              <h3>Monitoring Agents</h3>

              <div className={classes.accordion}>
                  {workstations.map((item, index) => (

                    <Accordion key={index}>
                        <AccordionSummary
                          classes={{content: classes.accordionSummaryContent}}
                          // expandIcon={<ExpandMoreIcon/>}
                          aria-controls="panel1c-content"
                          id="panel1c-header"
                        >
                            <div className={classes.column}>
                                <Typography className={classes.heading}>Name: {item.name}</Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}>{item.ip_address}</Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}>count
                                    tasks: {item.count_tasks}</Typography>
                            </div>
                            {/*<ThemeProvider theme={statusTheme}>*/}
                            <Chip
                              className={clsx(classes.column, classes.chip)}
                              label={item.workstation_status}
                              // onClick={handleClick}
                              onDelete={undefined}
                              // deleteIcon={<DoneIcon/>}
                              variant="outlined"
                              color="default"
                            />
                            {/*</ThemeProvider>*/}
                            {/*//TODO: Посмотреть на возможность добавить компонент прогресса и вставить в свойство deleteIcon, для показа статус выполнения. https://material-ui.com/components/progress/#circular-with-label*/}
                            {/*<Badge className={clsx(classes.column, classes.chip)} badgeContent="" color="primary">*/}
                            {/*   <span>status</span>*/}
                            {/*</Badge>*/}
                        </AccordionSummary>
                        {/* <AccordionDetails className={classes.details}>
                          <div className={classes.column}/>
                          <div className={classes.column}>
                              <Chip label="Barbados" onDelete={() => {
                              }}/>
                          </div>
                          <div className={clsx(classes.column, classes.helper)}>
                              <Typography variant="caption">
                                  Select your destination of choice
                                  <br/>
                                  <a href="#secondary-heading-and-columns" className={classes.link}>
                                      Learn more
                                  </a>
                              </Typography>
                          </div>
                      </AccordionDetails>
                      <Divider/>
                      <AccordionActions>
                          <Button size="small">Cancel</Button>
                          <Button size="small" color="primary">
                              Save
                          </Button>
                      </AccordionActions>*/}
                    </Accordion>
                  ))}
              </div>
          </div>
        );
    }
}
TaskMonitor.propTypes = {
    clientWS: PropTypes.any.isRequired
};
export default withStyles(styles, {withTheme: true})(TaskMonitor);
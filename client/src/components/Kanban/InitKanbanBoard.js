import React, { Component } from 'react';
import './InitKanbanBoard.css'
import Logo from '../resources/icons/logo.png'
import NewProject from '../resources/icons/new-project.png'
import { connect } from 'react-redux';
import { add_newProject } from '../../store/actions/Kanban/projectList';
import Card from "@material-ui/core/Card";
import { Divider, Typography } from '@material-ui/core';
import FiberNewTwoToneIcon from '@material-ui/icons/FiberNewTwoTone';


class InitKanbanBoard extends Component {

    newProjectId = () => {
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let date = today.getDate()
        let hour = today.getHours()
        let min = today.getMinutes()
        let sec = today.getSeconds()

        if (month < 10) {
            month = "0" + month
        }
        if (date < 10) {
            date = "0" + date
        }
        if (hour < 10) {
            hour = "0" + hour
        }
        if (min < 10) {
            min = "0" + min
        }

        return (year + "" + month + "" + date + "" + hour + "" + min + "" + sec + "-" + "1")
    }

    handleClickOpen = () => {
        const newProjectId = this.newProjectId()
        const { dispatch } = this.props;

        dispatch(add_newProject(newProjectId))

    }
    render() {
        return (
            <div>
                <Card className="form" style={{background: "#F9EFED"}}>

                    <div className="form-logo">
                        <img src={Logo} alt="logo" />
                    </div>

                    <div className="form-project">                       
                        <Typography variant='h7'>                        
                            Welcome to your workspace!<br /><br />
                            새 프로젝트를 생성하세요
                            </Typography>
                    </div>
                    <Divider/>
                    <div className="form-new-project">
                        <img style={{ cursor: 'pointer' }} src={NewProject} alt="new-project" onClick={this.handleClickOpen} />
                    </div>

                </Card>

            </div>
        )
    }
}

export default connect()(InitKanbanBoard);
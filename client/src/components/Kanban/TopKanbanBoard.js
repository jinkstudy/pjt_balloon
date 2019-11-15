import React, { Component } from 'react';
import Setting from '../resources/icons/logo-solo.png'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux"
import { change_projectId, add_newProject } from '../../store/actions/Kanban/projectList';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';



const styles = {
    pjtbuttonBox: {

        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        marginTop: 10,
        marginLeft: 20

    },

    topBar: {
        backgroundColor: '#2E6985',
        height: 80
    },

    setting: {
        textAlign: "right",
        paddingTop: 20,
        marginLeft: -40

    },

    settingImg: {
        width: '35px',
        height: '35px',


    },
    button: {
        backgroundColor: '#D15462',
        marginLeft: '20pxs'
    }




}

class TopKanbanBoard extends Component {
    constructor(props) {
        super(props)
        console.log("TopKanbanBoard Constructor =>", props)
    }

    changeProjectId = (e) => {
        const { dispatch } = this.props;
        const project_id = e.target.getAttribute('project_id')
        dispatch(change_projectId(project_id))



    }

    //새로운 프로젝트 생성시 날짜로 ID 만들기.
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





    // Project 있는 경우, Project List 뿌려주기.
    AddProjectList = () => {
        let pjtList;

        const projectList = this.props.pjtList

        if (Object.length.projectList !== 0) {
            console.log(" TopKanbanBoard AddProjectList 호출", typeof projectList, projectList)
        }

        if (this.props.cnt > 0) {

            pjtList = projectList.map(project => {
                return (
                    <div project_id={project.project_id} key={project.project_id} >
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: 'pink', cursor: 'pointer', opacity: 0.7 }} project_id={project.project_id} onClick={this.changeProjectId} >{project.project_name[0]}</Avatar>
                        </ListItemAvatar>
                        {/* {project.project_name} */}
                    </div>
                )


            })
            return pjtList
        }

    }



    render() {
        console.log(">>>>>>>>>>", this.props)

        return (

            <div className="top-form" style={styles.topBar}>

                <div className="top-form-project" >

                    <Grid container >
                        <Grid item xs={12} sm={9} style={styles.pjtbuttonBox} >

                            {this.AddProjectList()}
                            {/* <img style={styles.newpjtbuttom} src={NewProject} alt="new-project" onClick={this.handleClickOpen} /> */}

                            <Avatar style={{ backgroundColor: 'pink', cursor: 'pointer', }} onClick={this.handleClickOpen} ><AddIcon /></Avatar>

                        </Grid>
                        <Grid item xs={12} sm={3} style={styles.setting}>
                            <img src={Setting} alt="setting" style={styles.settingImg} />
                        </Grid>

                    </Grid>


                </div>

            </div>
        )
    }
}

export default connect()(TopKanbanBoard);
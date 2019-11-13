import React, { Component } from 'react';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";

import { connect } from "react-redux"

const styles = {
    projectIcon: {
        backgroundColor: 'pink',
        cursor: 'pointer',
        opacity: '0.7px'
    },
    titleForm: {
        display: 'flex'
    },
    dividerlow: {
        width: '83%',
        marginTop: '5px',
    },
    litItem: {
        display: 'flex',
        flexDirection: 'row',
    },
};

class ListProject extends Component {


    render() {

        console.log("ListProject props", this.props)
        const { projects } = this.props
        return (
            <div className="ListProject" style={styles.listproject}>

                <div style={styles.titleForm}>
                    <Divider style={styles.dividerlow} />
                    <Typography variant="body2" style={styles.signTyp}>
                        프로젝트
                    </Typography>
                </div>
                
                <div style={styles.litItem}>
                {projects !== undefined ? projects.projectlists.map(project =>
                    <ListItemAvatar>
                        <Avatar
                            style={styles.projectIcon}
                            project_id={project.project_id}
                            onClick={this.changeProjectId}
                        >
                            {project.project_name[0]}
                        </Avatar>
                    </ListItemAvatar>
                ) : null}
                </div>
            </ div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects,

})

export default connect(mapStateToProps)(ListProject);
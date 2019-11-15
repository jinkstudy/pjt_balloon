import React, { Component } from 'react';
import ListProject from './ListProject';
import { connect } from "react-redux";

class ProjectInfo extends Component {

    componentDidMount() {
        console.log("ProjectInfo componentDidMount", this.props)
    }

    render() {
        console.log(this.props)

        return (
            <div className="ProjectInfo">
                <ListProject />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.projects,

})

export default connect(mapStateToProps)(ProjectInfo);
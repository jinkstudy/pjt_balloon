import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar'
import KanbanBoard from '../Kanban/KanbanBoard'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
// import LoginForm from '../Members/LoginForm';
import ConfigScreen from '../Configuration/ConfigScreen'
import ChatFull from '../Chat/ChatFull';



class Contents extends Component {

    render() {
        console.log("Contents render==>", this.props.user)
        return (
            <div style={{ minHeight: '100%', display: 'flex' }}>

                {/* <KanbanBoard /> */}
                <Router>
                    < Sidebar user={this.props.user} />

                    <Switch>
                        <Route exact path="/" render={(props) => <KanbanBoard {...props} user={this.props.user} />} />

                        <Route path="/kanban/:userid" render={(props) => <KanbanBoard {...props} user={this.props.user} />} />
                        <Route path="/chat/:userid" render={(props) => <ChatFull {...props} user={this.props.user} />} />
                        <Route path="/config/:userid" render={(props) => <ConfigScreen {...props} user={this.props.user} />} />

                        {/* <Route exact path="/" component={KanbanBoard} /> */}
                        {/* <Route path="/kanban" component={KanbanBoard} /> */}
                        {/* <Route path="/chat/" component={ChatFull} />
                        <Route path="/config/" component={ConfigScreen} /> */}
                    </Switch>


                </Router>

            </div>
        )

    }
}
const mapStateToProps = state => ({
    //member: state.members.member,
})

export default connect(mapStateToProps)(Contents);



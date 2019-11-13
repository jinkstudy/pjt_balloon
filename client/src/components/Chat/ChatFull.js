import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';


import Chatlist from "./Chatlist/Chatlist";
import Chat from "./Chat";

import "./chatfull.css";
import { connect } from "react-redux";
import { get_chatlist } from '../../store/actions/Chat/chatList'

class ChatFull extends Component {

    componentDidMount() {
        console.log("chatfull componentDidMount()", this.props.member)
        this.props.get_chatlist(this.props.user.name)
    }


    render() {

        const { chats, user } = this.props
        console.log("chatfull render props", chats)

        return (
            <Router>
                <div className="chat_outerContainer">

                    <div className="chat_chatlistContainer">
                        <Chatlist chats={chats} user={this.props.user} />
                    </div>
                    {/* <Route exact path='/chat/:userid' component={Chat}  /> */}
                    <Route exact path='/chat/:userid' render={(props) => <Chat {...props} user={user} />} />


                </div>
            </Router>
        );

    }

}

const mapStateToProps = state => ({
    chats: state.chats,
    member: state.members.member
})

const dispatchToProps = (dispatch) => ({

    get_chatlist: (member_id) => {
        dispatch(get_chatlist(member_id))
        console.log("dispatch : get_chatlist =>", member_id)
    },

})






export default connect(mapStateToProps, dispatchToProps)(ChatFull);


import React, { Component } from 'react'
import './App.css'
import LoginForm from './Members/LoginForm'
import Contents from './Contents/Contents'
import { connect } from 'react-redux'
import { checkSession } from '../store/actions/members'


class App extends Component {

  //rendering 후 session 체크
  componentDidMount() {
    const { checkSession } = this.props;
    console.log("App componentDidMount", this.props)
    checkSession()

  }

  render() {
    const { member, user } = this.props;
    //console.log("APP render", member, "session=>", "props", user)
    return (

      <div>
        {user ? <Contents user={user} /> : <LoginForm />}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  member: state.members.member,
  user: state.members.user
})

const dispatchToProps = (dispatch) => ({
  checkSession: () => dispatch(checkSession()),

})

export default connect(mapStateToProps, dispatchToProps)(App) 

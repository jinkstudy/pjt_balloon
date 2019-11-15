import React, { Component } from 'react'
import './App.css'
import LoginForm from './Members/LoginForm'
import Contents from './Contents/Contents'
import { connect } from 'react-redux'
import { setUser, checkSession } from '../store/actions/members'


class App extends Component {


  //11월14일 밤 변경부

  componentDidMount() {
    const { checkSession } = this.props;
    console.log("App componentDidMount", this.props)
    checkSession()

  }

  //11월14일 밤 변경부

  


  render() {
    //console.log("APP render", this.props, this.state)
    const { member, user } = this.props;
    // checkSession()

    console.log("APP render", member, "session=>", "props", user)
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

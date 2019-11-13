import React, { Component } from 'react'
import './App.css'
import LoginForm from './Members/LoginForm'
import Contents from './Contents/Contents'
import { connect } from 'react-redux'
import { setUser, checkSession } from '../store/actions/members'


class App extends Component {


  componentDidMount() {
    const { checkSession } = this.props;
    console.log("App componentDidMount", this.props)
    // checkSession()

  }

  checkClientSession = () => {

    // checkSession()
    //   .then(function (response) {
    //     if (response) {
    //       console.log("^^^^^", response.payload)
    //       this.setState({
    //         user: response.payload
    //       })
    //     }

    //   }.bind(this))
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { checkSession, dispatch } = this.props
    console.log("App shouldComponentUpdate", nextProps)
    if (nextProps.user !== this.props.user) {

      // dispatch(setUser(nextProps.member))
      // checkSession()
      //  dispatch(checkSession)
    }


    return true
  }


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

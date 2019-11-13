import React, { Component } from 'react'
import './App.css'
import LoginForm from './Members/LoginForm'
import Contents from './Contents/Contents'
import { connect } from 'react-redux'
import { setUser, checkSession } from '../store/actions/members'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''

    }
  }


  componentDidMount() {
    console.log("App componentDidMount", this.props, this.state)
    this.checkClientSession()

  }

  checkClientSession = () => {

    checkSession()
      .then(function (response) {
        if (response) {
          console.log("^^^^^", response.payload)
          this.setState({
            user: response.payload
          })
        }

      }.bind(this))
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatch } = this.props
    console.log("App shouldComponentUpdate", nextProps)
    if (nextProps.member !== this.props.member) {

      this.props.dispatch(setUser(nextProps.member))
      this.checkClientSession()
      //  dispatch(checkSession)
    }


    return true
  }


  render() {
    //console.log("APP render", this.props, this.state)
    const { dispatch, member, user } = this.props;
    dispatch(checkSession)
    console.log("APP render", member, "session=>", this.state.user, "props", user)
    return (
      <div>
        {this.state.user ? <Contents user={this.state.user} /> : <LoginForm />}

      </div>

    )
  }
}
const mapStateToProps = state => ({
  member: state.members.member,
  user: state.members.user
})






export default connect(mapStateToProps)(App) 

import React, { Component } from 'react'
import Goo from '../../components/Goo/Goo'
import LoginForm from '../../components/LoginForm/LoginForm'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className='login-page'>
        <h2 className='login-title'>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <Goo />
      </section>
    );
  }
}

export default LoginRoute

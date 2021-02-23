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
        <div className='box-shadow-login' >
          <h2 className='login-title'>Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
        <Goo />
      </section>
    );
  }
}

export default LoginRoute

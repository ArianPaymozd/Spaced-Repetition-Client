import React, { Component } from 'react'
import Goo from '../../components/Goo/Goo'
import LoginForm from '../../components/LoginForm/LoginForm'
import UserContext from '../../contexts/UserContext'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  static contextType = UserContext

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
        {this.context.goo ? <Goo /> : null}
      </section>
    );
  }
}

export default LoginRoute

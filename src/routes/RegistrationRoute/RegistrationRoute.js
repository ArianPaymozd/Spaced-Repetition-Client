import React, { Component } from 'react'
import Goo from '../../components/Goo/Goo'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    return (
      <section className='registration-page'>
        <p className='registration-message'>
          Practice learning a language with the spaced repetition revision technique.
        </p>
        <div className='box-shadow'>
          <h2 className='sign-up'>Sign up</h2>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
        <Goo />
      </section>
    );
  }
}

export default RegistrationRoute

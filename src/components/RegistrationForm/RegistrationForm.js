import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'
import UserContext from '../../contexts/UserContext'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  static contextType = UserContext

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
    .then(() => 
      AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
    )
    .then(res => {
      console.log(res.authToken)
      username.value = ''
      password.value = ''
      this.context.processLogin(res.authToken)
      this.props.onRegistrationSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        onSubmit={this.handleSubmit}
        className='register-form'
      >
        <div className='registration-alert' role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            className='registration-name-input'
            name='name'
            placeholder='Enter Name'
            required
          />
        </div>
        <div>
          <Input
            id='registration-username-input'
            className='registration-username-input'
            name='username'
            placeholder='username'
            required
          />
        </div>
        <div>
          <Input
            id='registration-password-input'
            className='registration-password-input'
            name='password'
            type='password'
            placeholder='password'
            required
          />
        </div>
        <footer className='registration-footer'>
        <Link className='login-link' to='/login'>Already have an account?</Link>
          <Button className='register-button' type='submit'>
            Sign up
          </Button>
          {' '}
        </footer>
      </form>
    )
  }
}

export default RegistrationForm

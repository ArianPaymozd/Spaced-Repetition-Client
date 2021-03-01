import React, { Component } from 'react'
import { Input } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './LoginForm.css'

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        console.log(res.authToken)
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
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
        className='login-form'
        onSubmit={this.handleSubmit}
      >
        <div className='alert' role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Input
            ref={this.firstInput}
            id='login-username-input'
            className='login-username-input'
            name='username'
            placeholder='username'
            required
          />
        </div>
        <div>
          <Input
            id='login-password-input'
            className='login-password-input'
            name='password'
            type='password'
            placeholder='password'
            required
          />
        </div>
        <Button className='login-button' type='submit'>
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm

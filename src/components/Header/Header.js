import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        
        <nav className='nav'>
          <p className='username'>
            {this.context.user.name}
          </p>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
          <button className='animations' onClick={this.context.setGoo}>{`Animations: ${this.context.goo ? 'on' : 'off'}`}</button>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='nav'>
        <Link className='login' to='/login'>Login</Link>
        {' '}
        <Link className='register' to='/register'>Sign up</Link>
        <button className='animations' onClick={this.context.setGoo}>{`Animations: ${this.context.goo ? 'on' : 'off'}`}</button>
      </nav>
    )
  }

  render() {
    return (
      <header className='App_header'>
        <h1 className='title'>
          <Link to='/'>
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header

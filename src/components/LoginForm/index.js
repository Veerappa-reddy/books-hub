import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', errorMsgStatus: false}

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({errorMsg, errorMsgStatus: true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, errorMsgStatus} = this.state

    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/veerappa/image/upload/v1678699167/book%20hub%20image%20resource/login_image_pafard.svg"
          alt="website login"
          className="login-page-image"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.submitLoginDetails}>
            <img
              src="https://res.cloudinary.com/veerappa/image/upload/v1678698519/book%20hub%20image%20resource/Group_ucuuwf.svg"
              alt="login website logo"
              className="login-website-logo"
            />
            <div className="username-container">
              <label htmlFor="username" className="label-text">
                Username*
              </label>
              <input
                type="text"
                id="username"
                onChange={this.onChangeUsername}
                className="input-element"
              />
            </div>
            <div className="password-container">
              <label htmlFor="password" className="label-text">
                Password*
              </label>
              <input
                type="password"
                id="password"
                onChange={this.onChangePassword}
                className="input-element"
              />
              {errorMsgStatus && <p className="error-msg">{errorMsg}</p>}
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

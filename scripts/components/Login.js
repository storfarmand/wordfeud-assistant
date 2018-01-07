import React from 'react';
import * as ButtonActions from '../actions/ButtonActions';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      loginEnabled: false
    }
  }

  componentDidMount() {
    this.login.addEventListener('click', (btn) => {
      ButtonActions.login({user: this.email.value, password: this.password.value});
    });
  }

  componentWillMount() {
  }

  render() {

    return (
      <div class="login">
        <div class="form-element email">
          <label htmlFor="email">Email</label>
          <div className="validation-wrapper">
            <input id="email"
              name="email"
              type="email"
              ref={(input) => {this.email = input}}
              required
              placeholder="example@domain.com"
              tabIndex="1"
            />
            <div className="error"></div>
          </div>
        </div>
        <div class="form-element password">
          <label id="passwordLabel" htmlFor="password">Password</label>
          <div className="validation-wrapper">
            <input id="password"
              name="password"
              type="password"
              ref={(input) => {this.password = input}}
              required
              placeholder="********"
              tabIndex="2"
            />
            <div className="error"></div>
          </div>
        </div>
        <button
          class={[
            "btn"
          ].join(' ')}
          ref={(btn) => {this.login = btn}}
          >Login</button>
      </div>
    );
  }
}

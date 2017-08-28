import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Radium from 'radium';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as loginActions from './login.actions';
import loginStyles from './login.styles';
import { primaryColor } from 'client/globalStyles';
import { ClickFunction, Button } from '../shared/button';
import { User, NewUser } from 'models/user.model';

interface Props {
  user: User | undefined;
  isFetching: boolean;
  error: string;
  login: (requestedUser: NewUser) => Promise<Action>;
}

interface UIState {
  userNameInput: string;
  passwordInput: string;
}

class Login extends React.Component<Props, UIState> {
  constructor() {
    super();
    this.state = {
      userNameInput: '',
      passwordInput: ''
    }
  }

  updateUserName = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      userNameInput: event.currentTarget.value
    });

  updatePassword = (event: React.FormEvent<HTMLInputElement>) =>
    this.setState({
      passwordInput: event.currentTarget.value
    });

  loginButton = (requestedUser: NewUser) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.login(requestedUser)

  render() {
    return (
      <div style={loginStyles.loginContainer}>
        Sign in
        <label>
          User Name
          <input
            type='text'
            value={this.state.userNameInput}
            onChange={this.updateUserName} />
        </label>
        <label>
          Password
          <input
            type='text'
            value={this.state.passwordInput}
            onChange={this.updatePassword} />
        </label>
        <Button
          text={'Sign in'}
          color={'#fff'}
          styles={{
            color: primaryColor,
            border: '1px solid' + primaryColor,
            ':hover': { backgroundColor: '#f1effd' }
          }}
          callback={this.loginButton({
            userName: this.state.userNameInput,
            password: this.state.passwordInput
          })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.login});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  login: (requestedUser: NewUser) => dispatch(loginActions.login(requestedUser)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(Login)));

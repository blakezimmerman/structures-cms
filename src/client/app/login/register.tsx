import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Radium from 'radium';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as loginActions from './login.actions';
import loginStyles from './login.styles';
import { primaryColor } from 'client/globalStyles';
import { Button } from '../shared/button';
import { User, NewUser } from 'models/user.model';

interface Props {
  user: User | undefined;
  isFetching: boolean;
  error: string;
  register: (newUser: NewUser) => Promise<Action>;
}

interface UIState {
  userNameInput: string;
  passwordInput: string;
}

class Register extends React.Component<Props, UIState> {
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

  registerButton = (newUser: NewUser) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.register(newUser)

  render() {
    return (
      <div style={loginStyles.loginContainer}>
        Register
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
            type='password'
            value={this.state.passwordInput}
            onChange={this.updatePassword} />
        </label>
        <Button
          text={'Register'}
          color={'#fff'}
          styles={{
            color: primaryColor,
            border: '1px solid' + primaryColor,
            ':hover': { backgroundColor: '#f1effd' }
          }}
          callback={this.registerButton({
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
  register: (newUser: NewUser) => dispatch(loginActions.register(newUser))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(Register)));

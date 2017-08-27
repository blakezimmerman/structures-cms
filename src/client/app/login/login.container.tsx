import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Radium from 'radium';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as loginActions from './login.actions';
import loginStyles from './login.styles';

interface Props {
  isAuthenticated: boolean
}

class Login extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={loginStyles.appContainer}>
        Login
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.login});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(Login)));

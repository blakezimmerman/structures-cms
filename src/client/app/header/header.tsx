import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Radium from 'radium';
import headerStyles from './header.styles';
import { Action } from '../app.actions';
import { ClickFunction, Button } from '../shared/button';
import { primaryColor } from 'client/globalStyles';
import { History } from 'history';
import { User } from 'models/user.model';
import { logout } from '../login/login.actions';

interface Props {
  history: History,
  user: User,
  logout: () => Promise<Action>;
  children: React.ComponentClass<{}>;
}

const headerButton = (text: string, callback: ClickFunction) =>
  <Button
    text={text}
    color={primaryColor}
    styles={{
      margin: '0.3rem 1rem',
      padding: '0.6rem 0rem',
      border: '1px solid white'
    }}
    callback={callback}
  />

const toLogin = (history: History) => (event: React.MouseEvent<HTMLElement>) =>
  history.push('/login');

const toLogout = (history: History, logout: () => Promise<Action>) =>
  (event: React.MouseEvent<HTMLElement>) => {
    console.log(logout)
    logout();
    history.push('/');
  }

const toAdmin = (history: History) => (event: React.MouseEvent<HTMLElement>) =>
  history.push('/admin');

const Header = (props: Props) =>
  <div style={headerStyles.header}>
    <props.children/>
    <div style={headerStyles.buttonContainer}>
      {props.user
        ? headerButton('Sign out', toLogout(props.history, props.logout))
        : headerButton('Sign in', toLogin(props.history))
      }
      {props.user && props.user.isAdmin
        ? headerButton('Admin', toAdmin(props.history)) : ''
      }
    </div>
  </div>;

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  logout: () => dispatch(logout())
});

export default connect(null, mapDispatchToProps)(Radium(Header));

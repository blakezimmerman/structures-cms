import * as React from 'react';
import * as Radium from 'radium';
import headerStyles from './header.styles';
import { Action } from '../app.actions';
import { ClickFunction, Button } from '../shared/button';
import { primaryColor } from 'client/globalStyles';
import { History } from 'history';

interface Props {
  history: History,
  children: React.ComponentClass<{}>;
}

const headerButton = (text: string, callback: ClickFunction) =>
  <Button
    text={text}
    color={primaryColor}
    styles={{
      margin: '0.3rem 1rem',
      padding: '0.6rem 1rem',
      border: '1px solid white'
    }}
    callback={callback}
  />

const toLogin = (history: History) => (event: React.MouseEvent<HTMLElement>) =>
  history.push('/login');

const toAdmin = (history: History) => (event: React.MouseEvent<HTMLElement>) =>
  history.push('/admin');

const Header = (props: Props) =>
  <div style={headerStyles.header}>
    <props.children/>
    <div style={headerStyles.buttonContainer}>
      {headerButton('Log In', toLogin(props.history))}
      {headerButton('Admin', toAdmin(props.history))}
    </div>
  </div>;

export default Radium(Header);

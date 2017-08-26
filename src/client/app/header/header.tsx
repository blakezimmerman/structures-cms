import * as React from 'react';
import * as Radium from 'radium';
import headerStyles from './header.styles';
import { Action } from '../app.actions';
import { ClickToAction, Button } from '../shared/button';
import { primaryColor } from 'client/globalStyles';

interface Props {
  children: JSX.Element;
}

const headerButton = (text: string) =>//, callback: ClickToAction) =>
  <Button
    text={text}
    color={primaryColor}
    styles={{
      margin: '0.3rem 1rem',
      padding: '0.6rem 1rem',
      border: '1px solid white'
    }}
    //callback={callback}
  />

const Header = (props: Props) =>
  <div style={headerStyles.header}>
    {props.children}
    <div style={headerStyles.buttonContainer}>
      {headerButton('Log In')}
      {headerButton('Admin')}
    </div>
  </div>;

export default Radium(Header);

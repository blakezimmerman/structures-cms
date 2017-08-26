import * as React from 'react';
import * as Radium from 'radium';
import { Action } from '../app.actions';
import { colorLuminance } from 'utils/functions';

type ClickToAction = (event: React.MouseEvent<HTMLElement>) => Action

interface Props {
  id?: string,
  text: string,
  color: string,
  styles?: object,
  callback?: ClickToAction,
  disabled?: boolean
}

const button = (props: Props) => {
  const style = {
    backgroundColor: props.disabled ? '#999999' : props.color,
    color: 'white',
    border: 'none',
    outline: 'none',
    borderRadius: '0.2rem',
    margin: '0.3rem',
    padding: '0.8rem 1.6rem',
    width: '8rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transitionDuration: '0.2s',
    ':hover': { backgroundColor: colorLuminance(props.color, -0.1) }
  };

  return (
    <button
      style={(Object as any).assign(style, props.styles)}
      id={props.id}
      onClick={props.callback}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

const Button = Radium(button);

export { ClickToAction, Button };

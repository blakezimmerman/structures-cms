import { CSSProperties } from 'react';
import { primaryColor } from 'client/globalStyles';

const loginStyles: CSSProperties = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  header: {
    fontSize: '1.3rem',
    fontWeight: '300'
  },

  loginInput: {
    margin: '0.2rem'
  },

  registerLink: {
    margin: '0.2rem'
  }
};

export default loginStyles;

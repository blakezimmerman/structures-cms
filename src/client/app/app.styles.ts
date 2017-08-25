import { CSSProperties } from 'react';
import { primaryColor } from 'client/globalStyles';

const appStyles: CSSProperties = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '7rem',
    margin: '0 0 1rem 0',
    fontWeight: '300',
    color: 'white',
    backgroundColor: primaryColor
  }
};

export default appStyles;

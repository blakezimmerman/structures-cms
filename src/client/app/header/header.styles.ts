import { CSSProperties } from 'react';
import { primaryColor } from 'client/globalStyles';

const headerStyles: CSSProperties = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    height: '7rem',
    fontWeight: '300',
    color: 'white',
    backgroundColor: primaryColor
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default headerStyles;

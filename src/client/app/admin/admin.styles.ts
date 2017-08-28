import { CSSProperties } from 'react';
import { primaryColor } from 'client/globalStyles';

const adminStyles: CSSProperties = {
  adminContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },

  adminButtons: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },

  h1: {
    fontSize: '1.5rem',
    fontWeight: '300',
    width: '100%'
  },

  adminBodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '800px',
    marginTop: '1rem'
  },

  listItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0.5rem 1rem',
    padding: '1rem',
    border: '1px solid ' + primaryColor,
    borderRadius: '5px',
    minWidth: '100%',
    maxWidth: '800px',
  },

  info: {
    margin: '0 1rem'
  },

  actionButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 1rem'
  }
};

export default adminStyles;

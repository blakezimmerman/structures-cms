import { CSSProperties } from 'react';
import { primaryColor } from 'client/globalStyles';

const entriesStyles: CSSProperties = {
  entriesContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '800px'
  },

  entry: {
    display: 'flex',
    margin: '0.5rem 1rem',
    padding: '1rem',
    border: '1px solid ' + primaryColor,
    borderRadius: '5px',
    cursor: 'pointer'
  },

  info: {
    margin: '0 1rem'
  }
};

export default entriesStyles;

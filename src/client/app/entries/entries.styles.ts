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
    justifyContent: 'center',
    margin: '0.5rem 1rem',
    padding: '1rem',
    border: '1px solid ' + primaryColor,
    borderRadius: '5px',
    cursor: 'pointer'
  },

  info: {
    margin: '0 1rem'
  },

  h2: {
    fontSize: '1.3rem',
    fontWeight: '300',
    textAlign: 'center'
  },

  h3: {
    fontSize: '1.1rem',
    fontWeight: '300',
    textAlign: 'center'
  },

  strong: {
    color: primaryColor,
    fontWeight: '400'
  },

  field: {
    margin: '1rem 0'
  },

  commentsContainer: {
    entriesContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },

  comment: {
    display: 'flex',
    margin: '0.5rem 1rem',
    padding: '0.6rem',
    border: '1px solid ' + primaryColor,
    borderRadius: '5px',
  },

  commentText: {
    margin: '0 0.3rem'
  }
};

export default entriesStyles;

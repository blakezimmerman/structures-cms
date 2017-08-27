import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';

const styles = {
  margin: '0 1rem',
  cursor: 'pointer'
};

interface Props {
  history: History;
};

const toHome = (history: History) => (event: React.MouseEvent<HTMLElement>) =>
  history.push('/');

const heading = ({ history }: Props) =>
  <h1
    onClick={toHome(history)}
    style={styles}
  >
    Structures: A Customizable CMS
  </h1>;

export default withRouter(heading) as React.ComponentClass<{}>;

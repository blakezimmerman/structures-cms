import * as React from 'react';
import { connect } from 'react-redux';
import { State } from './app.reducer';

interface Props {

}

const App = (props: Props) => (
  <div>
    Structures: A Customizable CMS
  </div>
);

const mapStateToProps = (state: State) => ({...state.app});

export default connect(mapStateToProps)(App);

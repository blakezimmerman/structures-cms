import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { State } from './app.reducer';
import { Action } from './app.actions';
import * as appActions from './app.actions';
import { Structure } from 'models/structure.model';

interface Props {
  structures: Structure[];
  getStructures: () => Promise<Action>;
}

class App extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getStructures();
  }

  render() {
    return (
      <div>
        Structures: A Customizable CMS
        <div>{this.props.structures.toString()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.app});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStructures: () => dispatch(appActions.getStructures())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

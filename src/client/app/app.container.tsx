import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Radium from 'radium';
import { State } from './app.reducer';
import { Action } from './app.actions';
import * as appActions from './app.actions';
import { Structure } from 'models/structure.model';
import appStyles from './app.styles';
import Header from './header/header';
import AllStructures from './structures/allStructures';

interface Props {
  heading: JSX.Element;
  structs: Structure[];
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
      <div style={appStyles.appContainer}>
        <Header>
          {this.props.heading}
        </Header>
        <AllStructures structs={this.props.structs} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.app});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStructures: () => dispatch(appActions.getStructures())
});

export default connect(mapStateToProps, mapDispatchToProps)(Radium(App));
import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as structActions from './structures.actions';
import { Structure } from 'models/structure.model';
import structureStyles from './structure.styles';
import { fromNullable } from 'utils/functions';

interface Props {
  structs: Structure[];
  getStructures: () => Promise<Action>;
}

class AllStructures extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getStructures();
  }

  render() {
    const structure = (struct: Structure) =>
      <div style={structureStyles.struct} key={struct._id}>
        <div style={structureStyles.info}>{struct.name}</div>
        <div style={structureStyles.info}>{struct.description}</div>
        <div style={structureStyles.info}>
          Entries: {fromNullable(struct.count).fold(
            (e: any) => 'Error',
            (count: number) => count
          )}
        </div>
      </div>;

    return (
      <div style={structureStyles.structsContainer}>
        {fromNullable(this.props.structs)
          .fold((e: any) => "An Error Occured",
                (x: Structure[]) => !x.length ?
                    "Loading" :  x.map(y => structure(y)))
        }
      </div>
    );
  }
}
const mapStateToProps = (state: State) => ({...state.structures});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStructures: () => dispatch(structActions.getStructures())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(AllStructures)));

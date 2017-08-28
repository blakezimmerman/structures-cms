import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as structActions from './structures.actions';
import { Structure } from 'models/structure.model';
import structureStyles from './structure.styles';
import { fromNullable } from 'utils/functions';

interface Props {
  isFetching: boolean;
  structs: Structure[];
  getStructures: () => Promise<Action>;
  history: History;
}

class AllStructures extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getStructures();
  }

  toEntries = (history: History, id: string) =>
    (event: React.MouseEvent<HTMLElement>) => history.push('/' + id);

  render() {
    const structure = (struct: Structure) =>
      <div
        key={struct._id}
        style={structureStyles.struct}
        onClick={this.toEntries(this.props.history, struct._id)}
      >
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
        {this.props.isFetching ? 'Loading' :
          fromNullable(this.props.structs)
            .fold((e: any) => 'An Error Occured',
              (x: Structure[]) => !x.length ?
                'No Structures Yet' :  x.map(y => structure(y)))
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

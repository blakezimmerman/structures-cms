import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route, match } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as entriesActions from './entries.actions';
import { Entry } from 'models/entry.model';
import entriesStyles from './entries.styles';
import { fromNullable } from 'utils/functions';

interface Props {
  isFetching: boolean;
  entries: Entry[];
  getEntries: (struct: string) => Promise<Action>;
  history: History;
  match: match<any>;
}

class AllStructures extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getEntries(this.props.match.params.struct);
  }

  toEntry = (history: History, slug: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      history.push('/' + this.props.match.params.struct + '/' + slug);

  render() {
    const entry = (entry: Entry) =>
    <div
      key={entry._id}
      style={entriesStyles.entry}
      onClick={this.toEntry(this.props.history, entry._id)}
    >
      <div style={entriesStyles.info}>{entry.title}</div>
      <div style={entriesStyles.info}>Created: {entry.dateCreated}</div>
      <div style={entriesStyles.info}>Comments: {entry.comments.length}</div>
    </div>;

    return (
      <div style={entriesStyles.structsContainer}>
        {this.props.isFetching ? "Loading" :
          fromNullable(this.props.entries)
            .fold((e: any) => "An Error Occured",
              (x: Entry[]) => !x.length ?
                "No Entries Yet" :  x.map(y => entry(y)))
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.entries});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getEntries: (struct: string) => dispatch(entriesActions.getEntries(struct))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(AllStructures)));

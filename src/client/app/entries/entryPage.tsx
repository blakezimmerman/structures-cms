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
  history: History;
  match: match<any>;
}

const EntryPage = (props: Props) => {
  const entry: Entry = props.entries.filter(x => x._id === props.match.params.slug)[0];

  return (
    <div>Entry Page for {props.match.params.slug}</div>
  );
};

const mapStateToProps = (state: State) => ({...state.entries});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(EntryPage)));

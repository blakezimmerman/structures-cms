import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route, match } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import adminStyles from './admin.styles';
import { primaryColor } from 'client/globalStyles';
import { ClickFunction, Button } from '../shared/button';
import * as entriesActions from '../entries/entries.actions';
import * as adminActions from '../admin/admin.actions';
import { Entry } from 'models/entry.model';
import { fromNullable } from 'utils/functions';

interface Props {
  isFetching: boolean;
  entries: Entry[];
  getEntries: (struct: string) => Promise<Action>;
  deleteEntry: (id: string, struct: string) => Promise<Action>;
  history: History;
  match: match<any>;
}
class EntriesPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getEntries(this.props.match.params.struct);
  }

  toNew = (event: React.MouseEvent<HTMLElement>) =>
    this.props.history.push('/admin/structures/new/' + this.props.match.params.struct)

  toEdit = (id: string) =>
      (event: React.MouseEvent<HTMLElement>) =>
        this.props.history.push('/admin/structures/edit/'+ this.props.match.params.struct + '/' + id)

  startDeleteEntry = (id: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.deleteEntry(id, this.props.match.params.struct);

  render() {
    const newEntryButton =
      <Button
        text={'New Entry'}
        color={'#fff'}
        callback={this.toNew}
        styles={{
          color: primaryColor,
          minWidth: '60%',
          maxwidth: '800px',
          border: '1px solid' + primaryColor,
          ':hover': { backgroundColor: '#f1effd' }
        }}
      />;

    const entriesButton = (text: string, callback: ClickFunction) =>
      <Button
        text={text}
        color={primaryColor}
        callback={callback}
        styles={{
          margin: '0rem 0.5rem',
          width: '5rem',
          padding: '0.5rem 0rem',
          fontSize: '1rem'
        }}
      />;

    const entry = (entry: Entry) =>
      <div
        key={entry._id}
        style={adminStyles.listItem}
      >
        <div style={adminStyles.info}>{entry.title}</div>
        <div style={adminStyles.info}>{entry.description}</div>
        <div style={adminStyles.actionButtons}>
          {entriesButton('Edit', this.toEdit(entry._id))}
          {entriesButton('Delete', this.startDeleteEntry(entry._id))}
        </div>
      </div>;

    return (
      <div style={adminStyles.adminContainer}>
        {newEntryButton}
        {this.props.isFetching ? 'Loading' :
          fromNullable(this.props.entries)
            .fold((e: any) => 'An Error Occured',
              (x: Entry[]) => !x.length ?
                'No Entries Yet' :  x.map(y => entry(y)))
        }
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.entries});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getEntries: (struct: string) => dispatch(entriesActions.getEntries(struct)),
  deleteEntry: (id: string, struct: string) => dispatch(adminActions.deleteEntry(id, struct))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(EntriesPanel)));

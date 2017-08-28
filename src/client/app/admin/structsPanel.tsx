import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import adminStyles from './admin.styles';
import { primaryColor } from 'client/globalStyles';
import { ClickFunction, Button } from '../shared/button';
import * as structActions from '../structures/structures.actions';
import * as adminActions from '../admin/admin.actions';
import { Structure } from 'models/structure.model';
import { Entry } from 'models/entry.model';
import { fromNullable } from 'utils/functions';

interface Props {
  isFetching: boolean;
  structs: Structure[];
  getStructures: () => Promise<Action>;
  deleteStructure: (id: string) => Promise<Action>;
  history: History;
}
class StructsPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getStructures();
  }

  doNothing = (event: React.MouseEvent<HTMLElement>) => '';

  toNew = (event: React.MouseEvent<HTMLElement>) =>
    this.props.history.push('/admin/structures/new')

  toEntries = (id: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.history.push('/admin/structures/'+ id + '/list')

  toEdit = (id: string) =>
      (event: React.MouseEvent<HTMLElement>) =>
        this.props.history.push('/admin/structures/' + id)

  startDeleteStructure = (id: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.deleteStructure(id);

  render() {
    const newStructButton =
      <Button
        text={'New Structure'}
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

    const structsButton = (text: string, callback: ClickFunction) =>
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

    const structure = (struct: Structure) =>
      <div
        key={struct._id}
        style={adminStyles.listItem}
      >
        <div style={adminStyles.info}>{struct.name}</div>
        <div style={adminStyles.info}>{struct.description}</div>
        <div style={adminStyles.actionButtons}>
          {structsButton('Entries', this.toEntries(struct._id))}
          {structsButton('Edit', this.toEdit(struct._id))}
          {structsButton('Delete', this.startDeleteStructure(struct._id))}
        </div>
      </div>;

    return (
      <div style={adminStyles.adminContainer}>
        {newStructButton}
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
  getStructures: () => dispatch(structActions.getStructures()),
  deleteStructure: (id: string) => dispatch(adminActions.deleteStructure(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(StructsPanel)));

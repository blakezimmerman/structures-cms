import * as React from 'react';
import * as Radium from 'radium';
import { connect, Dispatch } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { History } from 'history';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import adminStyles from './admin.styles';
import { ClickFunction, Button } from '../shared/button';
import * as structActions from '../structures/structures.actions';
import * as entriesActions from '../entries/entries.actions';
import { Structure } from 'models/structure.model';
import { Entry } from 'models/entry.model';
import { fromNullable } from 'utils/functions';
import UsersPanel from './usersPanel';

interface Props {
  isFetching: boolean;
  structs: Structure[];
  entries: Entry[];
  getStructures: () => Promise<Action>;
  getEntries: (struct: string) => Promise<Action>;
  history: History;
}
class AdminPanel extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  toCategory = (category: string) =>
    (event: React.MouseEvent<HTMLElement>) =>
      this.props.history.push('/admin/' + category);

  render() {
    const adminButton = (text:string, color: string, category: string) =>
      <Button
        text={text}
        color={color}
        styles={{
          borderRadius: '0',
          width: '50%',
          margin: '0',
          padding: '0.6rem 0rem',
          fontSize: '1.2rem',
        }}
        callback={this.toCategory(category)}
      />

    return (
      <div style={adminStyles.adminContainer}>
        <div style={adminStyles.adminButtons}>
          {adminButton('Structures', '#6898ee', 'structures')}
          {adminButton('Users', '#be68ee', 'users')}
        </div>
        <div style={adminStyles.adminBodyContainer}>
          <Route exact path='/admin' render={() =>
            <h1 style={adminStyles.h1}>Pick a category above</h1>
          }/>
          <Route exact path='/admin/users' component={UsersPanel}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.structures, ...state.entries});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  getStructures: () => dispatch(structActions.getStructures()),
  getEntries: (struct: string) => dispatch(entriesActions.getEntries(struct))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(AdminPanel)));

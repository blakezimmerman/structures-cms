import * as React from 'react';
import * as Radium from 'radium';
import { withRouter, Route } from 'react-router-dom';
import { History } from 'history';
import adminStyles from './admin.styles';
import { Button } from '../shared/button';
import UsersPanel from './usersPanel';
import StructsPanel from './structsPanel';
import NewStructurePanel from './newStructPanel';
import EntriesPanel from './entriesPanel';
import NewEntryPanel from './newEntryPanel';

interface Props {
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
          <Route exact path='/admin/structures' component={StructsPanel}/>
          <Route exact path='/admin/structures/new' component={NewStructurePanel}/>
          <Route exact path='/admin/structures/edit/:id' component={NewStructurePanel}/>
          <Route exact path='/admin/structures/list/:struct' component={EntriesPanel}/>
          <Route exact path='/admin/structures/new/:struct' component={NewEntryPanel}/>
          <Route exact path='/admin/structures/edit/:id/:struct' component={NewEntryPanel}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Radium(AdminPanel));

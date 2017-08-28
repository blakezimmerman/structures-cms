import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { History } from 'history';
import * as Radium from 'radium';
import { State } from './app.reducer';
import { Action } from './app.actions';
import * as appActions from './app.actions';
import appStyles from './app.styles';
import Header from './header/header';
import AllStructures from './structures/structures.container';
import AllEntries from './entries/entries.container';
import EntryPage from './entries/entryPage';
import Login from './login/login.container';
import Register from './login/register';
import Admin from './admin/admin.container';
import ErrorPage from './shared/error';
import { User } from 'models/user.model';

interface Props {
  history: History;
  heading: React.ComponentClass<{}>;
  user: User;
}

class App extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={appStyles.appContainer}>
        <Header history={this.props.history} user={this.props.user}>
          {this.props.heading}
        </Header>
        <Switch>
          <Route exact path='/' component={AllStructures}/>
          <Route exact path='/register' component={Register}/>
          {this.props.user
            ? <Route exact path='/login' component={AllStructures}/>
            : <Route exact path='/login' component={Login}/>
          }
          {this.props.user && this.props.user.isAdmin
            ? <Route path='/admin' component={Admin}/>
            : <Route path='/admin' component={ErrorPage}/>
          }
          <Route exact path='/:struct' component={AllEntries}/>
          <Route exact path='/:struct/:slug' component={EntryPage}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.app, user: state.login.user});

export default withRouter(connect(mapStateToProps)(Radium(App))) as React.ComponentClass<{}>;

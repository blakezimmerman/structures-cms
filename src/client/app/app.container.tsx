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
import Login from './login/login.container';
import Admin from './admin/admin.container';

interface Props {
  history: History;
  heading: React.ComponentClass<{}>;
}

class App extends React.Component<Props, {}> {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={appStyles.appContainer}>
        <Header history={this.props.history}>
          {this.props.heading}
        </Header>
        <Switch>
          <Route exact path='/' component={AllStructures}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/admin' component={Admin}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({...state.app});

export default withRouter(connect(mapStateToProps)(Radium(App))) as React.ComponentClass<{}>;

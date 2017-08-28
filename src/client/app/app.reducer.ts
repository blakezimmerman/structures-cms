import { Action } from './app.actions';
import { UPDATE_HEADER } from './app.actions';
import heading from './header/heading';
import { StructuresState } from './structures/structures.reducer';
import { EntriesState } from './entries/entries.reducer';
import { LoginState } from './login/login.reducer';
import { AdminState } from './admin/admin.reducer';

export interface State {
  app: AppState;
  structures: StructuresState;
  entries: EntriesState;
  login: LoginState;
  admin: AdminState;
};

export interface AppState {
  heading: React.ComponentClass<{}>;
};

const initialState: AppState = {
  heading: heading
};

const app = (state = initialState, action: Action) => {
  switch (action.type) {
    case UPDATE_HEADER:
      return { ...state, heading: action.payload };
    default:
      return state;
  }
};

export default app;

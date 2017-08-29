import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter, match } from 'react-router-dom';
import { History } from 'history';
import * as Radium from 'radium';
import adminStyles from './admin.styles';
import { State } from '../app.reducer';
import { Action } from '../app.actions';
import * as adminActions from './admin.actions';
import { primaryColor } from 'client/globalStyles';
import { Button } from '../shared/button';
import { Entry } from 'models/entry.model';
import { Structure } from 'models/structure.model';
import { EntryField, FieldType, Field } from 'models/field.model';
import { User } from 'models/user.model';
import * as uuid from 'uuid/v4';

interface Props {
  entries: Entry[];
  structs: Structure[];
  user: User,
  newEntry: (entry: Entry) => Promise<Action>;
  updateEntry: (entry: Entry) => Promise<Action>;
  history: History;
  match: match<any>;
}

interface UIState {
  isNew: boolean;
  struct: Structure;
  titleInput: string;
  descriptionInput: string;
  field1Content: string;
  field2Content: string;
  field3Content: string;
  field4Content: string;
  field5Content: string;
}

class NewEntryPanel extends React.Component<Props, UIState> {
  constructor() {
    super();
    this.state = {
      isNew: true,
      struct: {_id: '', name: '', description: '', fields: []},
      titleInput: '',
      descriptionInput: '',
      field1Content: '',
      field2Content: '',
      field3Content: '',
      field4Content: '',
      field5Content: ''
    }
  }

  componentWillMount() {
    this.setState({
      struct: this.props.structs.filter(x => x._id === this.props.match.params.struct)[0]
    });

    if (this.props.match.params.id) {
      const entry = this.props.entries.filter(x => x._id === this.props.match.params.id)[0];
      this.setState({
        isNew: false,
        titleInput: entry.title,
        descriptionInput: entry.description,
        field1Content: entry.fields[0].payload,
        field2Content: entry.fields[0].payload,
        field3Content: entry.fields[0].payload,
        field4Content: entry.fields[0].payload,
        field5Content: entry.fields[0].payload
      });
    }
  }

  inputHandler = (key: string) => (event: React.FormEvent<HTMLInputElement>) => {
    switch (key) {
      case 'titleInput':
        this.setState({ titleInput: event.currentTarget.value });
        break;
      case 'descriptionInput':
        this.setState({ descriptionInput: event.currentTarget.value });
        break;
        case 'field1Content':
        this.setState({ field1Content: event.currentTarget.value });
        break;
      case 'field2Content':
        this.setState({ field2Content: event.currentTarget.value });
        break;
      case 'field3Content':
        this.setState({ field3Content: event.currentTarget.value });
        break;
      case 'field4Content':
        this.setState({ field4Content: event.currentTarget.value });
        break;
      case 'field5Content':
        this.setState({ field5Content: event.currentTarget.value });
        break;
      default:
        break;
    }
  }

  buildFields = (): EntryField[] => [
    { label: this.state.struct.fields[0].label, payload: this.state.field1Content },
    { label: this.state.struct.fields[1].label, payload: this.state.field2Content },
    { label: this.state.struct.fields[2].label, payload: this.state.field3Content },
    { label: this.state.struct.fields[3].label, payload: this.state.field4Content },
    { label: this.state.struct.fields[4].label, payload: this.state.field5Content },
  ];

  submitButton = (event: React.MouseEvent<HTMLElement>) => {
    const entry: Entry = {
      _id: this.state.isNew ? uuid() : this.props.match.params.id,
      type: this.props.match.params.struct,
      title: this.state.titleInput,
      description: this.state.descriptionInput,
      author: this.props.user,
      dateCreated: new Date (),
      fields: this.buildFields(),
      comments: []
    };
    return (this.state.isNew
      ? this.props.newEntry(entry)
      : this.props.updateEntry(entry)
    );
  }

  render() {
    const textInput = (label: string, value: string, handler: string) =>
      <div style={adminStyles.adminInput}>
        <label>
          {label + ': '}
          <input
            type='text'
            value={value}
            onChange={this.inputHandler(handler)} />
        </label>
      </div>;

    return (
      <div style={adminStyles.adminContainer}>
        {this.state.struct ?
        <div>
          <h2 style={adminStyles.h2}>
            {this.state.isNew ? 'Create a new entry' : 'Edit this entry'}
          </h2>
          {textInput('Title', this.state.titleInput, 'titleInput')}
          {textInput('Description', this.state.descriptionInput, 'descriptionInput')}
          {textInput(this.state.struct.fields[0].label, this.state.field1Content, 'field1Content')}
          {textInput(this.state.struct.fields[1].label, this.state.field2Content, 'field2Content')}
          {textInput(this.state.struct.fields[2].label, this.state.field3Content, 'field3Content')}
          {textInput(this.state.struct.fields[3].label, this.state.field4Content, 'field4Content')}
          {textInput(this.state.struct.fields[4].label, this.state.field5Content, 'field5Content')}
          <Button
            text={this.state.isNew ? 'Create Entry': 'Update Entry'}
            color={'#fff'}
            callback={this.submitButton}
            styles={{
              color: primaryColor,
              minWidth: '100%',
              maxwidth: '800px',
              margin: '0.8rem',
              border: '1px solid' + primaryColor,
              ':hover': { backgroundColor: '#f1effd' }
            }}
          />
        </div> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  entries: state.entries.entries,
  structs: state.structures.structs,
  user: state.login.user
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  newEntry: (entry: Entry) => dispatch(adminActions.newEntry(entry)),
  updateEntry: (entry: Entry) => dispatch(adminActions.updateEntry(entry))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(NewEntryPanel)));

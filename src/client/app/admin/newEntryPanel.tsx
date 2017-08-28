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
import { Structure } from 'models/structure.model';
import { FieldType, Field } from 'models/field.model';
import * as uuid from 'uuid/v4';

interface Props {
  structs: Structure[];
  newStructure: (struct: Structure) => Promise<Action>;
  updateStructure: (struct: Structure) => Promise<Action>;
  history: History;
  match: match<any>;
}

interface UIState {
  isNew: boolean;
  nameInput: string;
  descriptionInput: string;
  field1Label: string;
  field1Type: FieldType;
  field2Label: string;
  field2Type: FieldType;
  field3Label: string;
  field3Type: FieldType;
  field4Label: string;
  field4Type: FieldType;
  field5Label: string;
  field5Type: FieldType;
}

class NewEntryPanel extends React.Component<Props, UIState> {
  constructor() {
    super();
    this.state = {
      isNew: true,
      nameInput: '',
      descriptionInput: '',
      field1Label: '',
      field1Type: FieldType.TextInput,
      field2Label: '',
      field2Type: FieldType.TextInput,
      field3Label: '',
      field3Type: FieldType.TextInput,
      field4Label: '',
      field4Type: FieldType.TextInput,
      field5Label: '',
      field5Type: FieldType.TextInput,
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      const struct = this.props.structs.filter(x => x._id === this.props.match.params.id)[0];
      this.setState({
        isNew: false,
        nameInput: struct.name,
        descriptionInput: struct.description,
        field1Label: struct.fields[0].label,
        field1Type: struct.fields[0].type,
        field2Label: struct.fields[1].label,
        field2Type: struct.fields[1].type,
        field3Label: struct.fields[2].label,
        field3Type: struct.fields[2].type,
        field4Label: struct.fields[3].label,
        field4Type: struct.fields[3].type,
        field5Label: struct.fields[4].label,
        field5Type: struct.fields[4].type,
      });
    }
  }

  inputHandler = (key: string) => (event: React.FormEvent<HTMLInputElement>) => {
    switch (key) {
      case 'nameInput':
        this.setState({ nameInput: event.currentTarget.value });
        break;
      case 'descriptionInput':
        this.setState({ descriptionInput: event.currentTarget.value });
        break;
      case 'field1Label':
        this.setState({ field1Label: event.currentTarget.value });
        break;
      case 'field2Label':
        this.setState({ field2Label: event.currentTarget.value });
        break;
      case 'field3Label':
        this.setState({ field3Label: event.currentTarget.value });
        break;
      case 'field4Label':
        this.setState({ field4Label: event.currentTarget.value });
        break;
      case 'field5Label':
        this.setState({ field5Label: event.currentTarget.value });
        break;
      default:
        break;
    }
  }

  selectHandler = (key: string) => (event: React.FormEvent<HTMLSelectElement>) => {
    switch (key) {
      case 'field1Type':
        this.setState({ field1Type: parseInt(event.currentTarget.value) });
        break;
      case 'field2Type':
        this.setState({ field2Type: parseInt(event.currentTarget.value) });
        break;
      case 'field3Type':
        this.setState({ field3Type: parseInt(event.currentTarget.value) });
        break;
      case 'field4Type':
        this.setState({ field4Type: parseInt(event.currentTarget.value) });
        break;
      case 'field5Type':
        this.setState({ field5Type: parseInt(event.currentTarget.value) });
        break;
      default:
        break;
    }
  }

  buildFields = (): Field[] => [
    { label: this.state.field1Label, type: this.state.field1Type },
    { label: this.state.field2Label, type: this.state.field2Type },
    { label: this.state.field3Label, type: this.state.field3Type },
    { label: this.state.field4Label, type: this.state.field4Type },
    { label: this.state.field5Label, type: this.state.field5Type },
  ];

  submitButton = (event: React.MouseEvent<HTMLElement>) => {
    const struct: Structure = {
      _id: uuid(),
      name: this.state.nameInput,
      description: this.state.descriptionInput,
      fields: this.buildFields()
    };
    return (this.state.isNew
      ? this.props.newStructure(struct)
      : this.props.updateStructure(struct)
    );
  }

  render() {
    const textInput = (label: string, value: string, handler: string) =>
      <div>
        <label>
          {label + ': '}
          <input
            type='text'
            value={value}
            onChange={this.inputHandler(handler)} />
        </label>
      </div>;

    const fieldForm = (num: number, labelValue: string, typeValue: number) =>
      <div>
        {'Field ' + num}
        <label>
          {' Label: '}
          <input
            type='text'
            value={labelValue}
            onChange={this.inputHandler('field' + num + 'Label')} />
        </label>
        <label>
          {' Type: '}
          <select value={typeValue} onChange={this.selectHandler('field' + num + 'Type')}>
            <option value="1">Text Input</option>
            <option value="2">Number</option>
            <option value="3">Checkbox</option>
            <option value="4">Text Area</option>
            <option value="5">Picture</option>
            <option value="6">URL</option>
          </select>
        </label>
      </div>;

    return (
      <div style={adminStyles.adminContainer}>
        {this.state.isNew ? 'Create a new structure' : 'Edit this structure'}
        {textInput('Name', this.state.nameInput, 'nameInput')}
        {textInput('Description', this.state.descriptionInput, 'descriptionInput')}
        {fieldForm(1, this.state.field1Label, this.state.field1Type)}
        {fieldForm(2, this.state.field2Label, this.state.field2Type)}
        {fieldForm(3, this.state.field3Label, this.state.field3Type)}
        {fieldForm(4, this.state.field4Label, this.state.field4Type)}
        {fieldForm(5, this.state.field5Label, this.state.field5Type)}
        <Button
          text={this.state.isNew ? 'Create Structure': 'Update Structure'}
          color={'#fff'}
          callback={this.submitButton}
          styles={{
            color: primaryColor,
            minWidth: '60%',
            maxwidth: '800px',
            border: '1px solid' + primaryColor,
            ':hover': { backgroundColor: '#f1effd' }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({structs: state.structures.structs});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  newStructure: (struct: Structure) => dispatch(adminActions.newStructure(struct)),
  updateStructure: (struct: Structure) => dispatch(adminActions.updateStructure(struct))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Radium(NewEntryPanel)));

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  newStructure: (struct: Structure) => Promise<Action>;
  history: History;
}

interface UIState {
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

class NewStructurePanel extends React.Component<Props, UIState> {
  constructor() {
    super();
    this.state = {
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

  createButton = (event: React.MouseEvent<HTMLElement>) => {
    const struct: Structure = {
      _id: uuid(),
      name: this.state.nameInput,
      description: this.state.descriptionInput,
      fields: this.buildFields()
    };
    return this.props.newStructure(struct);
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
        Create a new structure
        {textInput('Name', this.state.nameInput, 'nameInput')}
        {textInput('Description', this.state.descriptionInput, 'descriptionInput')}
        {fieldForm(1, this.state.field1Label, this.state.field1Type)}
        {fieldForm(2, this.state.field2Label, this.state.field2Type)}
        {fieldForm(3, this.state.field3Label, this.state.field3Type)}
        {fieldForm(4, this.state.field4Label, this.state.field4Type)}
        {fieldForm(5, this.state.field5Label, this.state.field5Type)}
        <Button
          text={'Create Structure'}
          color={'#fff'}
          callback={this.createButton}
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  newStructure: (struct: Structure) => dispatch(adminActions.newStructure(struct))
});

export default withRouter(connect(null, mapDispatchToProps)(Radium(NewStructurePanel)));

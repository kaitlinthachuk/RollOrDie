import React, { Component } from 'react';
import RangePicker from './RangePicker';

// styles
import '../styles/AddPlayerForm.scss';

class AddPlayerForm extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      validationHint: "",
      validationError: false,
      name: '',
    }
  }

  handleChange({ target }) {
    const { name } = this.state;
    if (name.length > target.value.length || target.value.match(/\w+/g)) {
      this.setState({ [target.name]: target.value });
    }
  }

  onFormSubmit(event){
    let { target }                          = event,
        { onPlayerAdd }                     = this.props,
        { validationError, validationHint } = this.state;

    event.preventDefault();

    let playerName = target.name.value,
        ac         = parseInt(target.ac.value),
        init       = target.init.value,
        newPlayer  = {};

    validationError = false;
    validationHint  = "";

    target.init.value = "";
    target.name.value = "";
    
    if (playerName.match(/\w+/g)) {
      newPlayer.name = playerName.trim();
    } else {
      validationError = true;
      validationHint  += "Name cannot be empty. "
    }

    if (!init) {
      validationError = true;
      validationHint  += "Initiative cannot be empty. "
    }

    this.setState(newPlayer);

    if (validationError) {
      this.setState({
        validationError: validationError,
        validationHint : validationHint,
      })
    } else {
      onPlayerAdd({
        name: newPlayer.name,
        ac: ac,
        initiative: init,
      });
    }
  }

  render() {
    let { validationError, validationHint } = this.state;
    let { cancelButton, onCancel } = this.props;
    return (
      <form className="add-player-form" onSubmit={this.onFormSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Bilbo Baggins..."
          onChange={this.handleChange}
          />
        <label><i className='ac-icon'></i>{'(Armor Class)'}</label>
        <RangePicker
          id={'ac-picker'}
          min={10}
          max={20}
          buttonName={'ac'} />
        <label><i className='init-icon'></i>{'(Initiative)'}</label>
        <input
         type = "number"
         id={'init-picker'}
         name={'init'}/>
        { validationError ? <div className='validation-hint'>{validationHint}</div> : null }
        <button>Add Player</button>
        { cancelButton ?
          <button onClick={onCancel}>Cancel</button> :
          null }
      </form>
    );
  }
}

export default AddPlayerForm;

import React, { Component } from 'react';
 
class AddPlayerForm extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      validationHint: "",
      validationError: false,
      name: null,
      ac: null,
      initiative: null,
    }
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  onFormSubmit(event){
    let { target }                          = event,
        { onPlayerAdd }                     = this.props,
        { validationError, validationHint } = this.state;

    event.preventDefault();
    
    let playerName = target.name.value,
        ac         = target.ac.value,
        init       = target.initiative.value,
        newPlayer  = {};

    validationError = false;
    validationHint  = "";

    if (playerName.length > 0) {
      target.name.value = "";
      newPlayer.name = playerName;
    } else {
      validationError = true;
      validationHint  += "Name cannot be empty. "
    }

    if (ac >= 10 && ac < 25) {
      target.ac.value = "";
      newPlayer.ac = ac;
    } else {
      validationError  = true;
      validationHint  += "Armor class must be between 10 and 25. "
    }

    if (init > 0) {
      target.initiative.value = "";
      newPlayer.initiative = init;
    } else {
      validationError = true;
      validationHint += "Initiative cannot be negative."
    }

    this.setState(newPlayer);

    if (validationError) {
      this.setState({
        validationError: validationError,
        validationHint : validationHint,
      })
    } else {
      this.setState({
        name      : null,
        ac        : null,
        initiative: null,
      });
      onPlayerAdd(newPlayer);
    }
  }

  render() {
    let { validationError, validationHint, name, ac, initiative } = this.state;
    let { cancelButton, onCancel } = this.props;
    return (
      <form className="add-player-form" onSubmit={this.onFormSubmit}>
        <input type =  "text"  name = "name"       placeholder = "Bilbo Baggins..." value={name} onChange={this.handleChange}/>
        <input type = "number" name = "ac"         placeholder= "18..." value={ac} onChange={this.handleChange}/>
        <input type = "number" name = "initiative" placeholder = "1..." value={initiative} onChange={this.handleChange}/>
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
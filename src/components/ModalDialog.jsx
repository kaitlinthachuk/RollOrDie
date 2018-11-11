import React, {Component} from 'react';

// styles
import '../styles/ModalDialog.scss';

class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const { show } = this.props;
    if (show) {
      document.addEventListener("keydown", this.handleKeyDown, false);
      return (
      <div className='modal-dialog'>
        <div className='children-wrapper'>
          {this.props.children}
        </div>
      </div>
      )
    } else {
      document.removeEventListener("keydown", this.handleKeyDown, false);
      return null;
    }
  }

  handleKeyDown(event){
    const { onEsc } = this.props;
    if (onEsc && event.keyCode === 27) {
      onEsc();
    }
  }
}

export default ModalDialog;
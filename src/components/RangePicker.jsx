import React, { PureComponent } from 'react';

//styles
import '../styles/RangePicker.scss';

class RangePicker extends PureComponent {
  render() {
    const { id, min, max, buttonName } = this.props;
    let options = [];
    for(let i = min; i <= max; i++) {
      options.push(
        <label>
          <input type='radio' checked={ i === min ? 'checked' : ''} name={buttonName} value={i}/>
          <span className='radio-btn'>
          </span>
        { '' + i } 
      </label>
      );
    }
    return (
      <div className='range-picker' id={id}>
        { options }
      </div>
    );
  }
}

export default RangePicker;
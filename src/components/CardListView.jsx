import React, { Component } from 'react';

//styles
import '../styles/CardListView.scss';

class CardListView extends Component {

  render() {
    return (
      <ul className='card-list-view'>
        {
          this.buildList()
        }
      </ul>
    );
  }
  
  buildList() {
    const { listItems, className, render } = this.props;
    return (
      listItems.map((listItem) => {
        return (
          <li 
            className={`list-view-card ${className}`} onClick={(event) => this.onClick(listItem, event)}>
            <div 
              className='delete-icon'
              onClick={(event) => this.onDelete(listItem, event)}>
              X
            </div>
            { render(listItem) }
          </li>
        );
      })
    );
  }

  onClick(listItem, event) {
    const { onCardClick } = this.props;
    event.preventDefault();
    event.stopPropagation();

    onCardClick(listItem);
  }

  onDelete(listItem, event) {
    const { onCardDelete } = this.props;
    event.preventDefault();
    event.stopPropagation();

    onCardDelete(listItem);
  }
}



export default CardListView;
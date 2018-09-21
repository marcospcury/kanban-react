import React, { Component } from 'react';
import KanbanCard from './kanban-card';
import { enterPressedHandler } from '../utils/key-pressed-handler';

export default class KanbanColumn extends Component {

  changeTitle() {
    this.props.finishEditing('column', this.props.column.id, this.title.value);
  }

  render() {
    const { id, edit, title, cards } = this.props.column;
    const { addCard, removeCard, startEditing } = this.props;
    const keyPress = enterPressedHandler.bind(null, this.changeTitle.bind(this));
    const columnTitle = edit ?
      <input type="text" defaultValue={title} autoFocus onKeyPress={keyPress} onBlur={this.changeTitle.bind(this)} ref={(input) => this.title = input} /> :
      <span onClick={startEditing.bind(null, 'column', id)}>{title}</span>;

    return (
      <div className="kanban-column">
        <header>
          {columnTitle}
          <button className="kanban-btn-column-options">...</button></header>
        <div className="kanban-card-container">
          {cards.map(card => {
            return <KanbanCard key={card.id} card={card} removeCard={removeCard.bind(null, id)} />
          })}
        </div>
        <button className="kanban-btn-add-card" onClick={addCard.bind(null, id)}>Add new card</button>
      </div>
    );
  }
}
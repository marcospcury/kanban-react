import React, { Component } from 'react';
import KanbanCard from './kanban-card';
import { enterPressedHandler } from '../utils/key-pressed-handler';

export default class KanbanColumn extends Component {

  changeTitle() {
    this.props.finishEditing('column', this.props.column.id, null, this.title.value);
  }

  render() {
    const { id, edit, title, cards } = this.props.column;
    const { addCard, removeCard, startEditing, dragOver, drop, dragStart, dragEnter, dragLeave, dragEnd, finishEditing } = this.props;
    const keyPress = enterPressedHandler.bind(null, this.changeTitle.bind(this));
    const columnTitle = edit ?
      <input type="text"
        defaultValue={title}
        autoFocus
        onKeyPress={keyPress}
        onBlur={this.changeTitle.bind(this)}
        ref={(input) => this.title = input} /> :
      <span onClick={startEditing.bind(null, 'column', id)}>{title}</span>;

    return (
      <div className="kanban-column" onDragOver={e => dragOver(e)} onDrop={e => drop(id, e)} onDragEnter={e => dragEnter(e)} onDragLeave={e => dragLeave(e)} onDragEnd={e => dragEnd(e)}>
        <header>
          {columnTitle}
          <button className="kanban-btn-column-options">...</button></header>
        <div className="kanban-card-container">
          {cards.map(card => {
            return <KanbanCard
              key={card.id} card={card}
              removeCard={removeCard.bind(null, id)}
              dragStart={dragStart.bind(null, id)}
              finishEditing={finishEditing.bind(null, 'card', id)}
              startEditing={startEditing.bind(null, 'card', id)} />
          })}
        </div>
        <button className="kanban-btn-add-card" onClick={addCard.bind(null, id)}>Add new card</button>
      </div>
    );
  }
}
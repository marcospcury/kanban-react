import React, { Component } from 'react';
import KanbanCard from './kanban-card';
import { enterPressedHandler } from '../utils/key-pressed-handler';

export default class KanbanColumn extends Component {

  changeTitle() {
    this.props.finishEditing('column', this.props.column.id, null, this.title.value);
  }

  dragOver(event) {
    event.dataTransfer.dropEffect = 'move';
    event.preventDefault();
  }

  dragEnter(event) {
    event.target.classList.add('over');
  }

  dragLeave(event) {
    event.target.classList.remove('over');
  }

  dragEnd(event) {
    event.target.classList.remove('over');
  }

  render() {
    const { id, edit, title, cards } = this.props.column;
    const { addCard, removeCard, startEditing, dropCard, dragStart, finishEditing } = this.props;
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
      <div className="kanban-column"
        onDragOver={e => this.dragOver(e)}
        onDrop={e => dropCard(id, e)}
        onDragEnter={e => this.dragEnter(e)}
        onDragLeave={e => this.dragLeave(e)}
        onDragEnd={e => this.dragEnd(e)}>
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
import React, { Component } from 'react';
import KanbanCard from './kanban-card';

export default class KanbanColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.column.edit,
      title: this.props.column.title
    };
  }

  editTitle() {
    this.setState({ editing: true });
  }

  titleChanged(event) {
    this.setState({ title: event.target.value });
  }

  titleEdited(event) {
    if (this.state.title.trim() === '') {
      this.props.removeColumn(this.props.column.id);
    }
    this.setState({ editing: false });
  }

  keyPressed(event) {
    if (event.key === 'Enter') {
      this.titleEdited();
    }
  }

  render() {
    const columnTitle = this.state.editing ?
      <input type="text" value={this.state.title} autoFocus onChange={this.titleChanged.bind(this)} onBlur={this.titleEdited.bind(this)} onKeyPress={this.keyPressed.bind(this)} /> :
      <span onClick={this.editTitle.bind(this)}>{this.state.title}</span>;

    return (
      <div className="kanban-column">
        <header>
          {columnTitle}
          <button className="kanban-btn-column-options">...</button></header>
        <div className="kanban-card-container">
          {this.props.column.cards.map(card => {
            return <KanbanCard key={card.id} card={card} removeCard={this.props.removeCard.bind(null, this.props.column.id)} />
          })}
        </div>
        <button className="kanban-btn-add-card" onClick={this.props.addCard.bind(null, this.props.column.id)}>Add new card</button>
      </div>
    );
  }
}
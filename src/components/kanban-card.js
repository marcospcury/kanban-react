import React, { Component } from 'react';

export default class KanbanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.card.edit,
      title: this.props.card.title
    };
  }

  editTitle() {
    this.setState({ editing: true });
  }

  titleChanged(event) {
    this.setState({ title: event.target.value });
  }

  titleEdited(event) {
    this.setState({ editing: false });
  }

  keyPressed(event) {
    if (event.key === 'Enter') {
      this.titleEdited();
    }
  }

  render() {
    let cardTitle;
    if (this.state.editing) {
      cardTitle = (<div className="kanban-card edit">
        <textarea value={this.state.title} autoFocus onChange={this.titleChanged.bind(this)} onBlur={this.titleEdited.bind(this)} onKeyPress={this.keyPressed.bind(this)} />
      </div>);
    } else {
      cardTitle = <div className="kanban-card" onClick={this.editTitle.bind(this)} draggable="true">{this.state.title}</div>
    }
    return (
      <div>
        {cardTitle}
      </div>
    );
  }
}
import React, { Component } from 'react';
import { enterPressedHandler } from '../utils/key-pressed-handler';

export default class KanbanCard extends Component {

  changeTitle() {
    this.props.finishEditing(this.props.card.id, this.title.value);
  }

  dragStart(event) {
    this.props.dragStart(this.props.card.id, event);
  }

  render() {
    const { id, title, edit } = this.props.card;
    const { dragStart, startEditing } = this.props;
    const keyPress = enterPressedHandler.bind(null, this.changeTitle.bind(this));
    let cardTitle;
    if (edit) {
      cardTitle = (<div className="kanban-card edit">
        <textarea
          autoFocus
          defaultValue={title}
          onBlur={this.changeTitle.bind(this)}
          onKeyPress={keyPress}
          ref={(text) => this.title = text} />
      </div>);
    } else {
      cardTitle = <div className="kanban-card" onClick={e => startEditing(id)} draggable="true">{title}</div>
    }
    return (
      <div onDragStart={e => dragStart(id, e)}>
        {cardTitle}
      </div>
    );
  }
}
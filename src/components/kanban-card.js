import React, { Component } from 'react';

export default class KanbanCard extends Component {
  render() {
    return (
      <div>
        <div className="kanban-card" draggable="true">
          Tarefa 1
			    </div>
        <div className="kanban-card edit">
          <textarea></textarea>
        </div>
      </div>
    );
  }
}
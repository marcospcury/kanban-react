import React, { Component } from 'react';
import KanbanCard from './kanban-card';

export default class KanbanColumn extends Component {
  render() {
    return (
      <div className="kanban-column">
        <header><span>Backlog</span><button className="kanban-btn-column-options">...</button></header>
        <div className="kanban-card-container">
          <KanbanCard />
        </div>
        <button className="kanban-btn-add-card">Add new card</button>
      </div>
    );
  }
}
import React, { Component } from 'react';
import './App.css';
import KanbanColumn from './components/kanban-column';

class App extends Component {
  render() {
    return (
      <main>
        <KanbanColumn />
        <button className="kanban-btn-add-column">Add new column</button>
      </main>
    );
  }
}

export default App;

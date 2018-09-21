import React, { Component } from 'react';
import './App.css';
import KanbanColumn from './components/kanban-column';
import guid from './utils/guid';

class App extends Component {
  constructor() {
    super();
    this.state = { columns: [] };
  }

  addColumn() {
    const columns = this.state.columns;
    columns.push({
      id: guid(),
      name: '',
      edit: true,
      cards: []
    });
    this.setState({ columns });
  }

  addCard(columnId) {
    const { columns } = this.state;
    const column = columns.find(c => c.id === columnId);
    column.cards.push({
      id: guid(),
      name: '',
      edit: true
    });
    this.setState({ columns });
  }

  removeCard(columnId, cardId) {
    const { columns } = this.state;
    const column = columns.find(c => c.id === columnId);
    const cardIndex = column.cards.findIndex(c => c.id === cardId);
    column.cards.splice(cardIndex, 1);
    this.setState({ columns });
  }

  removeColumn(columnId) {
    const { columns } = this.state;
    const columnIndex = columns.findIndex(c => c.id === columnId);
    columns.splice(columnIndex, 1);
    this.setState({ columns });
  }

  render() {
    return (
      <main>
        {this.state.columns.map(column => {
          return <KanbanColumn key={column.id} column={column} addCard={this.addCard.bind(this)} removeCard={this.removeCard.bind(this)} removeColumn={this.removeColumn.bind(this)} />
        })}

        <button className="kanban-btn-add-column" onClick={this.addColumn.bind(this)}>Add new column</button>
      </main>
    );
  }
}

export default App;

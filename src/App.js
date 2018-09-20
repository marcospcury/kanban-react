import React, { Component } from 'react';
import './App.css';
import KanbanColumn from './components/kanban-column';

class App extends Component {
  constructor() {
    super();
    this.state = {
      columns: [
        {
          id: 1,
          title: 'Backlog',
          edit: false,
          cards: [
            {
              id: 1,
              title: 'Tarefa 1',
              edit: false
            }
          ]
        }
      ]
    };
  }

  addColumn() {
    const columns = this.state.columns;
    columns.push({
      id: columns.length + 1,
      name: '',
      edit: true,
      cards: []
    });
    this.setState({ columns });
  }

  addCard(columnId) {
    const columns = this.state.columns;
    const column = columns.find(c => c.id === columnId);
    column.cards.push({
      id: column.cards.length + 1,
      name: '',
      edit: true
    });
    this.setState({ columns });
  }

  render() {
    return (
      <main>
        {this.state.columns.map(column => {
          return <KanbanColumn key={column.id} column={column} addCard={this.addCard.bind(this)} />
        })}

        <button className="kanban-btn-add-column" onClick={this.addColumn.bind(this)}>Add new column</button>
      </main>
    );
  }
}

export default App;

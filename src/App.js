import React, { Component } from 'react';
import './App.css';
import KanbanColumn from './components/kanban-column';
import guid from './utils/guid';

class App extends Component {
  constructor() {
    super();
    this.state = { columns: [] };
    this.getObject = {
      'column': (columns, id) => {
        const column = columns.find(c => c.id === id);
        return column;
      },
      'card': (columns, columnId, cardId) => {
        const column = columns.find(c => c.id === columnId);
        const card = column.cards.find(c => c.id === cardId);
        return card;
      }
    };
  }

  getColumnsState() {
    const { columns } = this.state;
    return columns;
  }

  setColumnsState(columns) {
    this.setState({ columns });
  }

  setEdit(object) {
    object.edit = true;
  }

  setTitle(value, object) {
    object.edit = false;
    object.title = value;
  }

  addColumn() {
    const columns = this.getColumnsState();
    columns.push({
      id: guid(),
      name: '',
      edit: true,
      cards: []
    });
    this.setColumnsState(columns);
  }

  addCard(columnId) {
    const columns = this.getColumnsState();
    const column = this.getObject['column'](columns, columnId);
    column.cards.push({
      id: guid(),
      name: '',
      edit: true
    });
    this.setColumnsState(columns);
  }

  startEditing(objectType, columnId, cardId) {
    const columns = this.getColumnsState();
    const object = this.getObject[objectType](columns, columnId, cardId);
    this.setEdit(object);
    this.setColumnsState(columns);
  }

  finishEditing(objectType, columnId, cardId, value) {
    const columns = this.getColumnsState();
    const object = this.getObject[objectType](columns, columnId, cardId);
    this.setTitle(value, object);
    this.setColumnsState(columns);
  }

  removeCard(columnId, cardId) {
    const { columns } = this.state;
    const column = columns.find(c => c.id === columnId);
    const cardIndex = column.cards.findIndex(c => c.id === cardId);
    column.cards.splice(cardIndex, 1);
    this.setColumnsState(columns);
  }

  removeColumn(columnId) {
    const { columns } = this.state;
    const columnIndex = columns.findIndex(c => c.id === columnId);
    columns.splice(columnIndex, 1);
    this.setColumnsState(columns);
  }

  dragStart(columnId, cardId, event) {
    event.dataTransfer.setData('column-origin', columnId);
    event.dataTransfer.setData('card', cardId);
  }

  dropCard(destiny, event) {
    event.target.classList.remove('over');
    const origin = event.dataTransfer.getData('column-origin');

    if (origin !== destiny) {
      const card = event.dataTransfer.getData('card');

      const columns = this.getColumnsState();
      const originColumn = this.getObject['column'](columns, origin);
      const destinyColumn = this.getObject['column'](columns, destiny);

      const cardObject = this.getObject['card'](columns, origin, card);
      const cardIndex = originColumn.cards.findIndex(c => c.id === card);

      originColumn.cards.splice(cardIndex, 1);
      destinyColumn.cards.push(cardObject);
      this.setColumnsState(columns);
    }
  }

  render() {
    return (
      <main>
        {this.state.columns.map(column => {
          return <KanbanColumn
            key={column.id}
            column={column}
            addCard={this.addCard.bind(this)}
            removeCard={this.removeCard.bind(this)}
            removeColumn={this.removeColumn.bind(this)}
            startEditing={this.startEditing.bind(this)}
            finishEditing={this.finishEditing.bind(this)}
            dragStart={this.dragStart.bind(this)}
            dropCard={this.dropCard.bind(this)} />
        })}

        <button className="kanban-btn-add-column" onClick={this.addColumn.bind(this)}>Add new column</button>
      </main>
    );
  }
}

export default App;

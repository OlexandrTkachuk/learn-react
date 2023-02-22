import { Component } from 'react';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { Counter } from './Counter/Counter';
import { Dropdown } from './Dropdown/Dropdown';
import { TodoList } from './TodoList/TodoList';

const colorPickerOptions = [
  { label: 'red', color: '#f44336' },
  { label: 'green', color: '#4caf50' },
  { label: 'blue', color: '#2196f3' },
];

const todos = [
  { id: 'id-1', text: 'Виучить основи React', completed: false },
  { id: 'id-2', text: 'Розобраться с React Router', completed: false },
  { id: 'id-3', text: 'Пережить Redux', completed: true },
];

export class App extends Component {
  state = {
    todos: todos,
  };

  deleteToto = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;
    const completed = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );

    return (
      <>
        <h1>Состояние компонента</h1>

        {/* <Counter initialValue={10} /> */}
        {/* <Dropdown /> */}
        {/* <ColorPicker options={colorPickerOptions} /> */}

        <div>
          <span>Общее кол-во: {todos.length}</span>
          <p>Кол-во виполнених: {completed}</p>
        </div>
        <TodoList todos={todos} onDelete={this.deleteToto} />
      </>
    );
  }
}

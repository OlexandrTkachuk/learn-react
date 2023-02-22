import { Component } from 'react';

export class Dropdown extends Component {
  state = {
    visible: false,
  };

  toggle = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggle}>
          {this.state.visible ? 'Скрить' : 'Показать'}
        </button>

        {this.state.visible && <div>Випадающее меню</div>}
      </div>
    );
  }
}

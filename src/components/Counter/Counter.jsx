import { Component } from 'react';
import { Controls } from './Controls';
import { Title } from './Title';
import PropTypes from 'prop-types';

export class Counter extends Component {
  static defaultProps = {
    initialValue: 0,
  };

  static propTypes = {
    initialValue: PropTypes.number.isRequired,
  };

  state = {
    value: this.props.initialValue,
  };

  handleChange = event => {
    const name = event.currentTarget.name;

    if (name === 'increment') {
      this.setState(prevState => ({
        value: prevState.value + 1,
      }));
    } else if (name === 'decrement') {
      this.setState(prevState => ({
        value: prevState.value - 1,
      }));
    }
  };

  render() {
    return (
      <div>
        <Title value={this.state.value} />
        <Controls onChangeValue={this.handleChange} />
      </div>
    );
  }
}

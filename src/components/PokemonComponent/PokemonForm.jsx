import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

export class PokemonForm extends Component {
  state = {
    pokemonName: '',
  };

  handleNameChange = event => {
    this.setState({ pokemonName: event.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { pokemonName } = this.state;

    if (pokemonName.trim() === '') {
      toast.error("Введіть ім'я покемона");
      return;
    } // перевірка, яка не дозволить нам відправити пусту строку
    // trim() обрізає пробіли

    this.props.onSubmit(pokemonName);
    // прокидує значення в App, де ми його сетстейтим

    this.reset(); // ресетить поле інпут
  };

  reset = () => {
    this.setState({ pokemonName: '' });
  };

  render() {
    const { pokemonName } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="pokemonName"
          value={pokemonName}
          onChange={this.handleNameChange}
        />
        <button type="submit">
          <ImSearch style={{ marginRight: 8 }} />
          Найти
        </button>
      </form>
    );
  }
}

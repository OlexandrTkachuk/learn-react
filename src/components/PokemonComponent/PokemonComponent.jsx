import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PokemonForm } from './PokemonForm';
import { PokemonInfo } from './PokemonInfo';

export class PokemonComponent extends Component {
  state = {
    pokemonName: '',
  };

  handleSubmit = pokemon => {
    this.setState({ pokemonName: pokemon });
  };

  render() {
    const { pokemonName } = this.state;

    return (
      <div style={{ margin: '0 auto', padding: '100px', maxWidth: 1170 }}>
        <PokemonForm onSubmit={this.handleSubmit} />
        <PokemonInfo pokemonName={pokemonName} />
        <ToastContainer />
      </div>
    );
  }
}

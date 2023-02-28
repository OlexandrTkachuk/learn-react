import { Component } from 'react';
import { PokemonDataView } from './PokemonDataView';
import { PokemonErrorView } from './PokemonErrorView';
import { PokemonPendingView } from './PokemonPendingView';
import { fetchPokemon } from 'services/pokemon-api';

export class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const prevName = prevProps.pokemonName;
    const currentName = this.props.pokemonName;

    if (prevName !== currentName) {
      this.setState({ status: 'pending' });

      fetchPokemon(currentName)
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  };

  render() {
    const { pokemon, error, status } = this.state;

    if (status === 'idle') {
      return <div>Введіть ім'я покемона</div>;
    }

    if (status === 'pending') {
      return <PokemonPendingView pokemonName={this.props.pokemonName} />;
    }

    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

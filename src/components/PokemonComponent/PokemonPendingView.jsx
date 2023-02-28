import { ImSpinner } from 'react-icons/im';
import { PokemonDataView } from './PokemonDataView';

export const PokemonPendingView = ({ pokemonName }) => {
  const pokemon = {
    name: pokemonName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: '',
        },
      },
    },
    stats: [],
  };

  return (
    <div role="alert">
      <div>
        <ImSpinner size="32" className="icon-spin" />
        Загружаем...
      </div>

      <PokemonDataView pokemon={pokemon} />
    </div>
  );
};

export const PokemonDataView = ({ pokemon: { sprites, name, stats } }) => {
  return (
    <div>
      <img
        src={sprites.other['official-artwork'].front_default}
        alt={name}
        width="240"
        height="240"
      />
      <h2>{name}</h2>
      <ul>
        {stats.map(entry => {
          return (
            <li key={entry.stat.name}>
              <p>
                {entry.stat.name}: {entry.base_stat}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

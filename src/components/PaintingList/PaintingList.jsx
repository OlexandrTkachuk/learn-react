import { Painting } from 'components/Painting/Painting';
import PropTypes from 'prop-types';

export const PaintingList = ({ items }) => {
  return (
    <ul>
      {items.map(({ id, url, title, author, price, quantity }) => {
        return (
          <li key={id}>
            <Painting
              url={url}
              title={title}
              price={price}
              authorName={author.tag}
              authorUrl={author.url}
              quantity={quantity}
            />
          </li>
        );
      })}
    </ul>
  );
};

PaintingList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

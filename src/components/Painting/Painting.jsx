// 1) якщо умовно картинка не прогрузиться, то для того щоб задати картинку за замовчуванням, потрібно буде її імпортувати у jsx/js файл

// 2) import defaultImage from './default.jpg'

// 3) а далі значення defaultImage передаємо в пропс ( url = defaultImage )
import PropTypes from 'prop-types';

export const Painting = ({
  url, // url = defaultImage,
  title,
  price,
  authorName = 'неизвестно',
  authorUrl,
  quantity,
  id,
}) => (
  <div>
    <img src={url} alt={title} width="480" />
    <h2>{title}</h2>
    <p>
      Автор:
      <a href={authorUrl}>{authorName}</a>
    </p>
    <p>Цена: {price} кредитов</p>
    <p>Доступность: {quantity >= 10 ? 'есть в наличии' : 'заканчивается'}</p>
    <button type="button">Добавить в корзину</button>
  </div>
);

Painting.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};

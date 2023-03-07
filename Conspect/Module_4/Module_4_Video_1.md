## Links:

[Документація](https://ru.reactjs.org/docs/hooks-intro.html);
[React_Hook_Form](https://react-hook-form.com/);
[Хуки_для_HTTP-запитів](https://github.com/tannerlinsley/react-query);
[Кастомні_хуки](https://github.com/streamich/react-use);

## useState

Повертає масив з двух значень ['', f]. Перше - це поточне значення стану, а
друге - це функція для оновлення цього стану. Тому, при ініціалізації useState,
ми можемо одразу деструктуриувати його const [name, setName] - useState(value);

Для того, щоб оновити значення [name] нам потрібно викликати функцію [setName] і
передати в неї нове значення. Наприклад наш name буде отримувати нове значення в
залежності від введеного тексту в полу <input>.

<!-- const handleNameChange = event => {
  setName(event.target.value);
} -->

## useEffect

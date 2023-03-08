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

Оновлення стану на основі [попереднього] значення setState(state => state + 1)

## useEffect

useEffect буде викликатись кожен раз коли у нас буде змінюватись prop або state,
в залежності від переданих [залежностей] у масив-залежностей.

1. Якщо не передати масив залежностей, то useEffect буде викликатист при першому
   рендері + при будь-якому оновлені props / state

2. [] пустий масив залежностей означає шо useEffect запуститься лише перший
   рендер (монтування) і більше ніколи.

3. Якщо в масив залежностей передати виключно ті значення, які ми хочемо
   відслідковувати, то useEffect буде викликатись при першому рендері + при
   кожній зміні переданого в масив залежностей props / state.

<!-- useEffect(() => {
  const totalClicks = counterA + counterB;
  document.title = `всього клікнули ${totalClicks} раз`;
}, [counterA, counterB]) -->

[useEffect] хук який приймає два агрумента:

1. анонімка функція, де вказуємо, ЩО потрібно зробити
2. масив-заленостей, де вказуємо ЗА ЯКИМИ змінами потрібно слідкувати.
3. Якщо зміниться x, то виконай f()

## localStorage.setItem

Якщо ми хочемо записати дані в localStorage, нам знадобиться useEffect

<!-- useEffect(() => {
  window.localStorage.setItem('data', JSON.stringify(data));
}, [data]) -->

Якщо зміниться [data], то в localStorage запишеться нове значення.

## localStorage.getItem

Для того щоб прочитати значення з localStorage потрібно:

<!-- const [data, setData] = useState(
JSON.parse(window.localStorage.getItem('data')) ?? ''
); -->

Для того щоб на кожному рендері не викликався запит до localStorage, потрібно
задати [Ліниву_ініціалузацію_стану] або [lazy_state_initialization].

Якщо в useState() агрументом передається значення, яке вираховується, то
потрібно просто повернути його як значення анонімної функції:

const [data, setData] = useState(() => JSON.parse(window.localStorage('data'))
?? '').

- Якщо тим чином передати аргумент в useState, то він зможе викликати її лише
  один раз і тільки при першому рендері, а потім повністю ігноруватиме її.

## Кастомний хук useLocalStorage

<!-- const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
} -->

Оскілки хук useState нам поветрає масив з двух елементів, то нам для кастомного
Хука потрібно в кінці функції також повернути масив двох елемиентів return
[state, setState]

Тоді в нашому компоненті при ініціалізації перемінної, дані якої ми будемо брати
з localStorage запис буде вигяладати наступним чином:

<!--
 const [data, setData] = useLocalStorage('data', '');
 -->

## useRef

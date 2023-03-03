## Хук UseState

Перший, простий і найважливіший хук. Пов'язаний зі станом компонента. Завдяки
йому у функціональних компонентів з'явився внутрішній стан.

<!--
import { useState } from 'react';

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      {value}
      <button type="button" onClick={() => setValue(value + 1)}>
      Increment value by 1
      </button>
    </div>
  )
}
-->

Виклик хука useState створює стан і метод, який змінюватиме його значення. У
якості параметра хук приймає початковий стан, в нашому випадку число 0 -->
[useState(0)]. У стані може зберігатись будь-який тип даних.

Хук useState повертає масив двох елементів: першеий - поточне значення стану, а
другий - функцію, яка буде змінювати значення стану першого елемента. Функцію
можна використовувати де завгодно, наприклад в обробнику подій. React буде
зберігати цей стан між рендерами.

[Хуки] - це просто функції, за допомогою яких можна "підчепитися" до стану та
методів життєвого циклу з компонентів-функцій та використовувати React без
класів.

У класовому компоненті ми можемо створити лише один загальний стан, а у
функціональному - скільки завгодно, і вони будуть незалежні один від одного.

<!--
const App = () => {
  const [userName, setUserName] = useState("")                // початкове значення пуста строка
  const [todos, setTodos] = useState([{text: 'Learn hooks'}]) // початкове значенян масив об'єків json()
  const [isModalOpen, setIsModalOpen] = useState(false)       // початкове значення флажок true/false
}
-->

[ОбмеженняХуків] - будь-які хуки можна викликати лише на верхньому рівні
компонента функції. Тобто пока циклами, кмовами, вкладеними функціями. Такі
дивні обмеження тандартизують нписання логіки компонента та роблять код менш
заплутаним.

## Хук useEffect

Меетода життєвого циклу служать для того, щоб здійснювати якісь операції на
різних тадіях життя компонента. Наприклад, записувати дані з бекенда, додавати
слухачій подій. За допомогою хука [useEffet] у компонентках-функціях можна
виконувати всі ці "ефекти", змоделювавши роботу трьох методів життєвого циклу -
cdm, cdu, cwu - об'єднавши їх в один API.

<!-- Example
import {useState, useEffect} from 'react';

const App = () => {
  const [value, setValue] = useState(0);

  useEffet(() => {
    document.title = `You clicked ${value} times`;
  })

  return (
    <div>
      <p>You clicked {value} times</p>
      <button type="button" onClick={() => setValue(value+1)}>
        Click me
      </button>
    </div>
  )
} -->

[useEffect(callback,_deps)] - приймає два аргументи:

- callback - функція, всередині якої виконується логіка ефекту. Наприклад запити
  на сервер, завдання обробника подій на документ, тощо.
- залежності (deps) - масив змінних, при зміні будь-якого з яких, буде
  запускатися ефект і виконуватись callback. Це може бути стан, пропси або
  будь-яке локальне значення всередині компонента.

[!!!!!] Якщо не передати масив залежностей, ефект виконуватиметься на кожному
рендері компонента. Саме завдяки масиву залежностей ми можемо імітувати методи
життєвого циклу.

[Аналог_componentDidMount] - хук useEffect запускається не тільки при зміні
емелентів масиву залежностей, а і при первинному рендері компонентів
(Монтуванні). Якщо ми вкажемо в якості другого аргумента порожній масив,
callback запуститься на стадії монтування компонента, і білші ніколи. Тобно якщо
ми не передамо в залежності ні стейт, ні пропси, ні локальні зміні, то не буде
чому оновлюватись. А якшо немає чому оновлюватись то не буде зпрацьовувати CDU.

<!-- Example
const App = () => {
  const [value, setValue] = useState(0);

  useEffect(()=> {
    console.log(`adsasdadasd`);   // [callback]
  }, [empty_deps_array])

  return <button onClick={() => setValue(value + 1)}>{value}</button>
} -->

[Аналог_componentDidUpdate] - У масиі потрібно перерахувати всі залежності
ефекту. Так отримаємо більш гнучкий аналог методу CDU, який запускається тільки
тоді коли змінюються певні значення з масиву deps.

<!-- Example
const App = () => {
  cosnt [value, setValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(callback, [value, isModalOpen]);

  return <button onClick={() => setValue(value + 1)}>{value}</button>;
} -->

[Аналог_componentWillUnmount] - Для того, щоб виконати код код при розмонтуванні
компонента, або взагалі перед кожним викликом ефекту, повертаємо з useEffect
функцію очищення з необхідним кодом. Це і є аналог CWU. Так можна знімати
обробники подій, зупиняти таймери та скасовувати http-запити.

<!-- Example
const App = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('Mounting phase: same when componentDidMount runs');

    return () => {
      console.log('Unmounting phase: same when componentWillUnmount')
    }
  }, [value]);

  return null;
} -->

[Декілька_ефектів] - хуки дозволяють розділити та згрупувати логіку, створивши
"ефект" під кожну незалежну операцію:

<!-- Example
const App = () => {

      useEffect(() => {  // 1
        initThirdPartyLibrary();
      }, [])


      useEffect(() => {  // 2
        fetchUser(username);
      }, [username])


      useEffect(() => {  // 3
        console.log(value)
      }, [value]);


      useEffect(() => {  // 4
        console.log(isLoggedIn)
      }, [isLoggedIn]);


      useEffect(() => {  // 5
        const handleKeyDown = event => console.log('keydown event: ', event);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }, [])
} -->

## Власні Хуки

[Увага!!!] Створення власних хуків потребує досвіду роботи з хуками та React
загалом. Не варто спеціально прагнути зробити у проекті власні хуки. Якщо ви
явно не бачите можливість повторного використання коду, добре, зробіть свій хук.
В іншому випадку краще сконцентруватися на вивченні основного матеріалу та
використання вбудованих React-хуків або готових хуків із бібліотек.

Хук - це просто функція, ім'я якої обов'язково починається з приставки use. Саме
по ній React визначатиме це звичайна функція чи хуй. Наприклад useState,
useEffect, useToggle, useImage, useDevice. Власні хуки створюються поза тілом
компонента, часто навіть в окремих файлах, та можуть викликати інші хуки, так
досягається просте [повторне_використання] коду.

## Власний Хук useToggle

Наприклад у двох компонентах необхідна логіка відкриття, закриття, перемикання
елемента інтерфейсу, наприклад модального вікна.

<!-- Example
ComponentA.jsx // окремий файл

const ComponentA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button type="button" onClick={openModal}>OpenModal</button>
      <ModalA isOpen={isModalOpen} onClose={closeModal}>
    </div>
  )
}

const ComponentB = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button type="button" onClick={openModal}>OpenModal</button>
      <ModalA isOpen={isModalOpen} onClose={closeModal}>
    </div>
  )
} -->

Як бачимо у вищенаведеному прикладі, у нас відбуважться [дублювання] коду -
створення стану та методів для відкриття/закриття мод вікна. Створимо загальний
для них Хук [useToggle], в якому приховаємо створення стану та методів роботи з
ним.

<!-- Example
src/hooks/useToggle.js

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);

  return {isOpen, open, close, toggle}
} -->

[Сигнатура_Хука] - Власний лук може приймати будь-які аргументи і повертати
будь-що, правил немає, залежить від реалізації. У нашому випадку це об'єкт із
чотирма властивостями.

Тоді код ComponentA / ComopnentB буде мати наступний вигляд.

<!-- Example
// AAA
import { useToggle } from 'path/to/hooks/useToggle.js'

const ComponentA = () => {
  const {isOpen, open, close} = useToggle();

  return (
    <div>
      <button type="button" onClick={open}>Open Modal</button>
      <ModalA isOpen={isOpen} onClose={close} />
    </div>
  )
}

// BBB
import { useToggle } from 'path/to/hooks/useToggle.js'

const ComponentB = () => {
  const {isOpen, open, close} = useToggle();

  return (
    <div>
      <button type="button" onClick={open}>Open Modal</button>
      <ModalB isOpen={isOpen} onClose={close} />
    </div>
  )
} -->

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

## Контекст та useContext

Дані передаються зверху вниз через пропси, але це може бути незручно для певних
глобальних даних, які потрібні багатьом компонентам на разних рівнях у додатку
(локалізація, тема оформлення, стан авторизації...)

[Контекст] забезпечує спосіб передачі даних глибоко по дереву копонентів без
необхідності явно передавати пропси в проміжні компоненти вручну на кожному
рівні.

[Увага!!!] не використовувати контекст, щоб уникнути передачі пропсів на кілька
рівнів вниз. Цей механізм призначений для вузького спектра.

## Функція createContext()

import { createContext } from 'react';

const MyContext = createContext(defaultValue);

1. Створює об'єкт контексту, що містить пару компонентів: <Context.Provider>
   (постачальник) та <Context.Consumer> (споживач)

2. Під час пендеру, споживач прочитає поточне значення контексту з найближчого
   відповідного постачальника вище у дереві компонентів.

3. Агрумент [defaultValue] використовується споживачем, якщо в нього немає
   відповідного постачальника над ним у дереві. На практиці можна не вказувати,
   тому що немає сенсу намагатися отримати доступ до контексту, якого немає.

## Компонент Provider

Дозволяє споживачам підписуватись на зміни контексту. Використовується для
створення та передачі контексту.

<!-- Example

import { createContext } from 'react';
import ReactDOM from 'react-dom/client';

const MyContext = createContext(defaultValue);

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContext.Provider value={context_value}>
    <App />
  </MyContext.Provider>
) -->

1. Приймає prop value - значення контексту, яке буде передано
   нащадкам-споживачам цього контексту.
2. Дозволяє споживачам підписуватись на зміни контексту незалежно від глибини
   вкладенності.
3. Один провайдер може бути пов'язаний із багатьма споживачами.
4. Провайдери можуть буде вкладені один в одного.

## Хук useContext()

Дозволяє отримати доступ до поточного значення контексту. Отримує поточний
контекст із найближчого порівняного <Provider> вище у дереві.

import { createContext, useContext } from 'react';

const MyContext = createContext();

const contextValue = useContext(MyContext);

1. Очікує єдиний агрумент - посилання на створений контекст.
2. Поверне значення контексту найближчого провайдера для цього контексту вище у
   дереві.
3. Щоразу коли оновиться контекст, залежний компонент ре-рендериться з новим
   значенням

[Кастомний_хук_користувача]

export const useMyContext = () => useContext(MyContext);

## Контекст користувача

1. Напишемо контекст для зберігання інформації про поточний стан користувача -
   статусу логіна та особистої інформації.

<!--
useContext.js

import { createContext, useContext} from 'react';
export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

-->

2. Обертаємо провайдером все дерево компонентів. Це можна зробити у компоненті
   App або прямо в головному файлі index.js

<!--
index.js

import { UserContext } from 'path/to/userContext.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContext.Provider value={{ username: "Mango" }}>
    <App />
  </UserContext.Provider>
);

 -->

3. Додаємо компонент меню користувача вкладений у <App>, у ньому будемо
   отримувати значення контексту та відображати ім'я користувача.

<!--
App.js

import { UserMenu } from "path/to/UserMenu";

const App = () => {
  return (
    <div>
      <UserMenu />
    </div>
  );
};

-->

4. Використовуємо наш кастомний хук useUser для доступу до значення контексту.

<!--
UserMenu.js

import { useUser } from 'path/to/userContext.js';

export const UserMenu = () => {
  const { username } = useUser();

  return (
    <div>
      <p>{username}</p>
    </div>
  )
}

-->

## Кастомний компонент провайдера

1. Створимо кастомний компонент провайдера <UserProvider> в якому закриємо
   логіку роботи зі станом.

<!-- userContext.jsx

import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = setState(null);

  const logIn = () => {
    setIsLoggedIn(true);
    setUsername('Mango');
  }

  const logOut = () => {
    setIsloggedIn(false);
    setUsername(null);
  }

  return (
    <UserContext.Provider value={{isLoggedIn, username, logIn, logOut }}>
      { children }
    </UserContext.Provider>
    );
}  -->

2. Огортаємо все дерево компонентів кастомним провайдером.

<!-- index.js
import { UserProvider } from "path/to/userContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <App />
  </UserProvider>
); -->

3. У компоненті <App> рендеримо компонент меню користувача <UserMenu>

<!-- App.jsx
import { UserMenu } from "path/to/UserMenu";

const App = () => {
  return (
    <div>
      <UserMenu />
    </div>
  );
}; -->

4. Використаємо useUser для доступу до значення контексту в компоненті
   <UserMenu>

<!-- UserMenu.jsx

import {useUser} from'path/to/userContext';

export const UserMenu = () => {
  const {isLoggedIn, username, logIn, logOut} = useUser();

  return (
      <div>
        {isLoggedIn && <p>{username}</p>}
        {isLoggedIn ? (
          <button onClick={logOut}>Log out</button>
        ) : (
          <button onClick={logIn}>Log in</button>
        )}
      </div>
    );
} -->

5. Використаємо [useUser] для доступу до значення контексту користувача.

<!-- UserMenu.jsx

import { useUser } from '../userContext';

export const UserMenu = () => {
  const {isLoggedIn, username, logIn, logOut} = useUser();

  return (
    <div>
      {isLoggedIn && <p>{username}</p>}
      {isLoggedIn ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={logIn}>Log in</button>
      )}
    </div>
  )
} -->

## Хук useRef

[Рефи] дозволяють отримати прямий доступ до DOM- вузлів або React-елементів із
шаблону компонента. Вони використовуються якщо необхідно звернутись до
імперативних методів та властивостей елемента.

- Фокус елемент під час події, виділення тексту
- Контроль програвання медіаконтенту
- Інтеграція з ДОМ-бібліотеками
- Доступ до ДОМ-властивостей, значення яких неможливо отримати по-іншому -
  розміри елемента, значення скрола, тощо.

[Створення] - рефи створюються хуком userRef() та прив'язані до React-елементів
за допомогою атрибуду ref, який зберігатиме посилання на ДОМ-елемент.

<!-- import { useRef } from 'react';

const App = () => {
  const btnRef = useRef();

  return <button type="button" ref={btnRef}>Button with ref</button>
} -->

## Життєвий цикл рефа

React надає властивості [currnet] посилання на ДОМ-елемент коли компонент
монтуєтся та null при розмонтуванні, тому значення рефа доступне тільки після
монтування.

<!-- Example
import { useState, useRef } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const btnRef = useRef();

  // буде null при першому рендері компонента
  // і буде мати посилання на ДОМ-елемент всі наступні рендери компонента
  console.log(btnRef.current);

  useEffect(() => {
    // ефект виконується після монтування
    // тому завжди буде посилання на ДОМ-елемент
    console.log(btnRef.current);
  })

  const handleClick = () => {
    // Кліки будуть після монтування,
    // тому завжди буде посилання на ДОМ-елемент
    console.log(btnRef.currnet);
  }

  return (
    <>
      <button onCLick={() => setValue(value + 1)}>
        Update value to trigger re-render
      </button>
      <button ref={btnRef} onClick={handleClick}>
        Button with ref
      </button>
    </>
  )
} -->

## Відсутність реакивності

Рефи це не стан, тобто вони не реактвгі, тому зміна значення рефа не впливає на
оновлення компонента і не викливає ре-рендер.

<!-- Example

inport { useState, useRef } from 'react';

const App = () => {
  const valueRef = userRef(0);

  useEffect(() => {
    // виконується лише один раз під час монтування.
    // наступні оновлення значення ref не викличуть оновлення компонента
    console.log(valueRef.currnet);
  });

  const handleClick = () => {
    valueRef.current += 1;
  }

  return <button onClick={handleClick}>Click to update ref value</button>
} -->

[Початкове_значення] - refs також можна використовувати як сховище довільних
значень, які не змінюються між рендерами компонента та на нього не впливають.
Тому в прикладі хуку useRef передано початкове значення якості currnet -
число 0. Ця можливість використовується для класу завдань при створені
складніших компонентів.

const valueRef = useRef(0);

## Простий відеоплеєр

Створимо компонент <Player> для програвання відео, використовуючи нативний тег
<video>. Щоб запустити та зупинити програвання необхідно викликати методи
HTMLMedaiElement.play() та HTMLMediaElement.pause(), де [HTMLMediaElement] - це
елемент <video>. Використовуємо реф для отримання доступу до ДОМ-елементу та
його методам.

<!-- Example

import { useRef } from 'react';

const Player = ({ source }) => {
  const playerRef = useRef();
  const play = () => playerRef.current.play();
  const pause = () => playerRef.current.pause();

  return (
    <div>
      <video ref={playerRef} src={source}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  )
}

const App = () => {
  return <Player source={http://media.w3.org/2010/05/sintel/trailer.mp4} />
} -->

## Перенаправлення рефів

При використані рефів на компоненті, prop ref не передається автоматично. Це
створює проблеми у випадку коли ми хочемо отримати ref на елементі усередині
самого компонента, а не на сам компонент. Функція forwardRef автоматично передає
props, отримані батьківським компонентом його дочірнім елементам.

<!-- Example

import { forwardRef, useRef, useEffect } from 'react';

const CustomButton = forwardRef((props, ref) => {
  <button ref={ref}>{props.children}</button>
});

const App = () => {
  const btnRef = useRef();

  useEffect(() => btnRef.current.focus(), []);

  return <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>;
} -->

Такий підхід дозволяє отримати посилання у батьківському компоненті на
ДОМ-елемент усередині іншого компонента. Наприклад ми створюємо галерею, так
можна отримати посилання на ДОМ-елемент пока них і працювати з їх властивостями,
наприклад використовувати метод Element.getBoundingClientRect() і тому подібне

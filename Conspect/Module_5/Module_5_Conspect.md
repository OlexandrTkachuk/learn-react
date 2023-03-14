## Маршрутизація

Відмінна перевага веб-застосунку від десктопного - це наявність URL при переході
по якому користувач опиняється у певної частини програми. Так можна зберегти
закладку або надіслати посилання іншому користувачеві, при цьому йому буде
відображено той самий інтерфейс (за винятком приватних даних).

[В_першу_чергу] Маршрутизація - це не побічний ефект при написанні програми, а
навпаки, структуру навігації та набір сторінок необхідно продумувати в першу
чергу.

## Структура URL-рядка

Кожен стан інтерфейсу повинен мати свою адресу, свій URL. Те, що бачить
користувач, стан інтерфейсу, має бути описаний в URL.

[https://mysite.com/books/e3q76g9zk?category=adventure&status=unread#comments]

Частини, з яких складається URL:

- https://: протокол
- mysite.com: хост
- books/e3q76gm9lzk: шлях, то, де ми знаходимось у додатку
- e3q76gm9lzk: URL-параметр
- ?: символ початку рядка
- ?category=adventure&status=unread: рядок запиту
- category=adventure: пара "параметр-значення"
- &: символ "і" розділяє параметри запиту
- #comments: якір (хеш) визначає положення на сторінці

## Маршрутизація в React

У React немає вбудованого модуля маршрутизації, тому використовується React
Router - ліба маршрутизації для реакту. [React_Rounter] надає нам набір
компонентів та хуків для створення маршрутизації, управління історією навігації
користувача та відображення різних компонентів в залежності від поточного
значення URL в адресному рядку бразуера.

npm install [react-rounter-dom]

## Компонент <BrowserRouter>

Командний центр управління маршрутизацією, який приховує в собі всю логіку
взаємодії із історією браузера. Створює маршрутизатор та обєкт навігації, щоб
синхронізувати інтерфейс з URL-адресою. Використовуючи React контекст передає
інформацію про поточний стан історії навігації всім нащадкам. Все, що необхідно
зробити, це обернути компонентом <BrowserRouter> всі програми.

index.js

import { BrowserRouter } from 'react-router-dom';

<!--
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
-->

## Компоненти <Route> та <Routes>

<Route> дозволяє повязати певний URL з деяким компонентом. Наприклад, якщо ми
хочемо відобрражати компонент <About> коли користувач переходить шляхом /about,
необхідно буде описати такий маршрут:

<Route path="/about" element={<About />}>

Значенням [element] може бути будь-який валідний JSX, але на практиці
викоритовують лише ккомпоненти.

[Увага!!!] Компонент <Route> завжди щось рендерить. Те, що зазначено у пропсі
element якщо його path збігається з поточним значенням сегмента pathname в
адресному рядку браузера, або null, якщо не збігається

Групу маршрутів обов'язково має огортати компонент <Routes>, навіть, якщо
маршрут лише 1. Цей компонент виконує логіку підбору найбільш відповідного
<Route> для поточного значення URL в адресному рядку браузера.

<!-- App.jsx

import { Routes, Route } from 'react-router-dom';
import Home from "....";
import About from "....";
import Products from "....";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/"> element={<Home />}
        <Route path="/about"> element={<About />}
        <Route path="/products"> element={<Products />}
      </Router>
    </div>
  )
} -->

Для зручності та структурованості всі компоненти зберігаються окремо від усіх в
папці [src/pages]

[Сторінка_помилки_навігації] - якшо користувач перейде за посиланням
/non-existing-route або будь якому іншому, якого немає у нас в додатку, він
побачить порожню вкладку браузера, без будь-якого контенту. Для цього в кінці
списку маршрутів додає ше один компонент, який збігатиметься з будь-яким URL,
але він буде обраний тільки в випадку, якщо жоден інший маршрут не підійде.

<!-- import { Routes, Route } from "react-router-dom";
import Home from "path/to/pages/Home";
import About from "path/to/pages/About";
import Products from "path/to/pages/Products";
import NotFound from "path/to/pages/NotFound";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}; -->

Символ \* у пропсі [path] буквально вказує на те, що маршрут може збігатися з
будь-яким значенням URL. Тому якшо жоден попередній маршрут не підійде, то буде
обраний останій <Route>, і буде зарендерена сторінка з розміткою, де користувач
отримає повідомлення-помилку, щодо невірно вказаного маршруту, за яким той
звертався.

## Компоненти <Link> та <NavLink>

Для створення навігації не можна використовувати звичайний тег
<a href="/about">. При кліку, замість того, щоб змінити URL на поточній сторінці
і дозволити маршрутизатору виконати навігацю на сторінці клаєнта, браузер
перезавантажить сторінку.

Для створення посилання використовуються компоненти <Link> та <NavLink>. Вони
рендерять тег <a>, але стандартна поведінка посилання змінена так, що при
натискані просто оновлюється URL в адресному рядку браузера, без
перезавантаження.

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/products">Products</Link>
</nav>

Компонент [NavLink] відрізняється тільки тим, що може мати додаткові стилі, якщо
поточний URL збігається зі значенням пропса [to]. За замовчуванням елементу
активного посилання додається клас [active]. Це можна використовувати для її
стилізації.

<!-- App.jsx

import { Ruote, Routes, NavLink} from 'react-router-dom';
import styled form 'styled-components';
import Home from '.../';
import About from '.../';
import Products from '.../';

const StyledLink = styled(NavLink)`
color: black;

&.active {
  color: orange;
}
`

export const App = () => {
  return(
    <div>
      <nav>
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/products" end>Products</StyledLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home /}>
        <Route path="/about" element={<About /}>
        <Route path="/products" element={<Products /}>
      </Routes>
    </div>
  )
} -->

## URL-параметри

Динамічні параметри схожі на параметри функції - у них завжди одна назва, але
можуть бути різні значення. Вони дозволяють оголосити шаблон адреси, частини
якого можуть мати довільне значення. Замість того, щоб визначати маршрут для
кожної статті, ми можемо оголосити один маршрут з динамічним параметром по якому
визначатимемо що необхідно відображати прямо зараз. Для того, щоб показати, що
якаст частина адреси - це URL-параметр, використовується [двокрапка] : перед
іменем параметра.

<Route path="/blog/:postId" element={<BlogPost />} />

Кожен раз, коли користувач буде відвідувати адресу, що відповідає шаблону
[/blog/:postId] наприклад /blog/react-fundamentals або /blog/top-5-css-tricks,
йому буде відображатись сторінка цього поста.

[Ім'я_параметра] - ім'я URL-параметра може бути довільним, але воно має значення
і має бути зрозумілим та описовим.

Додамо до наого проекту маршрут сторінки одного продукту з адресою
/products/:productId. Це буде окремо сторінка, ніяк не прив'язана до /products.

<!-- App.jsx

import { Routes, Route, Link } from 'react-router-dom';
import Home from '.../'
import About from '.../'
import Products from '.../'
import NotFound from '.../'
import ProductsDetails from '.../'

export const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
} -->

[Унікальність_значення] - значення URL-параметра має бути унікальним всередині
колекції, тому частіше всього використовують ідентифікатори обєктів, які
встановлює база даних (числа або рядки). тому адреса може виглядати, як
/products/1, /products/2 і так далі.

## Хук useParams

[useParams] - поветрає об'єкт з усіма динамічними параметрами, які є в поточному
URL. Ім'я параметра буде ім'ям властивості в об'єкті, а його поточне значення в
адресі - значенням властивості.

Наприклад, якщо оголошено наступний маршрут [/books/:genreId/:authorName], та
користувач знаходиться за адресою [/books/adventure/herman-melville].

const { genreId, authorName } from useParams();

console.log(genreId, authorName); // adventure, herman-melville;

Для того, щоб отримати значення динамічної частини URL, у нашому випадку
ідентифікатор продукту, використовуємо хук useParams у компоненті сторінки
продукту.

[src/pages/ProductDetails.jsx]

<!--
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const {productId} = useParams();

  return <div>Now showing product with id - {productId}</div>
} -->

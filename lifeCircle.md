## componentDidMount

Монтування. Викликається лише один раз за весь життєвий цикл компонента при
першому рендері розмітки. Метод викликається тільки після того як зарендериться
розмітка.

<!-- componentDidMount() {
  const todos = localStorage.getItem('array'); [беремо значення з localStorage]
  const parsedTodos = JSON.parse(todos) [парсимо його в масив обєктів]

  if(parsedTodos) {
    this.setState({todos: parsedTodos})
  }

  [Якщо в localStorage не буде ніяких даних, то нам прийде значення null і у нас усе полетить, для цього використовуємо додаткову перевірку якшо parsedTodos === true, тоді в this.state.todos буде записувати значення parsedTodos]
} -->

## componentDidUpdate(prevProps, prevState)

Викликається на кожну зміну компонента (коли приходять нові [props] або коли
змінюється [state]).

В параметрі [prevSatet] - буде state до оновлення компонента, а в [this.state]
буде актуальний state після оновлення компонента.

<!-- componentDidUpdate (prevProps, prevState) {
  if(this.state.array !== prevState.array) {
    console.log('Оновилось поле масиву array')

    localStorage.setItem('array', JSON.stringify(this.state.array))
  }
} -->

Якщо this.state.array (значення state після оновлення компонента) !== не
дорівнює prevState.array (початковому state), це означає що відбулись якісь
зміни у значенні state, а оскільки змінився state.array то і буде
перерендерюватись розмітка + буде виводитись в консоль ('Оновилось поле масиву
array') + при кожній зміні значення array, в localStorage буде записуватись
масив даних.

## componentWillUnmount

Розмонтування. Використвується для очистки за собою по типу [addEventListener],
[setInterval], [http-запрос]

## shouldComponentUpdate

Якшо поветрає true, то розмітка буде оновлюватись, якщо false, то компонент не
буде оновлюватись/перемальовуватись

## Modal rendering

 <!-- state ={
  showModal: false
 }

 toggleModal = () => {
  this.setState(({showmodal}) => {
    showModal: !showModal,
  })
 }
 
 <button type="button" onClick={this.toggleModal}>Відкрити модалку</button>

 {showModal && <Modal />}
  -->

Початкове значення для модального вікна false, отже закрите. Метод toggleModal
дає нам змогу робити інверсію при клікі на умовну кнопку відкриття модалки
значення this.state.showModal буде змінено на протилежне false --> true і
навпаки. Ми зробили деструктиризацію в toggleModal --> [prevState =>
prevState.showModal] замінили на [({showModal}) => showModal]

Далі ми будемо писати логіку рендеру розмітки, якшо showModal true, то будемо
рендерити компонент модал {showModal && <Modal />}

На кнопку відкриття модалки вішаємо метод toggleModal. який буде змінювати
значенян this.state.showModal з false на true
<button type="button" onClick={this.toggleModal}>Відкрити модалку</button>

## Modal component like reusable component

  <!-- export class Modal extends Component {
    render() {
      return (
        <div className="Modal__backdrop">
          <div className="Modal__content">{this.props.children}</div>
        </div>
      )
    }
  } -->

Передавши в модалку {this.props.children} ми маємо змогу рендерети даний
компонент в будь-якому іншому, при цьому задавати різного роду розмітку модалки
як children.

  <!-- наприклад: 
    <Container>
      {showModal && <Modal>
        <h1>Це контент модалки для children</h1>
        <p>Lorem text content.....</p>

        <button type="button" onClick={this.toggle}>Close modal</button>
      </Modal>}
    </Container> -->

Передаємо омпонент модалки в інший копонент Container і задаємо потрібну нам
розмітку як children

## Modal stacking context (контекст наложения) // Portal

Маніпулювання розташуванням модального вінка відносно осі Z (z-index)

Найпростіший спосіб вивести модалку поверх інших елементів розмітки - це задати
їй z-index: n; Але якщо на шляху у якогось елементу буде стояти
[Overflow-Hidden], то модалка буде візуально обрублена по розмірах батьківського
елемента. і пофіксити це неможливо. Для таких випадків react існують портали.
Один з небагатьох випадків, коли в файлі index.html ми можемо написати щось
руками.

В такому випадку під дівом root ми створимо ще один корнений елемент
[#modal-root], в якому ми будемо рендерити розмітку нашого компонента

  <!-- for example:
    <body>
      <div id="root"></div> 

      <div id="modal-root"></div>
    </body>  -->

- import {createPortal} from 'react-dom';
- const modalRoot = document.querySelector('#modal-root');

- І наш компонент Modal ми будемо рендерити в іншому порталі:

<!-- export class Modal extends Component {
    render() {
      return createPortal(
        <div className="Modal__backdrop">
          <div className="Modal__content">{this.props.children}</div>
        </div>,
        modalRoot
      )
    }
  } -->

Надалі таких portals буде n-на кількість (рути для нотіфікашок, для модалок, для
поп-ап і т.д.)

## Закриття Modal по нажиманню на Esc

Для цього нам потрібен метод компоненту [componentDidMount], на який ми можемо
повішати прослуховувач подій:

- з компонента Апп потрібно прокинути метод toggleModal як props -->
<Modal onClose={this.toggleModal}>

  <!-- for ex: 
    componentDidMount () {
      window.addEventListener('keydown', this.handleKeyDown)
    } реєстрація прослуховувача
    
    componentWillUnmount () {
      window.removeEventListener('keydown', this.handleKeyDown)
    } знімаємо прослуховувача подій

    handleKeyDown = e => {
      if(e.code === 'Escape') {
        this.props.onClose() 
      }
    } колбек функція 
    -->

Якщо таким чином не підчищати за собою, то буде дуже сильно впливати на
продуктивність.

## Закриття Modal при backdropClick

при клікі на бекдроп, якшо event.currentTarget === event.target, тобто

<div className="Modal__backdrop"> === <div className="Modal__backdrop">, тобто ми клікнули на бекдроп, а не на що інше, то будемо викликати прокинутий пропс -
метод закриття модалки onClose();

onClick вішажмо на <div className="Modal__backdrop"></div>

<!-- export class Modal extends Component {
  handleBackdropClick = (event) => {
    if(event.target === event.currentTarget) {
      this.props.onClose()
    }
  }

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot
    )
  }
} -->

## Компонент Clock та setInterval()

- Таймер який показує час в форматі (HH:MM:SS)
- Схожий випадок з addEventListener, де ми повинні підчищати за собою
  setInterval
- Створюємо публічну властивість класа intervalId;
- При монтувані компоненту записуємо в метод componentDidMount() setInterval
- При розмонтувані, для того щоб за собою почистити, потрібно в
  componentWillUnmount() записати clearInterval() і прокину

<!-- export class Clock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  }

  intervalId = null;

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.setState({time: new Date().toLocaleTimeString()}),
      1000,
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    return <div className="Clock__face">{this.state.time}</div>
  }
} -->

## Tabs Component - робота з табами

При натискані на button 1/2/3 буде відповідно змінюватись activeTabIndex і кожен
раз буде ререндеритись розмітка відповідно до активного індексу.

- Але якщо у нас зарендерилась розмітка наприклад третього index ("Tab 3") і ми
  знову натискаємо на кнопку "Tab 3", то react перерендерить розмітку знову,
  хоча дані і не зміняться.

- Є два методи, які допоможуть нам пофіксити даний баг.

- 1. можна прописати логіку переврки для метода [shouldComponentUpdate]:

<!-- shouldComponentUpdate(nextProps, nextState) {
  return nextState.activeTabIndex !== this.state.activeTabIndex
} -->

Даний метод дозволяє реакту оновлювати (ререндерити) розмітку лише тоді коли
метод поверне значення true. В нашому випадку значення буде true лише тоді коли
поточний activeTabIndex НЕ ДОРІВНЮЄ наступному activeTabIndex.

- 2. Існує простіший метод, альтернатива. Замість Component ми можемо
     імпортувати/унаслідувати PureComponent from 'react'. В нього під капотом
     реалізований метод shouldComponentUpdate і поверхнево йде порівняння всііх
     пропсів (не в глубину, а лише перший рівень)

<!--
  export class Tabs extends PureComponent {
    state = {
      activeTabIndex: 0,
    }

    setActiveTabIndex = index => {
      this.setState({activeTabIndex: index})
    }

    render() {
      const {activeTabIndex} = this.state; деструктуризація зі state
      const {items} = this.props; деструктуризація прокинутого пропсу (json)
      const activeTab = items[activeTabIndex]

      return (
        <>
          <div>
            {items.map((item, index)=> (
              <button
                type="button"
                key={item.label}
                onClick={() => this.setActiveTabIndex(index)}
                >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            <h2>{activetab.label}</h2>
            <p>{active.content}</p>
          </div>
        </>
      )
    }
  }
 -->

## Кнопки-иконки

1. Створимо reusable-Component IconButton:

[Розмітка-IconButton-Component]

<!--
export const IconButton = ({ children, onClick, ...allyProps}) => (
  <button type="button" className="IconButton" onClick={onClick} {...allyProps}>
    {children}
  </button> )

  IconButton.defaultProps = {
  onCLick: () => null,
  children: null,
  }; -->

2. Створюємо папку icons --> в якій будуть зберігатись icon.svg

3. Імпортуємо бажану іконку як компонент:

- import {ReactComponent as NameIcon} from './icons/name.svg'
- передаємо іконку в розмітку як звичайний компонент
- В компоненті іконки ми можемо задавати стилі width, height, fill...

4. [Рендер-IconButton-Component-in-App]

<Container>
  <IconButton onClick={this.toggleModal}>
    <NameIcon width="40" height="40" fill="#fff"/>
  </IconButton>
</Container>

5. Якщо потрібна буде інша іконка, імпортує її {ReactComponent as ...Icon} і
   виконуємо вищезазначені кроки

В такому випадку ми отримуємо reusable-Component IconButton, яка буде приймати в
чілдрени різні іконки, а в onClick потрібний метод.

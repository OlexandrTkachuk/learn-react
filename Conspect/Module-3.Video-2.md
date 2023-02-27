## Reader with Tabs "Назад/Вперед"

npm install react-player бібліотека для роботи з відео

1. import ReactPlayer from 'react-player'

<!--
export class Player extends Component {
  state = {
    isVideoLoaded: false,
  }

  componentDidUpdate (prevState) {
    if(prevState.url !== this.props.url) {
      this.setState({ isVideoLoaded: false})
    }
  }

  render () {
    const {isVideoLoaded} = this.state;
    const {url} = this.props;
    const showLoader = url && !isVideoLoaded;

    const playerSize = isVideoLoaded ? '100%' : 0;

    return (
      <>
        {showLoader && <h2>Загружаєм відео</h2>}
        {url && (
          <div>
            <StyledPlayer
              url={url}
              width={playerSize}
              height={playerSize}
              onReady={() => this.setState({isVidoeLoaded: true})}
              controls
            />
          </div>
        )}
      </>
    )
  }
}
-->

2. Розмітка компонента Reader, який буде проймати props {items} json

<!-- export class Reader extends Component {
  state = {
    publicationIndex: 0,
  }

  changeIndex = (value) => {
    this.setState(prevState => (
      {publicationIndex: prevState.publicationIndex + value}))
  }

  render () {
    const currentItem = this.props.items[this.state.publicationIndex]

    return (
      <div>
        <section>
          <button
            type="button"
            onClick={() => this.changeIndex(-1)}
            disabled={this.state.publicationIndex === 0}
            >
              Назад
          </button>

          <button
            type="button"
            onClick={() => this.changeIndex(1)}
            disabled={this.state.publicatioIndex + 1 === this.props.items.length}
            >
            Вперед
          </button>
        </section>
        <p>
          {this.state.publicationIndex + 1}/{this.state.items.length}
        </p>
        <article>
          <h2>{currentItem.title}</h2>
          <p>{currentItem.text}</p>
        </acticle>
      </div>
    )
  }
} -->

3. Якщо натискаючи на кнопки-перемикачі "назад/вперед" ми вийдем за межі довжини
   масиву то в publicationIndex прийде значення undefined, а undefined.значення
   дасть undefined і у нас усе упаде. щоб пофіксити дану проблему, потрібно на
   кнопку повішати disabled.

- Відповідно для кнопки назад disabled={this.state.publicationIndex === 0},
  кнопка не неактивна якшо значення index буде 0 і в такому випадку ми не
  зможемо проклацати в -1

- Для кнопки вперед disabled={this.state.publicationIndex + 1 ===
  this.props.items.length}

4. Додаємо значення publicationIndex в localStorage:

- const LS-KEY = 'reader_item_index';

- <!-- componentDidUpdate(prevProps, prevState) {
    if (prevState.publicationIndex !== this.state.publicationIndex) {
      localStorage.setItem(LS_KEY, this.state.publicationIndex)
    }
  } -->

5. Отримуємо значення з localStorage:

- В зміну savedState записуємо значення з localStorage
- Робимо перевірку, якщо значення savedState === true тоді перезаписуємо
  значення this.state.publication

  <!-- componentDidMount() {
    const savedState = localStorage.getItem(LS_KEY);

    if(savedState) {
      this.setState({publicationIndex: index});
    }
  } -->

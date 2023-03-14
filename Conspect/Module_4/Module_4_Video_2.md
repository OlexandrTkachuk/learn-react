## how to skip first render in useEffect

[skip_first_render_for_fecth]

<!-- useEffect(() => {
  if(query === '') {
    return;
  }

  fetch().then().then()...
}) -->

або

<!-- if(!query) {
  return;
} -->

[skip_first_render_with_useRef]

<!-- const isFirstRender = useRef(true);

useEffect(() => {
if(isFirstRender.current) {
  isFirstRender.current = false;
  return;
}
  // next code
}) -->

При вищенаведеному коді useEffect буде ігнорувати перший рендед тому, що у нас є
блок if(isFirstRender.current), а буде відкликатись на наступні рендери і
оновлення розмітки тому, що ми змінили значення isFirstRender = false;

## useReducer

<!-- const [state, dispatch] = useReducer(reducer, initialState, init);

function countReducer(state, action) {
  if(action.type === 'increment') {
    return state + action.payload
  }

  else if(action.type === 'decrement') {
    return state - action.payload
  }

  else {
    thwor new Error(`Unsupported action type ${action.type}`)
  }
}

const [count, dispatch] = useReducer(countReducer, 0);

<button type="button" onClick={() => dispatch({type: 'increment', payload: 1})}>
  Увеличить
</button>

<button type="button" onClick={() => dispatch({type: 'decrement', payload: 1})}>
  Уменьшить
</button>
-->

## memo

Аналог для PureComponent - у випадку коли ми хочемо позбавитись ре-рендерингу
розмітки, наприклад коли клікаємо на один і той самий елемент ми не хочемо щоб
сторінка ре-рендерилась. Тоді ми писали class Name extends PureComponent. У
випадку з хуками ми всю нашу функцію огортаємо в [memo]

<!-- export const ColorPicker = memo(() => {

}) -->

##

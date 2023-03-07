import { useLocalStorage } from 'hooks/useLocalStorage';

export const SignupForm = () => {
  const [email, setEmail] = useLocalStorage('email', '');
  const [password, setPassword] = useLocalStorage('password', '');

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <form autoComplete="off">
      <label>
        <span>Почта</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>

      <label>
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Зареестрироваться</button>
    </form>
  );
};

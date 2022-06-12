// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header } from '@fullstack/header';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  return (
    <>
      <Header />
      <NxWelcome title="react-test" />
      <div />
    </>
  );
}

export default App;

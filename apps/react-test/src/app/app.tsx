// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header } from '@fullstack/header';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import ComponentTest from './component-test/component-test';
import { tsStudy } from '@fullstack/ts-study';

export function App() {
  tsStudy();
  return (
    <>
      <Header />
      <NxWelcome title="react-test" />
      <ComponentTest />
    </>
  );
}

export default App;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header } from '@fullstack/header';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import ComponentTest from './component-test/component-test';
import { tsStudy } from '@fullstack/ts-study';
import { proxy } from 'ajax-hook';
import { useEffect } from 'react';
proxy({
  //请求发起前进入
  onRequest: (config, handler) => {
    console.log(config.url);
    console.log(config);
    handler.next(config);
  },
  //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
  onError: (err, handler) => {
    console.log(err.type);
    handler.next(err);
  },
  //请求成功后进入
  onResponse: (response, handler) => {
    console.log(response.response);
    handler.next(response);
  },
});
export function App() {
  tsStudy();
  useEffect(() => {
    console.log('respose');
    function reqListener(this: any) {
      console.log(this.responseText);
    }

    const req = new XMLHttpRequest();
    req.addEventListener('load', reqListener);
    req.open('GET', 'http://www.example.org/example.txt');
    req.send();
  }, []);

  return (
    <>
      <Header />
      <NxWelcome title="react-test" />
      <ComponentTest />
    </>
  );
}

export default App;

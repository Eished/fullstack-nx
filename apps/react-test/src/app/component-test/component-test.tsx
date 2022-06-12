import styles from './component-test.module.scss';

/* eslint-disable-next-line */
export interface ComponentTestProps {}

export function ComponentTest(props: ComponentTestProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ComponentTest!</h1>
    </div>
  );
}

export default ComponentTest;

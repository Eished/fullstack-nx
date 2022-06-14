const test_11_4 = () => {
  class Person {
    #name: string;

    constructor(name: string) {
      this.#name = name;
    }

    greet() {
      console.log(`Hello, my name is ${this.#name}!`);
    }
  }

  const semlinker = new Person('Semlinker');

  // semlinker.#name; // Property '#name' is not accessible outside class 'Person'. because it has a private identifier.
  // 属性 "#name" 在类 "Person" 外部不可访问，因为它具有专用标识符。
};

const test_12_1 = () => {
  interface GenericIdentityFn<T> {
    (arg: T): T;
  }

  class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
  }

  const myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };
  console.log(myGenericNumber);
};

export function tsStudy(): string {
  test_11_4();
  test_12_1();
  return 'ts-study';
}

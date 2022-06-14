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

/**
 * 12.4 泛型工具类型
为了方便开发者 TypeScript 内置了一些常用的工具类型，比如 Partial、Required、Readonly、Record 和 ReturnType 等。出于篇幅考虑，这里我们只简单介绍 Partial 工具类型。不过在具体介绍之前，我们得先介绍一些相关的基础知识，方便读者自行学习其它的工具类型。
 */
const test_12_4 = () => {
  // typeof 操作符可以用来获取一个变量声明或对象的类型
  interface Person {
    name: string;
    age: number;
  }

  const sem: Person = { name: 'semlinker', age: 30 };
  type Sem = typeof sem; // -> Person
  console.log(typeof sem);

  function toArray(x: number): Array<number> {
    return [x];
  }

  type Func = typeof toArray; // -> (x: number) => number[]

  // keyof 操作符可以用来一个对象中的所有 key 值：
  interface Person {
    name: string;
    age: number;
  }

  type K1 = keyof Person; // "name" | "age"
  type K2 = keyof Person[]; // "length" | "toString" | "pop" | "push" | "concat" | "join"
  type K3 = keyof { [x: string]: Person }; // string | number

  // in 用来遍历枚举类型：
  type Keys = 'a' | 'b' | 'c';

  type Obj = {
    [p in Keys]: any;
  }; // -> { a: any, b: any, c: any }

  //  infer 声明一个类型变量并且对它进行使用。
  type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

  // extends 关键字添加泛型约束。
  interface ILengthwise {
    length: number;
  }

  function loggingIdentity<T extends ILengthwise>(arg: T): T {
    console.log(arg.length);
    // 必须有length属性
    return arg;
  }

  loggingIdentity({ length: 999 });

  // Partial<T> 的作用就是将某个类型里的属性全部变为可选项 ?。
  /**
   * node_modules/typescript/lib/lib.es5.d.ts
   * Make all properties in T optional
   * 代码中，首先通过 keyof T 拿到 T 的所有属性名，然后使用 in 进行遍历，将值赋给 P，最后通过 T[P] 取得相应的属性值。中间的 ? 号，用于将所有属性变为可选。
   */
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };

  interface Todo {
    title: string;
    description: string;
  }

  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
  };

  const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
  });
};
export function tsStudy(): string {
  test_11_4();
  test_12_1();
  test_12_4();
  return 'ts-study';
}

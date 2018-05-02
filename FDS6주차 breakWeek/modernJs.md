# Modern JavaScript

## 공부하면서 헷갈렸던 내용들을 이번 breakWeek때 다시한번 만져보고 싶습니다

## 1.1 호이스팅

```js
function getValue (condition){
  var value;
  if(condition){
    value = "blue";
    return value;
  }
  else{
    return null;
  }
}
```

### 결과

```js
=> undefined
   getValue();
=> null
   getValue(1);
=> 'blue'
```

자바스크립트를 처음 접하는 개발자는 호이스팅 선언에 익숙해지는데 시간이 걸리며, 이 독특한 동작을 잘못 이해하여 버그를 발생시키기도 한다. 이러한 이유로 ECMAScript6에서는 변수 생명 주기를 개발자가 더 잘 제어하도록 하기 위해 블록 레벨 스코프 옵션이 도입되었다.

## 블록 레벨 선언

블록-레벨 선언이란 주어진 블록 스코프 밖에서는 저근할 수 없는 바인딩을 선언 하는 것이다. 렉시컬 스코프로도 불리는 블록 스코프는 다음과 같은 곳에 만들어 진다

* 함수 내부
* 블록 내부({와}를 사용하여 지정)

많은 C기반 언어는 블록 스코프로 동작하며, 자바스크립트에서도 그와 같은 유연성을 제공하려는 의도로 ECMAScript6에 블록 레벨 선언을 도입했다.

### const로 객체 선언하기

const 선언은 바인딩을 변경하지 못하도록 하는 것이지, 바인딩 된 값의 변경을 막는 것은 아니다. 즉, 객체를 const로 선언해도 객체가 가진 값은 수정할 수 있다.

```js
const person = {
  name: "nicholas"
};

person.name = "Greg";

person = {
  name: "Greg"
}; // 에러발생
```

앞의 코드에서는 하나의 프로퍼티를 가진 객체를 초깃값으로 하여 person 바인딩을 만들었다. person.name을 변경하는 것은 person 객체가 가진 값을 변경하는 것이지 person변수에 대한 바인딩을 변경하는 것이 아니기 때문에 에러가 발생하지 않는다. 하지만 이 코드에서 person에 값을 할당하려고 하면 에러가 발생한다. 객체를 const로 선얼할 때 발생하는 이런 독특한 동작은 잘못 이해하기 쉽다. const는 바인딩된 값의 수정을 막는 것이 아니라, 바인디으이 수정을 방지한다는 것을 기억하자.

```js
var RegExp = "hello";
console.log(window.RegExp);
console.log(window.RegExp === RegExp);

var ncz = "Hi";
console.log(window.ncz);
```

let과 const 블록 바인딩은 자바스크립트에 이해하기 쉬운 렉시컬 스코프를 도입한다. 이 선언들은 호이스팅되지 않고 선언된 블록 안에서만 존재한다. 블록 바인딩은 변수가 꼭 필요한 곳에 바로 선언할 수 있기 때문에 다른 언어와 좀 더 유사한 동작을 제공하여 뜻하지 않은 에러를 감소시킬 것이다. 그러나 typeof와 같은 안전한 연산자들도 선언하기 전에 블록 바인딩에 접근하려고 시도하면, 바인딩이 TDZ에 있으므로 에러가 발생한다.

let 과 const는 대부분 var와 유사한 방식으로 동작한다. 그러나 반복문에서는 다르다. for-in, for or문에서, 반속 실행 시마다 let과 const는 각각의 새로운 바인딩을 만든다. 결과적으로 반복문 안에서 만들어진 함수는(var로 선언한 경우처럼) 최종 반복 이후에 바인딩된 값에 접근하는 것이 아니라 현재 반복문 바인딩 값에 접근할 수 있다. let 선언은 for문에서도 마찬가지로 잘 동작하는 반면, const 선언을 사용하면 에러가 발생할 수 있다.

### 스코프 연쇄

함수 내부 코드에서, 매개변수 혹은 그 함수 안에서 정의된 변수만 사용할 수 있는 것은 아니다.

```js
const five = 5;
function add5(x){
  return x + five;
}

add5(3);
```

add5함수의 return 구문에서 함수 바깥에 있는 변수 five의 값을 가져와 사용했다. 이는 심지어 함수가 여러 겹 중첩 되어 있다고 하더라도 가능하다.

```js
const five =5;
function add5(x){
  function add(y){
    return x+y;
  }
  return add(five);
}
add5(3);
```

코드의 실행 흐름이 식별자에 도달하면, 먼저 그 식별자와 같은 이름을 갖는 변수를 현재 스코프에서 찾아보고, 변수가 존재하면 그것을 그대로 사용한다. 만약 현재 스코프에서 변수를 찾지 못하면 바로 바깥쪽 스코프에서 변수를 찾아야 한다. 있으면 사용하고 없으면 바깥쪽 스코프로 올라가서 다시 찾아보는, 이 과정이 반복된다. 이런 과정을 스코프 연쇄라고 한다. 이 과정은 가장 바깥쪽에 있는 스코프를 만날 때까지 반복되며, 끝까지 갔는데도 같은 이름의 변수를 찾지 못하면, 그제서야 에러가 발생한다. 가장 바깥에 있는 스코프를 최상위 스코프 혹은 전역 스코프 라고 부른다. 위코드에서는 five가 전역 스코프이다.

```js
const add = function (x,y){
  return x+y;
}

const subtract = function(x,y){
  return x-y;
}

const division = function(x,y){
  return x/y;
}

const multiply = function(x,y){
  return x * y;
}
```

### this

다른 함수들과 달리 '메소드' 라는 특별한 이름을 사용하는 이유는, 메소드가 다른 함수들과는 다르게 특별히 취급되기 때문이다. this 키워드를 사용하면, 메소드 호출시에 해당 메소드를 갖고 있는 객체에 접근 할 수 있다.

```js
const person = {
  name: '윤아준',
  age : 19,
  introduce(){
    `return 안녕하세요 제 이름은${this.name}입니다. 제나이는 {this.age}입니다`
  },
  getOlder(){
    this.age++;
  }
};

person.introduce();//19
person.getOlder();// undefined
person.introduce(); // 20
```

메소드를 사용하면, 데이터와, 그 데이터와 관련된 동작을 객체라는 하나의 단위로 묶어서 다룰 수 있다. 이것이 함수 대신 메소드를 사용하는 핵심적인 이유다. 여기서 주의할 점이 function 키워드를 통해 정의된 함수 내부의 this 키워드가 실제로 무엇을 가리킬 것인가는, 메소드가 어떻게 정의되는가에 의해 결정되는 것이 아니라 메소드가 어떻게 사용되는가에 의해 결정된다.
** 어떤 객체의 메소드로 사용되느냐에 따라 메소드 내부의 this가 가리키는 객체가 달라질 수 있다.** 다만 화살표 함수는 this 키워드를 전혀 다르게 취급하기 때문에 위와같은 방식으로 메소드로 사용될 수 없다. 또한, function 키워드를 통해 정의된 메소드가 항상 위와 같은 방식으로 this를 취급하는 것은 아니다. 특별한 방법을 통해 아예 this를 우리가 원하는 객체로 바꿔버릴 수 있다.

함수 바디안에는 특별한 읽기 전용 값인 this가 있다. this는 일반적으로 객체지향 프로그래밍 개념에 밀접한 연관이 있다. 객체지향 프로그래밍 말고도 this를 사용하는 여러가지 방법이 있다. 일반적으로 this는 객체 프로퍼티인 함수에서 의미가 있다. 메서드를 호출하면 this는 호출한 메서드를 소유하는 객체가 된다.

```js
const o ={
  name: 'dongwon';
  speak():{ return `My name is ${this.name}!`;};
}

o.speak() // mynameis dongwon
```

메서드는 원래 객체지향 프로그래밍 개념이지만 객체의 프로퍼티이며 o.speak()처럼 객체 인스턴스에서 호출할 의도로 만든 함수라는 뜻이다. 함수에서 this를 사용하지 않으면 어디에서 관계없이 함수라고 부른다.

### 프로토 타입

프로토 타입 기능을 이용해 한 객체에서 다른 객체의 기능을 가져와 사용하는 것을 프로토타입 상속이라고 한다. personPerototype은 person1의 프로토타입이다. , person1객체는 personPrototype 객체를 상속받았다고 한다. 프로토타입 상속은 다른언어에서는 흔히 찾아 볼 수 없는 JS의 특징이다

```js
const personPrototype = {
  introduce: function(){
    return `HiHi, my name is ${this.name}!`;
  }
}

const person1 = Object.create(personPrototype);
person1.name = 'dongwon';

const person1 = Object.create(personPrototype);
person2.name = 'minji';

person1.introduce();
person2.introduce();

person1.introduce === person2.introduce;
```

### 프로토타입 읽고 쓰기

어떤 객체의 프로토타입을 읽어오기 위해 Object.getPrototypeOf 함수를 사용할 수 있다. 또하 Object.setPrototypeOf함수를 통해 이미 생성된 객체의 프로토타입을 변경할 수 있다. 하지만 객체가 생성된 이후에 프로토타입을 변경하는 작업은 굉장히 느리므로 Object.setPrototypeOf 함수의 사용은 피하는 것이 좋다.

```js
const parent = {
  familyName: '윤'
};

const child = Object.create(parent);

const newParent = {
  familyName: '신'
};

Object.setPrototypeOf(child, newParent);
Object.getPrototypeOf(child) === parent; // false
Object.getPrototypeOf(child)=== newParent; //true
```

객체 리터널을 통해 생성된 객체의 프로토타입에는 자동으로 Object.prototype이 지정된다.

```js
const obj = {};
Object.getPrototypeOf(obj)===Object.prototype; //true
```

### 프로토타입 체인

Js엔진은 객체의 속성만 확인하는 것이 아니라 프로토 타입 객체의 속성까지 확인한다. 그래서 프로토 타입에 해당 이름을 갖는 속성이 있다면 그 속성의 값을 반환한다. 만약에 프로토타입 객체에도 해당 이름의 속성이 없으면 어떻게 될까. 여기서 짚고 넘어가야할 것은 프로토타입 객체도 객체라는 것이다. 즉, 프로토타입 객체의 프로토타입 객체가 있을 수 있다. 이렇게 계속 이어져 있는 프로토타입의 연쇄를 프로토타입 체인이라 부른다. 이렇게 더이상 남아있는 프로토타입이 없을 때까지 확인해보고 그래도 찾지못하면 undefined를 반환한다. 즉 js엔진은 속성 접근자를 통해 어떤 객체의 속성을 확인할 때 프로토타입 체인을 전부 확인한다.

`obj1.isPrototypeOf(obj3)` // obj1은 boj3의 프로토 타입이다! true

### 프로토타입 체인의 끝

'속성에 접근할 때 더이상 프로토타입이 없을 때까지 프로토타입 체인을 확인한다'라는 뜻은 JS에서는 객체의 프로토타입으로 객체 또는 null이외의값을 설정할 수 없다. 그러므로 프로토타입 체인을 따라가다 보면 언젠가는 null을 만난다는 결론에 도달하게 된다. 프로토타입을 명시적으로  null로 지정하지 않아도, 언젠가는 Object.prototype 즉 프로토타입이  null인 객체를 만나게 된다.

### 생성자(Constructor)

객체를 생성하기 위해 객체 리터널 또는 Object.create 함수를 사용했는데 이것 말고도 new키워들르 이용하는 방법이 있다.

`const obj = new Object();`

`typeof Object; // function`

여기서 Object를 생성자라고 한다.

```js
function Person(name){
  this.name = name;
}

const person1 = new Person('윤아준');
```

생성자의 이름으로 식별자로 사용할 때 변수와는 다르게 대문자로 시작한다.

### 인스턴스

생성자를 통해 생성된 객체를 그 생성자의 인스턴스라고 한다.
`person1 instanceof Person; // true`
객체 리터럴을 통해 생성된 객체는 Object의 인스턴스다.

```js
const obj = {};
obj instanceof Object;
```

### 생성자와 프로토타입

생성자를 통해 만들어낸 객체의 프로토타입에는 생성자의 prototype 속성에 저장되어 있는 객체가 자동으로 지정된다.
`Object.getPrototypeOf(person1) === Person.prototype; //ture`

=> 함수도 특별한 형태의 객체이기 때문이다.

그리고 JS에서는 function 구문을 통해 함수를 정의할 때 함수의 prototype 속성에 객체가 자동으로 생성되어 저장된다.

```js
function Person(){

}

typeof Person.prototype // object
```

### constructor

생성자의 prototype 속성에도 자동 생성되는 객체에는 constructor이라는 특별한 속성이 있다.
이 속성에는 생성자 자신이 저장된다.

```js
function Person(){
}

Person.prototype.constructor === Person; //true
```

이를 통해 어떤 객체가 어떤 생성자로부터 생성되었는지 constructor를 통해 알아낼 수 있다.

```js
function Person(){}

const person = new Person();
person.constructor === Person;
```

### 정적 메소드

JS에서는 함수도 객체이다. 생정자의 속성에 직접 지정된 메소드를 가지고 정적 메소드 라고 한다. 우리가 이제까지 사용했던 Number.isNaN, Object.getPropertyOf 등의 함수는 모두 정적 메소드이다. 정적 메소드는 특정 인스턴스에 대한 작업이 아니라, 해당 생성자와 관련된 일반적인 작업을 정의하고 싶을 때 사용된다.

### Super 참조

```js
let person = {
  getGreeting(){
    return "Hello";
  }
};

let dog = {
  getGreeting(){
    return "Woff!";
  }
};

let friend = {
  getGreeting(){
    return Object.getPrototypeOf(this).getGreeting.call(this)+ ", Hi!";
  }
};

Object.setPrototypeOf(friend,dog);
console.log(friend.getGreeting());
Object.getPrototypeOf(friend) === dog; // true

// Object.setPrototypeOf(friend,person);
// console.log(friend.getGreeting());
```

super 를 사용하면 friend를 단축시킬 수 있다.

```js
let friend = {
  getGreeting(){
    return super.getGreeting() + " hi!";
  }
};
```

## 배열

배열은 JS에 내장되어 있는 자료구조이다. 배열은 객체의 일종이지만, 내부적으로 특별하게 취급되어 일반적인 객체들과는 다른 특징을 갖고 있다.
`typeof []; //Object`
배열 안에 들어 있는 값들을 요소(element)혹은 항목(item)이라고 한다. 객체와 배열의 가장 큰 차이점은 배열의 각 요소 간에는 순서가 있다.
배열은 Array 생성자의 인스턴스 이다. 그니까 배열의 프로토타입으로 Array.prototype 객체가 지정되어 있다. 이 객체에는 여러가지 메소드가 있다. [목록](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array#%EB%A9%94%EC%84%9C%EB%93%9C)

### 배열 생성하기

배열은 배열 리터널을 통해서 생성하는 것이 가장 쉽다.

```js
const empty = [];
const numbers = [1,2,3];
const mix = [1,'one', {prop:1}, null];
```

### Array 생성자

Array 생성자를 통해서도 배열을 생성할 수 있다. Array 생성자는 주어지는 인수에 따라 두가지 서로 다른 방식으로 동작한다.

1. 수타입의 인수가 하나 주어질 때는 해당 수 만큼의 길이를 갖는 비어있는 배열을 만들어 낸다.
2. 이 외에 다른 모양으로 인수가 주어지면 그 인수들를 요소로 갖는 배열을 생성한다.

```js
1.
new Array(1); //[ <1 empty item> ]
new Array(1000);//[ <1000 empty items> ]

2.
new Array(1,2,3) // [1,2,3]
```

이런 일관적이 못한 생성자 동작 방식 때문에 ES6에서 Array.of 라는 정식 메소드가 추가 되었다. 이 메소드는 두번째 방식으로만 동작한다. 따라서 Array 생성자를 사용할 때에는 첫번째 방식이 필요할 때만 1번을 사용하고 나머지는 2번 째 방식인 Array.of 방식을 사용한다.

```js
new Array[1,2,3] // 이렇게 말고
Array.of[1,2,3]; // 이렇게!!

Array.of[1]; // [1]          이 경우가 문제였지!
```

### Array.from

JS에는 유사 배열 객체와 iterable이라는 개념이 있어서 이에 해당하는 값들은 Array.from 정적 메소드를 통해 배열로 쉽게 변환될 수 있다.

```js
//'string' 타입은 래퍼 객체를 통해 iterable로 다루어진다.
Array.from('hello');
```

### 요소 수정하기

객체와 마찬가지로 대괄호 표기법을 통해 요소를 수정할 수 있다.

```js
const arr = [false,false,false]
arr[0] = true;
console.log(arr); // [true, false, false]
```

fill메소드를 사용하면 한꺼번에 많은 요소를 같은 값으로 바꿀수 있다.

```js
const arr = [1,2,3,4,5];

acc.fill(0); // 다 0으로 채워라
console.log(arr); // [0,0,0,0,0]

acc.fill(1,2,4); // 1을 2,4사이에 삽입해라
console.log(arr); // [0,0,1,1,0]
```

### 배열의 끝부분에서 요소를 추가/제거하기

push, pop 메서드

### 배열의 시작부분에서 요소를 추가/제거하기

unshift, shift 메서드

### 요소를 배열 중간에 삽입하기

splice메서드 는 배열에 속해있는 연속된 여러요소, 즉 배열의 일부분을 통째로 바꿔버릴수 있다.

```js
let arr = [1,2,3,4,5];

arr.splice(1,3,'two', 'three','four');
console.log(arr); // [1,'two', 'three', 'four', 5]
```

splice로 반드시 같은 개수의 요소만 바꿔치기할 수 있는 건 아니다.

```js
let arr = [1,2,3,4,5];
arr.splice(1,3,'three');
console.log(arr); // [1,'three',5];
```

splice의 뒤쪽 인수를 생략하면, 요소를 제거할뿐 배열에 아무것도 삽입되지 않는다.

이렇게 splice 메소드는 배열의 중간부분에 있는 요소를 제거하는데도 활용할 수 있다.

> 이것만 잘 활용하면은 굳이 push나 shift같은 메소드를 사용할 필요가 없을듯 하다

### 배열 정렬하기

배열의 sort메소드를 통해 원하는 방식대로 배열을 정렬할 수 있다.

```js
const arr = [3,1,4,5,2];

arr.sort((x,y) => x - y);
console.log(arr); //[1,2,3,4,5]
```

sort 메소드의 인수에는 비교함수를 넘겨주어야 한다. 비교함수는 인수 두개를 받아서 아래의 조건에 따라 잘 정렬되도록 적절한 값을 반환해주어야 한다.

---

만약 어떤 두 값 a,b에 대허서 비교 함수 compare를 compare(a,b)와 같이 호출했을때:

* 음수를 반환하면, a가 b앞에 오도록 정렬합니다.
* 0을 반환하면, a와 b를 같은 순서로 간주합니다.
* 양수를 반환하면, b가 a앞에 오도록 정렬합니다.

---
따라서, 어떤 배열을 정렬할 때에는 어떤 값을 기준으로 정렬할 지를 생각해 본 다음, 정렬 함수를 만들때 오름차순으로 정렬할지, 내림차순으로 정렬할지를 생각해보면 된다. 문자열의 길이를 기준으로  내림차순 정렬을 할수 도 있다.

```js
const names = ['dongwon', 'minji', 'arem'];
names.sort((x,y) => y.length - x.length);
console.log(names) // ['dongwon', 'minji]', 'arem']
```

여기서 주의할 점이 있다. 비교함수를 넘기지 않더라도 잘 정렬되는 것처럼 보이는경우! 하지만 인수로 넘겨주지 않으면, sort메소드는 **먼저 요소를 전부 문자열로 반환한후, 유니코드 코드포인트를 비교하는 방식으로 정렬을 한다.** 꼭 비교함수를 사용하자.

### 배열 순회하기

배열의 각 요소를 차례대로 돌면서 요소에 대한 작업을 하는것을 가지고 순회라고 한다. 배열을 순회하는 방법에는 여러가지 방식이 있다.

#### for

위 구문은 전통적으로 많이 쓰이던 방식이엇으나 forEach와 for...of구문이 추가된후 잘 쓰이지 않는다.

#### forEach

배열의 forEach메소드를 사용하면, 배열의 각 여소에 대해 함수를 호출할 수 있다.

```js
const arr = [1,2,3];

arr.forEach((item, index, array) => {
  console.log(`${index+1}번째 요소이고 item은 ${item}이다);
})
```

#### for...of구문

이구문은 iterable을 순회하기 위해 사용할 수 있다. 배열 역시 iterable이므로 for...or를 통해 순회가 가능한다.

```js
const arr =[1,2,3,4,5];

for (let item of arr){
  console.log(item);
}
```

단순 배열 순회 목적은 for...of가 좋으나 인덱스가 필요한 경우에는 forEach 코드의 실행속도가 정말 중요한 부분에서는 for를 써라

### 배열로부터 새로운 값 생성

배열을 다루다도면 배열로부터 다른 배열, 혹은 다른 값을 계산해내야 하는 작업을 많이하게 됩니다. 배열을 순회하는 것만으로도 이런 작업들을 할 수는 있지만, 배열에 내장된 메소드를 활용하면 훨씬 더 간결한 코드로 같은 작업을 할수 있다. 아래 메소드들은 원본 배열에 아무런 영향도 미치지 않다.

### slice 메소드

slice메소드는 배열의 일부분에 해당하는 새로운 배열을 반환한다.

```js
const arr = [1,2,3,4,5];

const newArr = arr.slice(2,4); // [3,4]

newArr[0] = 5;
console.log(newArr); // [5,4]
console.log(arr); // [1,2,3,4,5]
```

### map 메소드

map메소드는 배열의 각 요소에 함수를 적용해서, 그 반환값을 요소로 갖는 새로운 배열을 만든다.

```js
const arr = [1,2,3,4,5];

const newArr = arr.map(item => item**2);
console.log(newArr); // [1,4,9,16,25]
```

map역시 인수로 들어온 함수를 호출할 때 세 개의 인수를 넘긴다. 이는 forEach와 같다.

```js
arr.map((item, index, array)=>{
  return item * index;
});
```

### concat

위 메소드는 여러 배열을 연갤해서 새 배열을 만들 때 사용된다.

### reduce

reduce메소드는 모든 요소의 값을 종합해서 하나의 값으로 만드는 계산을 할때 사용된다.

```js
const arr = [1,2,3];

arr.reduce((acc,item) => acc + item,0); // 6
```

reduce의 포인트는 **초기값을 설정해 주는것!! 위코드에서는 0이 그에 속한다**

### filter

filter메소드를 통해 배열에서 원하는 요소만을 골라내어 새로운 배열을 생성할 수 있다. filter 메소드에는 진리값을 반환하는 함수를 주어야 한다. 이처럼 진리값을 반환하는 함수를 predicate라고 한다.

`arr.filter(item => item % 2 ===0);`
위 함수 역시 forEach와 마찬가지로 (현재요소, 인덱스, 배열)의 세 인수를 받는다

### join

join 메소드는 배열의 요소들을 문자열로 받은후, 메소드에 주어진 구분자를 이용해 하나의 문자열로 결합하여 반환

`arr.join(); //'1,2,3,4,5'`

### 요소찾기

indexOf와 lastIndexOf 메소드를 사용하면 특정 요소가 배열의 몇 번째에 위치하는지를 알아낼 수 있다.
indexOf는 왼쪽 lastIndexOf는 오른쪽에서 시작하고 일치하는 요소 없으면 -1 반환

```js
const arr = ['a','b','c','d','e'];

arr.indexOf('b'); // 1
arr.lastIndexOf('b'); // 3

arr.indexOf('z'); // -1
arr.lastIndexOf('z'); // -1

arr.indexOf('b', 2); //3
```

### 배열이 특정 조건을 만족하는지 판별하기

배열의 세 메소드 includes, every, some는 모두 배열이 특정 조건을 만족하는지를 나타내는 진리값을 반환한다.

#### includes

includes는 진리값을 반환하므로 indexOf보다 편하다. includes메소드 역시 시작 인덱스를 인수로 받는다
>const arr =['one', 'two', 'three'];
`arr.includes('one');` //true

#### every

predicate을 인수로 받아서, 모든 요소가 조건을 만족하는지 검사한다.

```js
const arr =['one', 'two', 'three'];

arr.every(item => item.length > 2) //true
arr.every(item => item.legnth > 2343) // false
```

#### some

predicate을 인수로 받아서, 조건을 만족하는 요소가 하나라도 있는지 검사

```js
const arr =['one', 'two', 'three'];

arr.some(item => item.length > 3) //true
arr.some(item => item.legnth > 5) // false
```

### 배열인지 아닌지 판별

```js
Array.isArray([]); // true
Array.isArray({}); // false
Array.isArray('hello'); // false
```

### 문자열과 배열

문자열은 배열과 유사한 문법을 통해 다뤄질 수 있다. 그리고 문자열의 메소드 중에는 배열의 메소드 중 몇몇과 이름이 같고 완전히 같은 방식으로 동작하는 것들이 있다.

### 다차원배열

컴퓨터를 사용하다보면 표 형태의 자료를 많이 다루게 된다. JS에서는 표 형태의 자료를 간단히 나타내기 위해 배열을 요소로 갖는 배열을 사용할 수 있다.

```js
const table = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];

table[0][1]; //2
```

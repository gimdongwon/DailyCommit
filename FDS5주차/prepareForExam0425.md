# 시험 대비 복습 2단원(180425)

## 2.1 값 다루기

값과 리터럴
프로그래밍을 하며 가장 많이 하는 일은 값을 다루는 것이다.
프로그래밍에서 언어에서 값을 생성하는 가장 쉬운 방법은 리터럴을 사용하는 것이다. 리터널을 값의 표기법으로, 프로그래밍 언어마다 값을 표현하는 여러가지 리터럴을 가지고 있다.

### 변수 
값을 한번 생성한 뒤에 다시 쓰지 못한다면 아주 간단한 프로그램밖에 만들지 못할 것이다. 그래서 프로그램이 언어에서는 대개 **값에 이름을 붙여서 다시 쓸수 있게 만드는 기능**이 존재 한다. js에서는 여러가지 방법을 통해 갑을 다루는데 그중에 2가지를 소개한다. let,const이다.
let은 선언과 동시에 대입을 해도 되고 안해도 된다. 이미 값이 대입되어있는 변수에 다른값을 대입할 수도 있다. 하지만 재 선언은 되지않는다.
const는 재대입이 불가능하다. 그리고 변수를 선언할때 반드시 값을 대입하여야 한다. 마찬가지로 재선언은 허용되지않는다.

### 식별자

위에서 사용한 변수의 이름은 모두 식별자 이다. 프로그래밍 언어에서 식별자는 어떤 개체를 유일하게 식별하기 위해 사용된다. js는 
아래 규칙을 따라야 한다.

* 숫자, 알파벳, 달러문자, 언더스코어가 포함될 수 있다.
* 단, 숫자로 시작되어서는 안된다.
* 예약어는 식별자가 될 수 없다.

```js
const foo;
const _bar123;
const $;
const 7seven; // 숫자 맨앞이라 안됨
const const; // 예약어는 식별자 x 
```

### 타입

js를 비롯한 여러 프로그래밍 언어는 여러가지 종류의  값을 지원하는데, 이러한 값의 종류를 가지고 자료형이라고 부른다. 줄여서 타입이라고도 부른다.

```js
typeof 1; // num
typeof 'hello'; //string
```

## 2.2 number 타입

number 타입 리터럴에는 여러가지 리터럴이 있다.
1. 정수 리터럴
2. 부동 소수점 리터럴
3. 2진수 리터럴 (0b)
4. 8진수 리터럴 (0o)
5. 16진수 리터럴 (ox)

```js
0x4d === 77;
0b1001101 === 77;
```

### 정수인지 실수인지 팔별하기

다른 많은 프로그래밍 언어와는 다르게, js는 정수와 실수를 별도의 타입으로 다루지 않는다. 다만 어떤 수가 정수인지, 혹은 실수인지를 판별할 수 있고 이를 위해 Number.inInteger메소드를 사용한다.

```js
Number.inInteger(1); //true
Number.inInteger(0.1); //false
```

### number 타입에 대한 연산

number 타입에 대해 아래와 같은 연산자를 사용해 연산을 할 수 있다.
헷갈리는 것 정도가 ..

할당연산 x += 1; 이것이 x = x + 1; 이거랑 같은것 과

'==' 과 '==='의 명확한 차이정도 인데 ===는 참조의 위치까지 가리킨다. 정도로 이해하면 될련지... 조사 해보자!

== | ===
---|-----
느슨한 같음은  두값이 같은지 비교한다. 두값을 공통형으로 변환한후 최종같음 비교는 꼭 ===처럼 수행된다. 느슨한 같음은 대칭이다. | 엄격한 같음이라고 한다. 두값이 같은지 비교하는데 어느 값도 비교되기 전에 어떤 다른 값으로 남몰래 변환되지 않는다. 둘이 서로 다른형이면 둘은 같지 않다고 여긴다. 그렇지 안혹 둘이 같은 형이고 숫자가 아닌경우, 같은 값이면 같다고 여긴다.
강제형변환 | 타입까지 비교
느슨한놈 | 엄격한놈

### 연산자 우선순위

거의 대부분이 좌결합성 성질을 가지나 몇몇이 우결합성을 가진다. '**'와 전위 증감소, 논리 연산자들이 그렇다

### 부동 소수점 vs 고정 수수점

`0.1 +0.2 의 결과`
계산의 오차가 있는 이유는 컴퓨터는 10진수를 정확히 다룰 수 없기 때문이다. 컴퓨터는 binary계산 구조형식을 가지기 때문인데 고치지 않는 이유는 계산상의 효율성을 위한 것이다. 금융권에서는 오차가 중요하기 때문에 전용라이브러리등을 활용하여 해결하나 우리는 평범하게 사용한다.

### number타입의 특이한 값들

```js
* NaN
* -0
* Infinity
* -Infinity
```

NaN은 'Not a Number'의 약자로 계산 불가능한 연산의 결과값을 나타내기 위해 사용된다. js의 값중에서 유일하게 자기자신과 같지 않은 값이다. 어떤 갑이 NaN인지 판별하기 위해서는 일반적인 비교 연산자를 사용하면 안되고 대신 Number.isNaN이나 Object.is함수를 사용해야 한다.

```js
Number.isNaN(thisIsNan);//true
Object.is(thisIsNan,NaN);//true
```

### parseInt, parseFloat

문자열을 number타입으로 바꾸기 위해 parseInt 혹은 parseFloat 함수로 사용할 수 있다.

```js
parseInt('123')//123
parseInt('110',2) // 6 (2진수로 바꿔라)
parseFloat('12.345')//12.345
parseInt('hello'); //NaN
```

### 다른 타입과의 연산

js는 num타입과 다른타입간의 연산도 허용하지만 그결과가 우아하지는 않다.
일관적이지 않으므로 웬만하면 피하자!
만약 문자열과 하게된다면 수연산전에 모든 피연산자를 확실히 number타입으로 만들어 주는것이 좋다.

### Math 객체

js에 내장된 Math객체는 많은 메소드와 상수들이 내장되어 있다.
그중 가장 많이 쓰는것 

```js
Math.floor //내림
Math.trunc //소수점 자르기
Math.random // 랜덤
```

### number 타입의 메소드

number 타입은 객체가 아니지만, 마치 객체처럼 메소드를 사용할 수 있다. 이는 js가 래퍼객체라는 기능을 제공하기 때문이다.

### 래퍼객체

원시 타입의 값은 객체가 아님에도 불구하고, 원시 타입에 점 표기법을 써서 메소드를 호출하거나 속성을 읽어올 수 잇는데 이는 js가 래퍼객체라는 기능을 제공하기 때문이다. 원시타입의 값에 대해 속성을 읽으려고 시도하면, 그 값은 그 순간에만 객체로 변환되어 마치 객체인 것처럼 동작한다.

```js
const s = 'hello';
s.toUpperCase();
s.length;

const n = 1.2345;
n.toFixed(2); // '1.23'

const b = true;
b.toString(); // 'true'

(12345).toString(); // '12345'
(12345).toLocaleString(); // '12,345'
(1.2345).toFixed(2); // '1.23'
```

아래는 래퍼 객체를 생성시키기 위해 사용되는 생성자들의 목록

* String
* Number
* Boolean
* Symbol

## 2.3 String

컴퓨터 분야에서는 문자의 나열이라는 듯에서 문자열을 'string'이라 부른다. string 타입을 통해 일반적인 텍스트 데이터를 다룰 수 있다.js는 문자열을 내부적으로 unicode를 통해 표현된다.

### 템플릿 리터럴

템플릿리터럴을 사용하려면 backtick(`)으로 둘러싸면 된다.

```js
const name1 = 'dong';
const name2 = 'won';
const sentence = `${name1} meets ${name2}!`;
console.log(sentence);

name1 + 'meets' +name2 + '!';
```

또한 템플릿 리터럴을 사용하면 여러줄로 이루어진 문자열을 쉽게 표현할 수 있다.

### Escape Sequence

js에서 특수문자를 문자열에 넣거나, 혹은 직접 유니코드 코드포인트를 사용해서 문자를 넣을 수 있도록 해주는 escape sequence를 제공한다.
```js
console.log('lorem \'ipsum\''); // lorem 'ipsum'
console.log('line\nfeed'); // line(줄바꿈)feed
console.log('\uD55C\uAE00'); // 한글
console.log('\u{1F435}'); 
```

### 문자열과 연산자

수 타입 뿐 아니라 문자열에 대해서도 여러가지 연산자를 쓸 수 있다.

```js
// 문자열 연결하기
'hello' + 'world'; // 'helloworld'

// 등호 비교
'hello' === 'hello'; // true
'hello' !== 'hello'; // false

// 유니코드 코드포인트 비교. 앞에서부터 한 글자씩 차례대로 비교합니다.
'a' < 'b'; // true
'aaa' < 'abc'; // true
'a' < 'Z'; // false
'한글' < '한국어'; // false
'2' < '10'; // false

// 문자열을 배열로 바꾸기
[...'hello']; // ['h', 'e', 'l', 'l', 'o']
```

위에서 알수 있듯 유니코드는 사전순 비교가 아니다. 사전순 비교를 하려면 localeCompare메소드를 사용해야한다.

### 속성 및 메소드

number 타입과 마찬가지로 string타입도 래퍼 객체의 속성과 메소드를 사용할 수 있다. 아래는 자주 쓰이는 몇개의 소것ㅇ과 메소드에 대한 예제다.

```js
// 문자열의 길이 알아내기
'hello'.length

//여러 문자열 연결하기
'kim'.concat('dong','won');

//특정 문자열을 반복하는 새 문자열 생성하기
'*'.repeat(3);

//특정 문자열이 포함되어 있는지 확인하기
'hello javascirpt'.includes('hello'); // true
'hello javascirpt'.startsWith('he'); //true
'hello javascript'.endWith('ript');
'hello javascript'.search('java'); //java가 몇번재에 등장하는 지 찾는 놈 => 6

//문자열의 특정 부분을 바꾼 새 문자열 생성하기
'hello javascript'.replace('java', 'type'); // hello typescript

// 문자열의 일부를 잘라낸 새 문자열 생성하기
'hello'.slice(2,4); // => 'll'

// 좌우 공백 문자를 제거한 새 문자열 생성하기
'   hello  '.trim(); // 'hello'
'   hello  '.trimLeft(); // 'hello  '
'   hello  '.trimRight(); // '   hello'

// 좌우 공백 문자를 추가한 새 문자열 생성하기
'hello'.padStart(8); // '   hello'
'hello'.padEnd(8); // 'hello   '

// 문자열을 특정 문자를 기준으로 잘라 새 배열 생성하기
'hello!fun!javascript'.split('!'); // ['hello', 'fun', 'javascript']
'hello'.split(''); // ['h', 'e', 'l', 'l', 'o']

//모든 문자를 소문자, 혹은 대문자로 변환한 새문자열 생성
'hello'.toUpperCase(); // 'HELLO'
'HELLO'.toLowerCase(); // 'hello'
```

## 2,4 boolean타입

boolean 타입에 해당하는 값은 true, false 두가지 밖에 없다. 이 값들을 '진리값'이라고 부른다. 프로그래밍에서의 진리값은 어떤 조건이 참인지 거짓인지를 나타내기위해 사용한다.

## 논리 연산자

```js
true || true; // t
true || false; // t
false || true // t
false || false // f
true && true; // t
true && false; // f
false && true; // f
false && false; // f

true ? 1 : 2; // 1
false ? 1: 2; //2
```

### truthy & falsy

js에서는 boolean타입이 와야 하는 자리에 다른 타입의 값이 와도 에러가 나지않고 실행된다.

```js
if(1){
  console.log('this code is executed');
}

if(0){
  console.log('this code does not execute')
}
```

이렇게 어떤 값들은 true로, 어떤 값들은 false로 취급되는데, 전자를 truthy, 후자를 falsy라고 부른다. js에서는 아래의 값들은 모두 falsy이고 이를 제외한 모든 값들은 truthy입니다.
* false
* null
* undefined
* 0
* NaN
* ''

truthy와 falsy를 활용하면 짧은 코드를 작성할 수 있지만, 코드의 의미가 불분명해지거나 논리적으로 놓치는 부분이 생길 수 있기 때문에 주의해서 사용해야 한다.

### 다른 타입의 값을 진리값으로 변환하기

어떤 값을 명시적으로 boolean타입으로 변환해야 할 때가 있는데, 그때 두가지 방법이 있다.
`!!'hello'; //true
Boolean('hello'); //true`

## null 과 undefined

js에는 '없음을 나타내는 값이 두개가 있는데 null과 undefined이다 두 값의 의미는 비슷하지만, 각가이 사용되는 목적과 장소가 다른다. js는 값이 대입되지 않는 변수 혹은 속성을 사용하려고 하면 undefined를 반환한다.
```js
let foo;
foo //undefined

const obj = {};
obj.prop //undefined
```

null은 '객체가 없음'을 나타낸다. 실제로 typeof 연산을 하면 아래값을 반환한다.

```js
typeof null //object
typeof undefined // undefined
```

개발자의 입장에서 '없음'을 저장하기위해서는 항상 null을 하는 것이 좋다. 다만 객체를 사용할 때에는 어떤 속성의 부재를 null을 통해 나타내는 쪽보다는, 그냥 속성을 정의하지 않는 방식이 간편하므로 더 널리 사용된다.

```js
// 이렇게 하는 경우는 많지 않습니다.
{
  name: 'Seungha',
  address: null
}

// 그냥 이렇게 하는 경우가 많습니다.
{
  name: 'Seungha'
}

// 어쨌든 이렇게 하지는 말아주세요.
{
  name: 'Seungha',
  address: undefined
}
```

### Null Check

null 이나 undefined는 어떤 변수에도, 어떤 속성에도 들어있을 수 있기 때문에 우리는 코드를 짤 때 값이 있는 경우와 없는 경우(즉 null 혹은 undefined인 경우) 를 모두 고려해서 코드를 짜야할 필요가 있스빈다. 어떤 값이 null 혹은 undefined인지 확인하는 작업을 null check라고 한다. null check는 간단한 등호로 할수 있다.

```js
function printIfNotNull(input){
  if(input !==null && nput !==undefined){
    console.log(input);
  }
}
```

너무 기니까 if문을 요약하면

```js
// 아래 세 개의 식은 완전히 같은 의미입니다.
input !== null && input !== undefined;
input != null;
input != undefined;

// 아래 세 개의 식은 완전히 같은 의미입니다.
input === null || input === undefined;
input == null;
input == undefined;
```

여지껏 세글자 짜리 등호만을 사용하라고 했었는데 null check에는 ==을 쓰는 것이 유용하다. ==은 null과 undefined둘다 반환하기 때문이다.

## 2.6 함수

프로그래밍에서의 함수란, 큰 프로그램을 잘게 쪼개어 특정 코드 뭉치를 반복해서 사용할 수 있도록 묶어놓은 코드 뭉치의 단위를 말한다. 함수를 어떠헥 작성하느냐에 따라서 코드의 유지보수성과 가독성이 크게 달라진다. 또 js의 함수는 굉장히 많은 기능을 갖고 있는 데 함수의 성질을 모두 이해하면 프로그래밍 언어로서의 js를 전부 이해한것이나 마친가지다.

### 함수의 구성요소

두값을 더하는 아주 간단한 함수를 정의해 보자.

```js
function add(x,y){
  const result = x + y;
  return result;
}
```

위에서 add라는 이름을 갖는 함수를 정의햇다 괄호 안의 x와 y를 매개변수라고 하고 return뒤에오는 값을 반환값이라고 한다.
함수를 정희했다면 아래와 같이 함수 이름 뒤에 괄호를 붙여서 이 함수를 실행시킬수 있다. 이를 함수의 호출이라고 한다.
àdd(2,3); //5`
여기서 2,3을 인수라고 한다.

### 실행순서

js 는 기본적으로 쓰여진 순서대로 실행되지만, 여러가지 예외가 존재해서 코도의 실행순서가 이리저리 옮겨 다니기도 한다. 함수 호출도 그중 하나로, 함수 호출 코드를 만나면 코드의 실행 흐름이 호출된 함수의 내부로 옮겨 간다. 함수가 값을 반환하면 다시 이전 위치부터 코드의 실행이 재개된다.

```js
//1. 함수 정의
function add(x,y){
  return x + y; //3 - 함수실행
}
//2.함수호촐
const result = add(2,3);
//4 나머지 코드 실행
console.log(result);
```

유의할 점은 함수를 정의하는 것만으로는 함수 내부에 있는 코드가 실행되지 않는다는 것이다. 함수 내부의 코드를 실행하려면 반드시 함수를 호출해 주어야한다.

### 매개변수와 인수

위 코드의 x,y를 가지고 매개 변수라고 한다. 매개 변수는 변수의 일종으로 함수 호출 시마다 인수가 매개변수에 대입된다. 주의할 점은 매개변수는 바깥에서 선언된 변수와는 관계없는 독립적인 변수라는 것이다. 예를 들어 함수 호출시 인수가 들어갈 자리에 변수를 써주고, 함수 내부에서 매개변수에 새로운 값을 대입한다고 하더라도 인수로 써준 변수의값이 변경되지 않는다.

```js
function reassign(x){
  x =2;
  return x;
}

const y = 1;
const result = reassign(y);

console.log(y);
console.log(result);
```

매개변수는 let으로 선언한 변수와 비슷하게 동작하지만 미묘하게 다른 점이 있습니다.

### 스코프

변수는 코드의 일정 범위안에서만 유효하다는 성질을 갖는다. 이렇게 특정 변수가 유효한 코드상의 유효 범위를 가지고 스코프라고 한다. 

### 스코프 연쇄 (Scope Chain)

함수 내부 코드에서, 매개변수 혹은 그 함수 안에서 정의된 변수만 사용할 수 있는 것은 아니다.

```js
1.
const five = 5;
function add5(x){
  return x + five;
}
add5(3) // 8

2.
const five = 5;
function add5(x) {
  function add(y) {
    return x + y;
  }
  return add(five);
}
add5(3); // 8
```

코드의 실행 흐름이 식별자에 도달하면, 먼저 그 식별자와 같은 이름을 갖는 변수를 현재 스코프에서 찾아보고, 변수가 존재하면 그것을 그대로 사용한다. 만약 현재 스코프에서 변수를 찾지 못하면 바로 바깥쪽 스코프에서 변수를 찾아본다 있으면 사용하고 없으면 바깥쪽 스코프로 올라가서 다시 찾아보는 과정이 되풀이 된다. 이를 스코프 연쇄라고 한다. 가장 바깥쪽 스코프에서 못찾으면 그때 에러가 발생된다. 가장 바깥에 있는 소코프를 전역 스코프라고 부른다.

### 변수 가리기

단일 스코프에서는 같은 이름을 갖는 다른 변수가 존재 할수 없었다. 하지만 스코프 연쇄가 일어나면 다르다.

```js
const x=3;

function add5(x){
  function add(x,y){
    return x + y;
  }
  return add(x,5);
}
add5(x);
```

이런 현상을 변수 가리기 라고 한다.

### 어휘적 스코핑

스코프는 코드가 작성된 구조에 의해서 결정되는 것이지, 함수 호출의 형태에 의해 결정되는 것이 아니다

```js
function add5(x){
  const five = 5;
  return add(x);
}
add5(3); // 8

function add(x){
  return five + x;
}
```

add라는 함수가 add5라는 함수 안에서 호출되었다고 해서, add 함수 내부에서 add5함수의 스코프 안에 있는 변수에 접근할 수 있는것은 아니다 스코프는 코드가 작성된 구조에 의해 결정되는 성질이다. 위코드는 아래와 같이 바꿔야 동작한다.

```js
function add5(x){
  const five =5;
  function add(x){
    return five + x;
  }
  return add(x);
}
```

### 값으로써의 함수

```js
function add(x,y){
  return x + y;
}

const plus = add;
plus(1,2) //3
```

다른값과 마찬가지로, 함수를 선언한 뒤 변수에 대입해서 호출할 수도 있고, 혹은 배열이나 객체에 넣을수도 있고, 심지어는 함수를 다른 함수에 인수로 넘기거간 함수에서, 함수를 반환할 수도 있다.

```js
//함수를 배열이나 객체에 넣기
function add(x,y){
  return x + y ;
}
[add];
{addFunc: add};

//함수를 인수로 넘기기
function isEvan(x){
  return x % 2 ===0;
}
[1,2,3,4,5].filter(isEven); //[2,4]

// 함수에서 함수 변환하기
function createEmptyFunc(){
  function func(){}
  return func;
  }
```

### 익명함수

js에서 함수를 선언할 때 꼭 이름을 붙여주어야 하는것은 아니다. 아래와 같이 이름을 붙이지 않는 함수를 익명함수라고 한다. 혹은 함수 리터럴 이라고 한다.

```js
//두수를 더해서 반환하는 익명함수
function (x,y){
  return x + y ;
}
// 위의 익명 함수는 이름이 없어서 이름을 가지고 호출을 할 수 없다.

//호출을 하려면 벼눗에 저장한 후에 변수의 이름을 통해 호출해야 한다.
const add = function (x,y){
  return x + y;
}
add(1,2); //3
```
익명함수는 함수를 만든 쪽이 아니라 다른쪽에서 그 함수를 호출할 대 많이 사용된다. 대표젹인 경우는 함수를 인수로 넘겨 줄때 이다. 예를 들어 배열의 filter메소드에 필터링할 조건을 표현하는 함수를 넘겨주면 filter 메소드 쪽에서 배열 각 요소에 대해 함수를 호출한 뒤, true를 반환한 요소만을 필터링해서 반환한다.

```js
[1,2,3,4,5].filter(function(x){
  return x % 2 === 0;
}) //[2,4]
```

###화살표 함수

`const add = (x,y) => x + y;`

```js
// 바로 반환시키지 않고 function 키워드를 통한 함수 정의처럼 여러 구문을 사용하려면 curly braces({...})로 둘러 쌓여야 한다.
//'=>' 다음 부분을 중괄호로 둘러싸면, 명시적으로 'return'하지 않는 한 아무것도 반환되지 않는다.
const add = (x,y) => {
  const result = x +y;
  return result;
}

//매개변수가 하나밖에 없다면, 매개변수 부분의 괄호를 쓰지 않아도 무방하다.
const negate = x => !x;

// 화살표 함수는 표기법이 간단하기 때문에 익명 함수를 다른 함수의 인수로 넘길 때 주로 사용된다.
[1,2,3,4,5].filter(x => x % 2 === 0);
```

일반적인 함수와 화살표 함수는 표기법에서만 다른 것이 아니고, 몇가지 미묘한 차이점이 있다.

## 2. TIL

25일 오늘 다하고 싶었으나 학교 중간고사로 인해서 잠시 중단하고 break week 때 마무리 하겠다.

예전에 알았다고 생각했던 부분들이 다르게 느껴지고 새롭게 다가온다. 다시한번 짚고 넘어가는 과정이고 조금 더 javascript에게 

다가가는 시간이 되길 기원한다.


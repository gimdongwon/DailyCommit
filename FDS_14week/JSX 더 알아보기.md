# JSX 더 알아보기

근본적으로, JSX 는 그저 React.createElement(compoennt, props, ...children)에 대한 문법 설탕을 제공할 뿐이다. 다음 JSX 코드는

```js
<MyButton color="blue" shadowSize={2}>
  Click me
</MyButton>
```

이렇게 컴파일 된다.

```js
React.createElement(MyButton, { color: "blue", shadowSize: 2 }, "Click me");
```

자식이 없으면 자기 자신을 닫는 형태의 태그를 사용할 수도 있다. 즉,

`<div className="sidebar" />`

위의 코드는 이렇게 컴파일 된다.

```js
React.createElement("div", { className: "sidebar" }, null);
```

특정 JSX 가 JavaScript 로 어떻게 컴파일되는지 시험해 보고 싶다면 Babel 이용하시오

## React 엘리먼트의 타입 지정하기

JSX 태그의 첫 부분은 React 엘리먼트의 타입을 결정한다.

대문자로 시작하는 타입은 해당 JSX 태그가 React 컴포넌트임을 가리킨다. 이 태그들은 값은 이름을 가진 변수를 직접 참조하도록 컴파일 된다. 그러니까 <Foo /> 같은 JSX 표현을 사용하려면 Foo 가 반드시 스코프 내에 존재해야 한다.

React 가 스코프 안에 있어야 한다.

JSX 는 React.createElement 을 호출하는 코드로 컴파일되기 때문에, React 라이브러리가 JSX 코드의 스코프 안에 항상 존재해야만 한다.

예를 들어, 아래의 코드에서 React 와 CustomButton 이 JavaScript 에서 직접 참조되지 않을지라도, 위쪽의 두 import 를 꼭 써줘야 한다.

```js
import React from "react";
import CustomButton from "./CustomButton";

function WarningButton() {
  return <CustomButton color="red" />;
}
```

만약 JavaScript 번들러를 사용하지 않고 <script />태그를 통하여 React 를 불러왔다면, 이미 라이브러리가 React 전역 변수로서 스코프에 존재하므로 별도의 처리를 해줄 필요가 없다.

## JSX 타입을 위한 점 표기법 사용하기

JSX 안에서 React 컴포넌트를 참조하기 위해 점 표기법을 사용할 수도 있다. 이 방법은 하나의 모듈에서 여러 React 컴포넌트를 export 하는 경우에 편리하게 쓸수 있다. 예를 들어, MyComponent.DatePicker 가 컴포넌트라면 다음과 같이 JSX 안에서 직접 참조할 수 있다.

```js
import React from "react";

const MyComponent = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
};

function BlueDatePicker() {
  return <MyComponent.DatePicker color="blue" />;
}
```

## 사용자 정의 컴포넌트는 대문자로 시작해야한다.

엘리먼트 타입이 소문자로 시작한다는 것은 그것이 div or span 와 같은 내장 컴포넌트라는 것을 뜻한다. 이 컴포넌트들은 결과적으로 'div' or 'sapn'같은 문자열의 형태로 React.createElement 에 전달된다. <Foo/> 와 같이 대문자로 시작하는 타입은 React.createElement(Foo)와 같이 컴파일되며, 따라서 여러분의 JavaScript 파일에 정의되어있거나 혹은 다른 파일에서 import 된 컴포넌트여야 한다.

컴포넌트 이름을 지을 때는 대문자로 시작하는 이름을 사용하는 것이 좋다. 만약 컴포넌트의 이름이 소문자로 시작한다면, 대문자로 시작하는 변수에 할당한 뒤 JSX 에서 이 변수를 사용해라

예를 들어 아래코드는 우리가 기대한 대로 동작하지 않는다.

```js
import React from "react";

function hello(props) {
  return <div>Hello {props.towhat}</div>;
}

function HelloWorld() {
  return <hello toWhat="World" />;
}
```

이를 고치기 위해서 hello 를 Hello 로 고치고 참조할 때도 <Hello />를 사용해야 한다.

```js
import React from "react";

function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  return <Hello toWhat="World" />;
}
```

## 실행중에 타입 선택하기

React 엘리먼트의 타입을 지정하기 위해 아무 표현식이나 사용할 수 있는 것은 아니다.
엘리먼트 타입을 지정하기 위해 일반적인 JavaScript 표현식을 사용하고 싶다면, 일단 대문자로 시작하는 변수에 대입해라. 에를 들어 아래와 같이 prop 을 가지고 컴포넌트를 선택해서 렌더링해야 하는 경우가 종종 생긴다.

```js
import React from 'react'
import {Photostory, VideoStory} from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props){
  return <component[props.storyType] story={props.story} />;
}
```

이를 고치기 위해, 먼저 대문자로 시작하는 변수에 타입을 할당해야 한다.

```js
import React from "react";
import { PhotoStory, VideoStory } from "./stories";

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 올바른 사용법입니다. 대문자로 시작하는 변수는 JSX 타입이 될 수 있습니다.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## JSX 안에서 prop 사용하기

JSX 안에서 prop 을 지정하는 몇가지 방법이 있다.

## JavaScript 표현식을 prop 으로 사용하기

어떤 JavaScript 표현식도 prop 으로 사용될 수 있다. {}으로 둘러싸면 되는데, JSX 에서 아래와 같이 사용할 수 있다.

`<MyComponent foo={1 + 2 + 3 + 4} />`

MyComponet 에서 props.foo 의 값은 표현식 1 + 2 + 3 + 4 를 계산한 값인 10 이다.

if 문과 for 루브는 JavaScript 표현식이 아니기 때문에 JSX 안에서 그대로 사용 될 수는 없다. 대신 JSX 밖에서 코드를 작성할 수는 있다. 다음의 예를 참고하면

```js
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return (
    <div>
      {props.number} is an {description} number
    </div>
  );
}
```

> if 문을 이렇게 사용한다!

## 문자열 리터럴

문자열 리터럴은 그대로 prop 으로 넘겨줄 수 있다. 아래 두 JSX 표현식은 완전히 동일하다.

```js
<MyComponent message="hello world" />

<MyComponent message={'hello world'}/>
```

문자열 리터널을 넘겨줄 때는 HTML 이스케이핑이 풀린다. 따라서 다음 두 JSX 표현식은 완전히 같다.

```js
<MyComponet message="&lt;3" />

<MyComponent message={'<3'} />
```

보통 이런 동작은 신경쓰지 않아도 되지만, 문서의 완결성을 위해 언급해 둔다.

## Props 의 기본값은 "True"

Prop 으로 아무 값도 넘겨주지 않으면, 기본 갑인 true 가 된다. 아래 두 JSX 표현식은 완전히 같다.

```js
<MyTextBox autocomplete />

<MytextBox autocomplete={true}/>
```

일반적으로, 우리는 이 방식을 사용하지 않는 것을 권장하는데 ES6 갹체 약식 표깅와 혼동을 일으킬 수 있기 때문이다. ({foo}는 {foo:true} 대신 {foo: foo}와 같다.) 다만 HTML 의 동작 방식과 일치하게끔 이를 남겨두었다.

## 속성 펼치기

props 에 해당하는 객체를 이미 가지고 있다면, 전체를 그대로 JSX 에 넘겨주기 위해 ...펼치기 연산자를 사용할 수 있다. 아래 두 컴포넌트는 완전히 같다.

```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = { firstName: "Ben", lastName: "Hector" };
  return <Greeting {...props} />;
}
```

컴포넌트가 사용할 특정 prop 을 골라내고 나머지 prop 을 다른 컴포넌트에 넘겨줄 때에도 펼치기 연산자를 사용할 수 있다.

```js
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("Clicked!")}>
        Hello world!
      </Button>
    </div>
  );
};
```

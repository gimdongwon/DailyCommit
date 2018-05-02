# react 1-1

## 배울것들

* redux

facebook data achitect 구현체 라이브러리 어플리케이션의 상태를 관리

* webpack

모듈 bundler 로 각종 plugin, loader 통해 프로젝트 빌드하는 작업을 도와줌

* express : nodejs환경에서 서버 여는 걸 쉽게 해주는 프레임워크

MongoDB,mongoose

전화번호부, 카운터(redux), 무한스크롤형 메모패드
<br><br>

# react 1-2

JS로도 많은 것들을 만들 수 있게 됬음
(atom, slack 등등..)

react는 프레임워크가 아닌 라이브러리

필요할때 가져다가 쓰면된다. 프레임워크에 비해 사용성이 용이하다.

react는 user interface를 만들기 위한 라이브러리이다.

> react는 augular를 대체할수없다. augular는 프레임워크이다.

reactNative는 모바일 네이티브 앱을 react로 만들수 있게 해주는 프레임 워크

virtual DOM이 react의 핵심!

js객체에 불과함

재밌는 동영상 [react](https://lispcast.com/what-is-react/)
<br><br>

# react 1-3 장점과 단점

## 장점

1. virtual를 사용한다
2. 배우기가 간단하다.(conponent만 알면된다.)
3. 뛰어난 Garbage Collection, 메모리 관리, 성능을가지고 있다.
4. server side & client 랜더링을 둘다 제공한다. ( 초기 구동 딜레이 가 빨라짐, SEO(검색엔진최적화))
5. 매우 간편한 UI수정 및 재사용(component화)
6. 페이스북이 밀어준다.
7. 다른 프레임워크나 라이브러리와 혼용가능하다.

## 단점

1. View ONLY 빠진부분은 다른 라이브러리에서 채우길!
2. JS 실력이 좋아야한다.
3. IE8 이하 지원 X => 호환할수 있는 react14버전으로 폴리필을 돌리면 된다.

<br><br>

# ReactJS 시작하기 2-1

Codepen 사용!

babel 추가하는 이유 : es6를 사용하기 위해서이다. => 웹사이트를 만들때 여러가지 브라우저 호환이 필요하기 때문이다.

react는 컴포넌트 react-dom 은 실제 DOM의 rendering을 담당한다. 15이상으 이렇게 설정해준다.

* Class : [mdn 참조](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)

class 선언전에 사용하면 error발생
<br><br>

# JSX의 특징 2-2

```js
class Codelab extends React.Component{
  render(){
    let text = "Hi dongwon!"
    let stylegg = {
      backgroundColor: "pink"
    };
    return (
    <div style={stylegg}>{text}</div> 
    );
  }
}

class App extends React.Component{
  render(){
    return (
    <Codelab/>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById("root"));
```

>**<App/>뒤에 . 이아니라 , 이였따;;**>

JSX특징

1. 모든 jsx코드는 containerElement안에 포함 시켜야 한다. (div 같은 거)
2. 변수 표현할 때에는{}사용.(ex. {text})
3. style할때에는 key 가 camelcase인 객체가 사용되어야 한다. string 형식을 사용하지 않음.
4. 주석 작성시에 /* ... */이다.
<br><br>
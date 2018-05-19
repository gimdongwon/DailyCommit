# Ajax

전통적 웹개발 : 링크를 타고들어가서 요청을 보내면 페이지 전부가 새로고침됨

요즘 웹개발 : 버튼을 클릭했을 때 뒤에서 js가 요청을 보냄. js로 보낸요청은 페이지 새로고침을 요구하지않음. 몰래 보내 응답을 받고 DomApi로 화면을 바꿈.

## 요즘기법에 자주쓰이는 Ajax

비 동기적인 웹 어플리케이션의 제작을 위한 클랄이언트 측 웹 개발 기법을

뜻하나 요즘은 웹브라우저에서 XMLHttpRequest혹은 fetch를 이용해 보내는 HTTP요청을 통칭함

## 요청그림

### > 서버에서주는 정보가 html이 아니다.

-> js가 요청한 정보를 js형태의 문서를 받으면 좋기때문에 json형태로 문서를 짜주는 것이 관례다.

## 장점

* 페이지 새로고침이 안일어나고 필요한 부분만 바뀌어짐. 더빠르다고 느껴진다.
* 서버응답 기다리는 동안에도 다른 부분 사용가능하다.
* 필요한 자원만 서버에서 받아오게 되므로 트래픽이 줄어듬(페이지 새로고침하면 html, css, js다 다시받아와야됨. 요즘은 부분만해서 아님 필요한 부분만 json으로 받아서 트래픽줄일 수 있다.

## 단점

* 클라이언트 부분이 엄청나게 복잡해 진다.(프론트엔드 개발자가 할일이 많아짐)
> 강사님이 없을때 해봄(13~14년도) => 죽을뻔함
=> 생으로 쓰면 고통스러워서만들어진게 react, angular이다

라이브러리가 많다. 그중에서 쓸 기술은

## Axios

promise based HTTP client.(fetch랑 비슷하고 쓰기 더 편하다.)

fetch는 브라우저기술이라 Nodejs에서 사용하기 곤란하나 애는 둘다가능

.data/db.json

```js
const p =axios.get('/api/todos')
=> undefined

p.then(res=>{
  console.log(res)
})
```

=> 매우길다 요약하면 상태코드들어있고, header있고 데이터 있따.

> 문서읽는 연습을 하여라 어짜피 읽어야된다. 조금씩이라도 읽기!!

html 내장객체로 문서를 보낼때는 퍼센트 인코딩 context타입의 app~ 세팅

post 요청을보낼때

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
```

> patch 어떤 자원의 일부를 부분만 변경하고 싶을때
>
> put도 자료를 수정하고 싶을 떄 도 사용하는데
>
> patct는 일부만 put는 자료의 전체를 교체하고 싶을때 사용

`api/todos?id=3` 이게아니라 `api/todos/3` 이렇게 하는게 관례

rest api 주소설정 기법

json이라는 도구를 사용하고 있음.

$ npm install -g json-server (g는 grobal의 약자, 컴퓨터의 어떤 곳에 깔아라 아무데서나 쓸수있게)

[axios](https://github.com/axios/axios)
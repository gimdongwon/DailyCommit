> 오늘은 이론위주로 하고 남은 시간은 실습위주로 진행
>
> 중간 프로젝트 개인으로 진행되고 주제 3개가 주어지고 진행됨

# CORS (브라우저에서 보안정책을 다룰때 핵심적으로 다루는 동일 출처 정책)

* 리소스 html, css, img, font같은 파일을 리소스라고 부른다. 혹은 ajax요청도 리소스다.

* 리소스의 출처가 웹페이지의 출처와 같으면 안전하다고 보고 출처가 다르면 안전하지 않다고 보는 정책

* 여기서 '출처'란 `프로토콜 + 도메인 + 포트번호` 즉 세개가 다 같아야 동일한 출처라고 본다. 셋중 하나라도 다르면 동일 출처로 간주되지 않는다.

* 웹 브라우저의 기본원칙으로, 웹 브라우저의 많은 요소로 적용됨.

> 쿠키를 다른곳에다가 보내야 탈취임 다른 브라우저로 보낸다는 것은 ajax요청을 보낸다는 것

다른 페이지에서 다른페이지를 조작할 수 있다.

window.open이라는 함수가 있다

window.opener도있다

```js

const child = window.open("http://www.fastcampus.co.kr")
undefined

(child페이지)
window.dongwon = '오늘저녁은 떡라면이다'
"bar"

child.dongwon
"bar"
```

---

## `Content-Security-Policy:

script-src 'self' https://apis.google.com` 이출처만 스크립트 허용

Content-Security-Policy(파일을 다운받을 때 보내는 사용정책) CSP 헤더를 이용하면 동일하지 않은 출처에 대한 리소스를 불러올지 말지를 결정할 수 있음.

`Content-Security-Policy: script-src 'self'https://apis.google.com`

## CORS : Ajax 요청을 보낼때 사용되는 정책 <br>(cross-origin-resource-sharing)

* 클라이언트 측 cross-origin 요청을 안전하게 보낼 수 있는 방법을 정한 표준
* 스크립트가 전혀 다른 출처를 갖는 API서버를 사용하려고 하는 상황에서는 뭔가 추가적인 처리를 해주어야 한다는 것.

출처가 다른 사이트에서 보내는 것이 굉장히 위험하다.

## Cross-origin요청의 위험섬

```md
cross-origin의 위험성을 가정해보자<br>
mywebsite가 쿠키 인증을 통해 필요한 정보를 얻고있다. <br>만약 evil.com사이트 스크립트에서 mywebsite의 API를 마음 대로 다룬다면<Br> 도메인에 대해 브라우저에 저장된 쿠키를 이용하여 API를 마음대로 호출할 수 있다.
```

* Cross-origin은 IE8 이상의 모던 웹 브라우저는 cross-origin 요청에 대해 여러가지 제한을 두고 있다.
* cross-origin요청을 허용하려면, 서버가 특별한 형태의 응답을 전송해야한다.
* 만약 서버가 cross-origin요청을 허용하지 않으면, 웹 브라우저는 에러를 발생시킨다.

```js
axios.get('https://wpsn-axios-example.glitch.me/api/todos')
  .then(res => {
    prettyPrint(res.data)
  })
```

## CORS에 관여하는 요청 헤더

* origin
* Acces-Control-Request-Method(preflighted전용)
* Acces-Control-Request-Headers(preflighted전용)

포인트 crud 요청은 2번이상 갈수있다. 시험적으로 보내는것을

## CORS - Safe, Unsafe

* GET, HEAD 요청은 safe(읽기전용)이기 때문에 서버에 요청이 도달한다고 해서 서버의 상태에 영향을 미칠일은 없으므로, 웹 브라우저는 일단 해당 요청을 보내본다. 만약 서버가 cross-origin요청을 허용한다고 응답하면 응답을 그대로 사용하고, 그렇지 않으면 에러를 낸다.
* POST,PUT,PATCH,DELETE등의 메소드는 요청이 서버에 전송되는 것 자체가 위험하므로, 실제 요청을 보내기 전에 서버가 cross-origin요청을 허용하는지를 알아보기 위해 시험적으로 요청을 한번 보내본다 이요청을 preflighted request라고 하고 **면접에 자추 출제된다**.

## > 미들웨어로 구성되어져있고 부분적으로 막는것도 가능하다 실제적으로 CORS를 사용하는 경우도 많다. (api요청으로 수정이 필요할때, put만 허용할수도 있고 post는 안되게 해놓을수도 있고 여러가지 디테일한 설정이 가능하다.)

cores with credentials

예전에는 쿠키를 막보냈음 =? cross-origin 요청에는 기본적으로 쿠키가 포함되지 않으나 XMLHttpRequest, fetch을 통해 요청을 보낼때 쿠키를 포함시키는 옵션을 줄수 있고 이때 CORS요건이 더 엄격해짐
=> 쿠키를 포함시킬수 있으나 힘들다!

1. 프론트엔드와 API 서버를 같은 도메인으로 제공한다.
2. 불가피하게 둘을 다른 도메인으로 제공해야 한다면

  * CORS를 허용한다 (cors 미들웨어를 사용하면 간단함)
  * CORS를 허용하는 경우, 쿠키를 쓸 수는 있으나 보안 상 허점이 
      생기기 쉽고 사용하기도 불편하므로 보통   JWT와 같은 토큰 방식의 인증을 사용한다.

# reference

[콘텐츠 보안 정책](https://developers.google.com/web/fundamentals/security/csp/?hl=ko)`
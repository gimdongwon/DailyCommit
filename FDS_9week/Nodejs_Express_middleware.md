# Nodejs Express Middleware

```js
// 미들웨어 = 함수
function helloMiddleware(res, req, next) {
  console.log('hello')
  next()
}

app.use(helloMiddleware)
```

## Middleware
* 함수, 즉 안에서 어떤 작업이든 가능
* request 객체, response객체, next함수를 인자로 받음
* request객체, response 객체를 조작해서 기능구현
* 다음 미들웨어를 동작시키기 위해 next 함수를 인자없이 호출
* 등록된 순서대로 실행됨

## app.use

* 미들웨어를 앱 전체에서 동작하도록 주입하거나
  * `app.use(helloMiddleware)`
* 특정 경로에서만 동작하도록 주입
  * `app.use('/some-path', helloMiddleware)`
* 한번에 여러개 주입
  * app.use(middleware1, middleware2, middleware3, ...)

## 미들웨어로 하는 일

* 로깅
* HTTP body를 객체로 변환
* 사용자 인증
* 권한관리
* ...

## 미들웨어를 왜 사용하는가?

미들웨어로 할 수 있는 모든 일은 라우트 핸들러에서도 할 수 있으나, 여러 라우터에서 사용해야 하는 기능을 중복 작성하는 불편을 덜고 코드를 재사용하기 위해 미들 웨어를 사용하는 것이다.

## 미들웨어 생태계

[Express](https://expressjs.com/ko/resources/middleware.html)

[npm search](https://www.npmjs.com/search?q=express+middleware)

## Next

미들웨어는 req,res에 더해서 next라는 함수를 추가로 인자로 받는다 next함수는 호출하면 다음 미들웨어로 처리를 넘기는 효과가 있다. 만약에 미들웨어가 next함수를 호출하지도 않고, 응답도 보내지 않으면 클라이언트는 응답을 받지 못하게 되므로 주의!

## AppLocal, Response Local

app.locals 와 res.locals는 특별한 객체를 담고 있다. 템플릿에서는 res.render를 통해 명시적으로 주입받지 않아도 저 두 객체의 속성에 바로 접근할 수 있다.
템플릿을 가리지 않고 사용되는 정보들, 예를 들어 '현재 로그인 중인 사용자 정보'가틍ㄴ 것을 ㄱes.render에 매번 인자로 넘기는 것을 귀찮을 뿐더러 빠뜨리기도 쉽다. 그런 정보들을 템플릿에서 쉽게 사용하기 위해 app.locals나 res.locals에 우리가 원하는 이름으로 속성을 주입할 수 있다.
app.locals는 앱 단위로 공통적으로 쓰이는 정보를 담는 목적으로 사용된다.

res.locals는 각 요청마다 달라지는 정보를 담는 목적으로 사용된다. res객체는 매 요청마다 새로 생성되어 미들웨어 바깥에서 접근할 수 있는 방법이 없으므로 res.locals를 조작하려면 미들 웨어를 사용해야 한다.

```js
app.get('/secret', lock('thisisthekey'),(req,res)=>{
  res.send('index.ejs')
})
```

## 미들웨어 vs 라우트 핸들러

* 라우트 핸들러도 미들웨어
* 즉, next 함수를 인자로 받는 것이 가능

```js
app.get('/', (req,res,next)=>{
  if(!someCondition){
    next() //요청을 처리를 하지 않고 다른 핸들러로 넘김
  }else{
    res.send('hello')
  }
})
```

> Nodejs가 나온게 2009년인데 네트워크지원해주는 프레암워크이다.
>
> 파이썬으로 만들어진 장고
>
> 자바로 만들어진 스프링
>
> c#으로 만들어진 asp
>
> ruby로 만들어진 rails
>
> express를 쓰면 js를 지원하기때문에 이득이다
>
> 프론트 개발자가 서버까지 다루면 개이득이다.
>
> 7기 서버랑 프론트엔드 둘다 작성해라(이런 면접을 본 회사들이있다.)
>
> express를 쓰면 굉장히 쉽게 서버를 작성할 수 있다.
>
> js 회사는 백엔드도 개발한다.
>
> 관심있게 공부하는것 추천!
>
> 서버공부해보고싶다 하면 Nodejs의 express를 공부하세여!

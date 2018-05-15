# REST API

## 1. (Representational State Transfer API)

REST는 Representational State Transfer 용어의 약자로써 웹의 장점을 최대한 활용할 수 있는 아키텍처이다. REST는 네트워크 아키텍처 원리의 모음인데 여기서 네트워크 아키텍처 원리란 자원을 정의하고자원데 대한 주소를 지정하는 방법 전반을 일컫는다.
다음의 구성으로 이루어져 있다

1. 자원(Resource) - URL
2. 행위(Verb) - HTTP METHOD
3. 표현(Representations)

## 2. REST의 특징

1. Uniform (유니폼 인터페이스) : url로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행하는 아키텍처 스타일을 말한다.
2. Stateless(무상태성) : 작업을 위한 상태정보를 따로 저장하고 관리하지 않는다. 세션 정보나 쿠키 정보를 별도로 저장하고 관리하지 않기 때문에 API서버는 들어오는 요청만을 단순히 처리하면 된다. 때문에 서비스의 자유도가 높아지고 서버에서 불필요한 정보를 관리하지 않음으로 구현이 단순해진다.
3. Cacheable(캐시가능) : HTTP라는 기존 웹표준을 그대로 사용하기 때문에, 우베에서 사용하는 기존 인프라를 그대로 활용이 가능하다. 따라서 HTTP가 가진 캐싱 기능이 적용 가능하다 HTTP프로토콜 표준에서 사용하는 Last-Modified태그나 E-tag를 이용하면 캐싱구현이 가능하다.
4. Self-descriptiveness(자체 표현 구조) : REST API 메시지만 보고도 이를 쉽게 이해 할수 있는 자체 표현 구조로 되어있다는 것이다.
5. Client-Server구조 : Rest 서버는 API제공, 클라이언트는 사용자 인증이나 컨텍스트 (세션, 로그인 정보)등을 직접 관리하는 구조로 각각의 역할이 확실히 구분되기 때문에 클라이언트와 서버에서 개발해야할 내용이 명확해지고 서로간 이존성이 줄어들게 된다.
6. 계층형 구조 : REST 서버는 다중계층으로 구성될 수 있으며, 보안, 로드 밸런싱, 암호화 계층을 추가해 구조상의 유연성을 둘 수 있고 PROXY, 게이트웨이 같은 네트워크 기반의 중간 매체를 사용할 수 있게 된다.

## 디자인 가이드

REST API 설계시 가장 중요한 것은 두가지로 나눌 수 있는데

1. URL는 정보의 자원을 표현해야 한다.
2. 자원에 대한 행위는 HTTP Method(get, post, put, delete)로 표현한다.

* `GET /members/delete/1`
  위와 같은 방식은 REST를 제대로 적용하지 않은 URL이다 자원을 표현하는데 중점을 두어야하고 delete와 같은 행위에 대한 표현이 들어가서는 안된다.

  * 자원에 대한 행위는 HTTP Method로 표현
    위의 잘못된 url를 HTTL Method로 수정해 보면
      `DELETE /members/1`
    으로 수정할 수 있다

## RESTFull API

요즘은 서버는 1인데 클라이언트가 굉장히 다양해졌다. 안드로이드는 OS버전도 굉장히 다양하고 단말기마다 굉장히 다른 특성을 갖기도 한다. 또 IOS도 있고, 컴퓨터 브라우져의 종류도 굉장히 많아졌다. 그래서 예전처럼 하나의 클라이언트를 위한 서버를 구성하는건 비효율적인 일이 되었다. 하나의 서버로 여러대의 클라이언트를 대응하도록 할 때 필요한 것이 RESTFull API이다.

# NodeJS

Chrome V8 JavaScript엔진으로 빌드된 JavaScript 런타임이다. Node.js는 이벤트 기반, 논 블로킹 I/O 모델을 사용해 가볍고 효율적이다. Node.js의 패키지 생태계인 npm은 세계에서 가장 큰 오픈 소스 라이브러리 생태계이다.

## JS실행환경?

1. REPL(read, eval, print, loop)을 통해 런타임을 제공한다.
2. 따로 자바스크립트 파일을 Node.js에서 제공하는 자바스크립트 런타임을 통해 실행이 가능하다.

## JavaScript Runtime

* JavaScript는 언어
* JavaScript 런타임은 JS를 구동하기 위해 필요한 실행환경
* 프로그래머는 런타임이 제공하는 도구를 응용해서 프로그램을 개발
* 웹브라우저나 Node.js도 JavaScript 런타임의 일종

## Event-driven Programming

프로그램의 흐름이 외부요인에 의해 일어나는 사건에 의해 결정되는 프로그래밍 양식
약속된 방식으로 이벤트 핸들러를 작성함으로써 외부 이벤트가 일어났을 때 코드를 실행

## Node.js Module

```JS
~|⇒ node
> const os = require('os')
undefined
> os
{ arch: { [Function: arch] [Symbol(Symbol.toPrimitive)]: [Function] },
  cpus: [Function: cpus],
  EOL: '\n',
  endianness: { [Function: endianness] [Symbol(Symbol.toPrimitive)]: [Function] },
  freemem: { [Function: getFreeMem] [Symbol(Symbol.toPrimitive)]: [Function] },
  homedir: { [Function: getHomeDirectory] [Symbol(Symbol.toPrimitive)]: [Function] },
  hostname: { [Function: getHostname] [Symbol(Symbol.toPrimitive)]: [Function] },
  loadavg: [Function: loadavg],
  networkInterfaces: [Function: networkInterfaces],
  platform: { [Function: platform] [Symbol(Symbol.toPrimitive)]: [Function] },
  release: { [Function: getOSRelease] [Symbol(Symbol.toPrimitive)]: [Function] },
  tmpdir: { [Function: tmpdir] [Symbol(Symbol.toPrimitive)]: [Function] },
  totalmem: { [Function: getTotalMem] [Symbol(Symbol.toPrimitive)]: [Function] },
  type: { [Function: getOSType] [Symbol(Symbol.toPrimitive)]: [Function] },
  userInfo: [Function: getUserInfo],
  uptime: { [Function: getUptime] [Symbol(Symbol.toPrimitive)]: [Function] },
  getNetworkInterfaces: [Function: deprecated],
  tmpDir: [Function: deprecated],
  constants:
   { UV_UDP_REUSEADDR: 4,
     errno:
      { E2BIG: 7,
        EACCES: 13,
        EADDRINUSE: 48,
        EADDRNOTAVAIL: 49,
        EAFNOSUPPORT: 47,
        EAGAIN: 35,
        EALREADY: 37,
        EBADF: 9,
        EBADMSG: 94,
        EBUSY: 16,
        ECANCELED: 89,
        ECHILD: 10,
        ECONNABORTED: 53,
        ECONNREFUSED: 61,
        ECONNRESET: 54,
        EDEADLK: 11,
        EDESTADDRREQ: 39,
        EDOM: 33,
        EDQUOT: 69,
        EEXIST: 17,
        EFAULT: 14,
        EFBIG: 27,
        EHOSTUNREACH: 65,
        EIDRM: 90,
        EILSEQ: 92,
        EINPROGRESS: 36,
        EINTR: 4,
        EINVAL: 22,
        EIO: 5,
        EISCONN: 56,
        EISDIR: 21,
        ELOOP: 62,
        EMFILE: 24,
        EMLINK: 31,
        EMSGSIZE: 40,
        EMULTIHOP: 95,
        ENAMETOOLONG: 63,
        ENETDOWN: 50,
        ENETRESET: 52,
        ENETUNREACH: 51,
        ENFILE: 23,
        ENOBUFS: 55,
        ENODATA: 96,
        ENODEV: 19,
        ENOENT: 2,
        ENOEXEC: 8,
        ENOLCK: 77,
        ENOLINK: 97,
        ENOMEM: 12,
        ENOMSG: 91,
        ENOPROTOOPT: 42,
        ENOSPC: 28,
        ENOSR: 98,
        ENOSTR: 99,
        ENOSYS: 78,
        ENOTCONN: 57,
        ENOTDIR: 20,
        ENOTEMPTY: 66,
        ENOTSOCK: 38,
        ENOTSUP: 45,
        ENOTTY: 25,
        ENXIO: 6,
        EOPNOTSUPP: 102,
        EOVERFLOW: 84,
        EPERM: 1,
        EPIPE: 32,
        EPROTO: 100,
        EPROTONOSUPPORT: 43,
        EPROTOTYPE: 41,
        ERANGE: 34,
        EROFS: 30,
        ESPIPE: 29,
        ESRCH: 3,
        ESTALE: 70,
        ETIME: 101,
        ETIMEDOUT: 60,
        ETXTBSY: 26,
        EWOULDBLOCK: 35,
        EXDEV: 18 },
     signals:
      { SIGHUP: 1,
        SIGINT: 2,
        SIGQUIT: 3,
        SIGILL: 4,
        SIGTRAP: 5,
        SIGABRT: 6,
        SIGIOT: 6,
        SIGBUS: 10,
        SIGFPE: 8,
        SIGKILL: 9,
        SIGUSR1: 30,
        SIGSEGV: 11,
        SIGUSR2: 31,
        SIGPIPE: 13,
        SIGALRM: 14,
        SIGTERM: 15,
        SIGCHLD: 20,
        SIGCONT: 19,
        SIGSTOP: 17,
        SIGTSTP: 18,
        SIGTTIN: 21,
        SIGTTOU: 22,
        SIGURG: 16,
        SIGXCPU: 24,
        SIGXFSZ: 25,
        SIGVTALRM: 26,
        SIGPROF: 27,
        SIGWINCH: 28,
        SIGIO: 23,
        SIGINFO: 29,
        SIGSYS: 12 } } }
> os.platform()
'darwin'
> os.freemem()
123793408
>
```

JIT 자바스크립트를 기계어로 바꾼후에 동작하게 만들어서 속도가 굉장히 빨라졌다.
Code Optimization 우리 코드를 가장 빠르게 동작하게 바꾸어준다.

## NPM

Node.js 패키지 관리도구 + 클라우드 패키지 저장소

* 의존 패키지 관리
* 스크립트 실행
* 패키지 설정
* NPM에 패키지 배포
* Node.js 종합작업도구

## package.json

* dependencies

`npm install --save`명령으로 설치한 패키지가 기록됨

* scripts

원래 목적은 패키지 생명주기마다 자동으로 실행되는 명령을 등록하기 위함이나, 개발자 편의를 위해 자주 사용되는 명령을 등록하는 용도로 더 많이 사용됨

localhost //통신통로
:5500 //통신포트번호

---
180515 시작!

# HTTP 
## (가장 중요한것 1. 요청이 있어야 응답이 있다. 2. HTTP는 여러가지 구성이 있다.)

* 웹 브라우저와 웹 서버간의 통신을 위헤 개발된 통신규약으로 최근에는 REST API의 부상과 함께 다른 용도로도 널리 사용됨
  * 모바일 앱: 서바간 통신
  * 서버-서버 간 통신
* 80번 포트를 기본으로 사용
* 클라이언트의 요청과 서버의 응답으로 이루어짐

요청을 하지않으면 절대 응답을 주지 않는다.
1991. HTTP 초기버전 발표으로 텍스트만 전송할 수 있는 프로토콜. 팀 버너스 리 브라우저를 위한 통신방식을 만들어 인터넷 붐을 일으킴
1996. 여러 인터넷 서비스 업체들이 자체적으로 사용하던 HTTP구현들을 모아 HTTP1.0을 만듬
1999. 에러버전을 해결한 1.1을 발표. **지금까지 사용하고 있는 버전**

## HTTPS

* HTTP over SSl
* HTTP통신을 암호화해 주고받는 내용을 중간에서 가로챌 수 없도록 함
* 443번 포트를 기본으로 사용

## HTTP/2

* 구글의 SPDY프로토콜을 기반으로 2015년에 확정된 새로운 HTTP표준
* 속도 개선에 중점을 두고 개발됨 (바뀐점 몇가지애기해보면 : http2는 기계어로 이루어져있다. 트래픽비용이 준다.)
* 반드시 HTTPS를 사용해야함
* 현재 전체 웹사이트 중 26%이상이 사용중

### >동원: 뭐따로 설정해주거나 설치해야 되나요? 강사님: 웹브라우저 웹서버 사이의 통신이다. 웹서버에서 만드는 것이기 때문에 크롬 자동 업데이트하면 http/2를 사용하게된다. 서버개발할때 중요하다

## HTTP구성요소

### Request & Response

* 웹브라우저(또는 다른 클라이언트)는 웹 서버에 요청을 보냄
* 그에 따라 서버는 클라이언트에 응담을 보냄
* 웹 브라우저의 경우, HTML 문서 형태의 응답이 오면 해당 문서를 분석한후, 문서에 포함된 모든 자원에 대한 요청을 각각 추가로 보냄.

### URL

![urlImage](https://cascadingmedia.com/assets/images/insites/2015/02/url-anatomy/url-anatomy-55598c24.png)

* 8번 hash라고도 불린다. 해당기준이 (0,0)에 찍힌다

## Percent Encoding

web에서만 나오는 특별한 방식으로 encoding-decoding 에대한 이해<br>
URL은 ASCII문자 밖에 사용하지 못하므로 non-ASCII문자를 위한 표현방법이 필요함

Percent encoding은 non-ASCII문자를 위한 웹표준 인코딩방법

```js
> encodeURIComponent("한글")
"%ED%95%9C%EA%B8%80"
> decodeURIComponent("%ED%95%9C%EA%B8%80")
"한글"
```

## Response Status

응답의 성공, 실패 여부와 종류를 나타냄

* **Status Category**

* 2xx 성공
* 3xx 추가작업이 필요함
  * 301 자료가 완전히 다른 곳으로 이동했음 (Redirection)
  * 302 자료가 일시적으로 다른곳에 있음 (Redirection)
  * 304 클라이언트가 이미 가지고 있던 자료가 수정되지 않았음.=> 캐싱 파일로 수정되지 않았으니깐 "브라우저야 그대로 쓰면되"
* 4xx 실패-클라이언트 책임
  * 400 Bad Request 요청의 형태가 잘못되어 응답할 수 없음
  * 403 Forbidden 요청한 자료에 접근할 권한이 없음
  * 404 Not Found 요청한 자료가 없음
* 5xx 실패-서버책임
  * 500 Internal Server Error 요청을 처리하던 중에 예상치 못한 오류가 발생함
  * 503 Service Unavailable 서버가 일시적으로 응답을 할 수 없음.

## Header

* 요청과 응답에 대한 추가 정보를 표현하는데 사용됨
* 이증, 캐싱, 쿠키, 보안, 내용협상, 프록시 등 웹 표준에 정의된 많은 기능을 제어하는데 사용됨.

* Authorization
  * 요청의 인증정보(관리자 페이지 접근 불가)
* User-Agent
  * 요청 중인 클라이언트의 정보 (mac 사용자면 이거로 보내고, window면 이거로 보내라)
* Location
  * 301,302 응답에서 자료의 위치
* Accept
  * 요청이 어떤 형태의 자료를 원하는지 나타냄
* Content-Type
* 요 청 혹은 응답이 어떤 형태의 자료인지 나태냄

# Express (Node.js를 통해 사용)

## Glitch(codepen node버전 실습환경)

Glitch는 웹 브라우저 위에서 Node.js 기반 앱을 만들고, 복제하고, 편집하고, 공동 작업하고, 호스팅할 수 있는 환경을 제공합니다.

express는 브라우저에서 실행되는게 아니라 클라우드 위에서 nodejs가 실행된다.

.env 파일에 작성한 내용이 다른사람에게는 공개가 안된다.

## Express

* Node.js생태계에서 가장 널리 쓰이는 웹 프레임워크
* 내장하고 있는 기능은 매우 적으나, 미들웨어를 주입하는 방식으로 기능을 확장하는 생태계를 가지고 있음
* 고식 매뉴얼 한국어 번역

## Express 앱의 기본구조

```js
//Express 인스턴스 생성
const app = express()

// 미들웨어 주입
app.use(sessionMiddleware())
app.use(authenticationMiddleware())

//라우트 핸들러 등록
app.get('/', (request, respone)=>{
  response.send('hello express');
})

//서버구동
app.listen(3000,()=>{
  console.log('Example app listening on port 3000!');
})
```

```js
// HTTP 요청 메소드 (GET, POST,...)와 가틍ㄴ 이름의 메소드를 사용
app.get('/articles', (req,res)=>{
  res.send('hello routing!');
})

app.post('/articles', bodyParserMiddleware(). (req,res)=>{
  database.articles.create(req.body)
  .then(()=> {
    res.send({ok:ture})
  })
})
```

## Request 객체

* req.body
  * 요청 바디를 적절한 형태의 자바스크립트 객체로 변환하여 이곳에 저장
* req.ip
  * 요청한 쪽의 IP
* req.query
  * querystring이 객체로 저장됨

## Response 객체

* res.status(..)
  * 응답의 상태 코드를 지정하는 메소드
* res.append(..)
  * 응답의 헤더를 지정하는 메소드
* res.send(..)
  * 응답의 바디를 지정하는 메소드
  * 인자가 텍스트면 text/html, 객체면 application/json타입으로 응답

### 첫번째 실습

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`Hello, ${process.env.NAME}`)
})

const listener = app.listen(process.env.PORT, function () {
  console.log('listening on port ' + listener.address().port)
})

app.get('/asdf', (req, res)=>{
 res.send('여기는 없는파일이네');
})

app.get('/user/:name', (req, res)=>{
  res.send(`Hello ${req.params.name}!`);
})

app.get('/query',(req,res)=>{
  if(req.query.q){
    res.append('X-QUERY', req.query.q);
    res.send(req.query.q);
}else{
  res.status(400);
  res.send('400 Bad Request');
}
} )
```

### 두번째 실습

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.enable('trust proxy');
app.use(bodyParser.json());


// GET method
app.get('/', (req, res) => {
  res.send('Hello, Express!')
});

// POST method
app.post('/', (req, res) => {
  if(req.body.name){
  res.send(`Hello, ${req.body.name}`);
  }else{
   res.status(400);
    res.send('400 Bad Request');
  }
  /*
  Mission:
  요청의 바디에 실려 온 JSON에 name이라는 속성이 있으면 해당 값을 이용해 응답하고, 없으면 400 Bad Request를 응답한다.
  응답 형태는 'Hello, <name>!' 으로 한다.
  */
});

// query parameter, res.status
app.get('/add', (req, res) => {
  /*
  Mission:
  query parameter에 x와 y라는 이름을 가진 두 값을 정수로 바꾸어서 더한 후 응답한다.
  값을 정수로 바꿀 수 없다면 400 Bad Request로 응답한다.
  */
  // if(req.query.x && req.query.y){
  //   let x = parseInt(req.query.x);
  //    let y = parseInt(req.query.y);
  //   let sum = req.query.x + req.query.y;
  //   (sum).toString();
  //   res.send(sum);
  //    }  else{
  //    res.status(400);
  //   res.send('400 Bad Request');
  // 강사님 답
  const result = parseInt(req.query.x) + parseInt(req.query.y);
    if(Number.isNaN(result)){
       res.status(400);
    res.send('400 Bad Request');}
  else{
    res.send(result.toString());
  }
  }
);

// req.ip
app.get('/ip', (req, res) => {
  /*
  Mission:
  요청한 쪽의 ip를 응답한다.
  */
  res.send(req.ip);
});

// req.get, res.set, res.end
app.get('/header', (req, res) => {
  /*
  Mission:
  요청의 X-Custom-Header 헤더를 그대로 응답에 포함시켜 응답한다.
  응답에는 바디를 포함시키지 않도록 한다.

  hint 1: req.get 메소드는 요청에 포함된 특정 헤더의 값을 가져온다.
  예) req.get('X-Custom-Header')

  hint 2: res.set 메소드는 응답에 새로운 헤더를 지정한다.
  예) res.set('X-Custom-Header', value)

  hint 3: res.end 메소드는 응답을 보낸다. res.send와 비슷하지만, 아무런 인자도 받지 않는다.
  */
  res.set('X-Custom-Header',req.get('X-Custom-Header'));
  res.end();
});

const listener = app.listen(process.env.PORT, function () {
  console.log('listening on port ' + listener.address().port);
});

```

# Templete Language

템플릿과 데이터를 결합해 문서를 생성하는 프로그램, 혹은 라이브러리

템플릿을 작성할 때 사용하는 언어를 템플릿 언어라고 함

## Ejs

(Embedded JavaScript Template)
EJS 예제
템플릿 태그

`<% ... %>: 템플릿의 구조를 제어하기 위해 사용하며, 문자열을 내놓지 않습니다.`

`<%= ... %>: 내부의 식을 문자열로 변환해 HTML 문서 안에 삽입합니다.`

`<%# ... %>: EJS 주석입니다. HTML 주석과는 다르게 아예 HTML 문서에 포함되지 않습니다.`

HTML escape
데이터를 HTML에 삽입하는 `<%= ... %>` 템플릿 태그는 <, > 두 문자를 각각 &lt;, &gt;로 변환하여 HTML에 삽입합니다. 결과적으로 HTML 태그를 직접 템플릿에 삽입하지 못하게 막습니다. 이렇게 하는 이유는 보안 때문으로, XSS(Cross-site Scripting)를 당할 위험을 줄여줍니다.

`<%- ... %>` 템플릿 태그를 이용하면 HTML escape를 생략할 수 있으나, 아주 특별한 경우가 아니면 <%= ... %> 태그를 사용하기를 권장합니다.

```html
<%# 주석입니다 %>
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="/static/index.css">
  </head>
  <body>
    <% if (name) { %>
      <p>당신의 이름은 <%= name %>입니다.</p>
    <% } else { %>
      <p>이름이 주어지지 않았습니다. query parameter에 name을 추가해보세요.</p>
    <% } %>
    <hr>
    <h1>List</h1>
    <ul>
      <% items.forEach(item => { %>
        <li><%= item %></li>
      <% }) %>
    </ul>
    <% if (showSecret) { %>
      <p>my secret is: <%= secret %></p>
    <% } %>
  </body>
</html>
```

```js
// server.js

const express = require('express')

const app = express()

// 템플릿 엔진을 ejs로 설정해줍니다.
app.set('view engine', 'ejs')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
  // 템플릿에서 사용할 데이터입니다.
  // 배열에 요소를 추가하고, true를 false로 바꾸고, 텍스트를 변경해보세요
  const data = {
    items: ['one', 'two', 'three'],
    showSecret: true,
    secret: 'I LOVE NODE.JS!',
    name: req.query.name
  }
  // res.render 함수는 views 디렉토리에 있는 템플릿 파일과 데이터를 합쳐서 응답을 보냅니다.
  res.render('index.ejs', data)
})

app.listen(3000, function() {
  console.log('listening...')
})
```

```js
var express = require('express')
var app = express()

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))

// 프로필을 몇 개 더 추가해보세요
const data = [
  {
    slug: 'seungha',
    name: '김승하',
    avatar: 'https://avatars0.githubusercontent.com/u/767106?s=460&v=4',
    description: '패스트캠퍼스에서 강의를 하고 있는 김승하입니다.'
  },
  {
    slug: 'dongwon',
    name: '김동원',
    avatar: 'https://avatars3.githubusercontent.com/u/37524650?s=460&v=4',
    description: '프론트엔드 9기 김동원입니다'
  }
]

// 프로필 목록
app.get('/', (req, res) => {
  res.render('index.ejs', {profiles: data})
})

// 개별 프로필 페이지
app.get('/profile/:slug', (req, res) => { // profile/seungha
  const slug = req.params.slug
  const profile = data.find(item => item.slug === slug)
  if (profile) {
    res.render('profile.ejs', profile)
  } else {
    res.status(404)
    res.send('404 Not Found')
  }
})

app.listen(3000, function() {
  console.log('listening...')
})

<% profiles.forEach(profile => { %>
<!--    목록이 표시되도록 -->
    <li><a href="/profile/<%= profile.slug %>"><%= profile.name%></a></li>
    <% }) %>

    <image src="<%=avatar%>"></image><Br>
        이름 : <%= name%><Br>
        영어이름 : <%= slug%><br>
        설명 : <%= description%>
```

## handlebar.js

[handlebar](https://handlebarsjs.com/)

## pug.js

[pug](https://pugjs.org/api/getting-started.html)

# 2. TIL

180514: 오늘은 rest api, nodejs, http에 대해 배웠다. 통신에 관한 여러가지 개념을 배웟는데 한개도 버릴게 없는것 같다. 평소에도 많이 듣던 키워드들이라 놓치지 않고 듣기 위해서 열심히 했다. 그래서 오늘은 세가지 개념을 배웟는데 원래 rest api 랑 restful api랑 다른 것인줄 알았다. 하지만 영어뜻 그대로 ful 한 api를 표현식에서 다른거였다. 처음에는 api랑 헷갈렸었는데 굉장히 세분화되고 디테일하다 rest api의 특징들을 정리하며 유니폼 인터페이스를 가지고, 세션이나 쿠키정보를 별도로 저장하지않으며 들어오는 요청만 수행한다. 그리고 기존 인프라를 그대로 활용한 캐싱기능이 가능하며, 자체 표현구조로 가독성이 높다. 서버와 클라이언트의 일의 이분성이 명확해지고 계층성구조가 유연하다.
Nodejs는 한마디로 요약하면 JavaScript를 실행시키기 위한 서버환경을 구성해주는 것이었다.
http는 Hiper Text Transfer Protocol로써 클라이언트와 서버간의 통신규약이다.
내일도 재미있게 통신이야기를 듣도록 하자.

180515 : 오늘도 정말 많은 양의 지식을 배웠다. http부터 ejs까지 하루종일 많은 양의 지식을 습득하였는데 이것을 체득한는것이 문제인 것 같다. http와 https는 학부때 많은 동기들이 물어보았던 질문이다. secure socket layer 라는 뜻인데 보안성이 높은 대신 무겁기 때문에 조금 오래가는데 전부를 쓰기에는 무겁고 분배를하며 차별적으로 사용하는듯 하다 많은 통신에 관한 내용을 배워 재미있었는데 얼른 체득하도록하자.
그리고 그 유명한 NodeJs를 배웠다. 실제로 자바스크립트 환경을 구축하기위해서 npm을 사용하긴 했었지만 express를 배우긴 처음이었다. express 는 크게 dom api 사용하는 것이랑 굉장히 비슷했다.
query, send, (request, response), body, set, use, get정도였다. 사용법을 얼른 익히고 많은종류의 npm을 배워서 나눠주도록 하자. Nodejs는 굉장히 흥미롭고 재미있다. 그리고 JS라서 접근하기도 쉽고 이해도 빠르다 좀더 열심히 들어보도록 하자.

# 3. reference

[Rest API](https://developer.github.com/v3/)

[gitignore](https://www.gitignore.io/api/node)

[HTTP method](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)

[상태코드](https://httpstatuses.com/)

[Nodejs한글](https://expressjs.com/ko/)

[handlebar](https://handlebarsjs.com/)

[pug](https://pugjs.org/api/getting-started.html)
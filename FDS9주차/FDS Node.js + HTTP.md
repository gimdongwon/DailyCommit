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

# HTTP

* 웹 브라우저와 웹 서버간의 통신을 위헤 개발된 통신규약으로 최근에는 REST API의 부상과 함께 다른 용도로도 널리 사용됨
  * 모바일 앱: 서바간 통신
  * 서버-서버 간 통신
* 80번 포트를 기본으로 사용
* 클라이언트의 요청과 서버의 응답으로 이루어짐

# 2. TIL

오늘은 rest api, nodejs, http에 대해 배웠다. 통신에 관한 여러가지 개념을 배웟는데 한개도 버릴게 없는것 같다. 평소에도 많이 듣던 키워드들이라 놓치지 않고 듣기 위해서 열심히 했다. 그래서 오늘은 세가지 개념을 배웟는데 원래 rest api 랑 restful api랑 다른 것인줄 알았다. 하지만 영어뜻 그대로 ful 한 api를 표현식에서 다른거였다. 처음에는 api랑 헷갈렸었는데 굉장히 세분화되고 디테일하다 rest api의 특징들을 정리하며 유니폼 인터페이스를 가지고, 세션이나 쿠키정보를 별도로 저장하지않으며 들어오는 요청만 수행한다. 그리고 기존 인프라를 그대로 활용한 캐싱기능이 가능하며, 자체 표현구조로 가독성이 높다. 서버와 클라이언트의 일의 이분성이 명확해지고 계층성구조가 유연하다.
Nodejs는 한마디로 요약하면 JavaScript를 실행시키기 위한 서버환경을 구성해주는 것이었다.
http는 Hiper Text Transfer Protocol로써 클라이언트와 서버간의 통신규약이다.
내일도 재미있게 통신이야기를 듣도록 하자.

# 3. reference

[Rest API](https://developer.github.com/v3/)

[gitignore](https://www.gitignore.io/api/node)
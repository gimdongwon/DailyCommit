# Access Token & JWT

쿠키의 단점

* 쿠키를 지원하는 클라이언트에서밖에 사용할 수 없다.
* 적절히 관리되지 않으 ㄴ쿠키느 ㄴ보안에 취약하며, 관리하려해도 cors에 취약함
* 모바일, 서버(포스트맨)에서는 쿠키를 지원하지 않는다.

token 방식은 cookie에 비해 받는것과 보내는 것 둘다 보내주어야 한다.

다양한 인증수단이 아닌 하나의 수단으로 통일하게 사용할 수 잇다.

authiorization 을 이용해서 토큰방식으로 통신함.

sessionStorage.setItem('foo', 'bar') 저장하고 싶은 이름, 값

localStorage 애는 꺼져도 저장되어짐

# JWT (JSON Web Token)

최근 널리 사용되고 이쓴ㄴ 토큰형식의 표준
토큰안에 JSON형식으로 정보를 저장함

axios.post(<경로>, <바디>, <설정객체>)
axios.get(<경로>, <설정객체>)
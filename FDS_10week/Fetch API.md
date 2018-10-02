# Fetch API

웹 브라우저의 XMLHttpRequest를 대체하기 위해 만들어진 새로운 HTML client의 표준

polyfill 옛 브라우저에서 요즘 기술을 사용하게 하기위한 기술

## Axios vs Fetch API

Axios는 여러 편의기능(instance와 같이 설정을 재사용하거나 요청중인 연결을 취소하는 등)을 제공

최신 프레임워크, 라이브러리는 fetch를 써야만 할 경우가 있다. XMLRequest 는 지원을 안해준다. axios는 지원하지않고
fetch를 잘 다뤄준다.

#reperance

[옛 방식과 요즘방식](https://poiemaweb.com/)

# HTTP Cache

## Cache

접근 속도를 개선하기 위해 따로 저장소를 두는 '방법'을 가리킴

메모리 l2,l3가 주 메모리에서 하고 cache가 해서 ram으로 넘겨줌

## HTTP Cache

절대로 자료가 바뀌지 않을 경우 만료방법을 쓰는 것이 좋다

10분마다 업데이트가 될 확률이 있는 자원이면 검증을 쓴다.

Etag : It is a validator, a unique string identifying the version of the resource. Conditional requests using If-Match and If-None-Match use this value to change the behavior of the request.
케시의 검증을 위해 사용되는 자원식별자

Cache-Control 만료할때 쓰이는 헤더

hash 긴정보를 계산하는 성질이 있어서 짧게 만들어주는 계산 공식

1. 해쉬는 어떤 정보로 부터 짧은 문자열을 생성하는 함수
2. 같은 입력이 주어지면 항상 같은 출력이 나온다
3. 입력이 조금이라도 변경되면 완전히 다른 출력이 나온다.

* Expires

캐시를 만료시킬 시각을 서버에서 명시적으로 지정

* Last-Modified (시간이용 검증)

원래 자료가 마지마긍로 수정된 시각.

* 서버는 저번에 저장해두었떤 Etag값을 알수가 있다.서버는 해당 경로에 있는 자원의 ETag와 비교해보고 자원의 전송 여부를 결정

Cacheable Methods

똑같은 응답을 계속보내는 것은

 응답을 재활용할 수 있는 메소드가 아니다

 res = await axios.post('http://localhost:3000/users/login', {username: 'sdf', password:'sdf'})

 res = await axios.get('http://localhost:3000/comments',{
headers:{
	Authorization: `Bearer ${token}`
}
})

res = await axios.post('http://localhost:3000/posts/2/comments',{body:"댓글내용"},{
headers:{
	Authorization: `Bearer ${token}`
}
})


지우는거 res = await axios.delete('http://localhost:3000/comments/7',{
headers:{
	Authorization: `Bearer ${token}`
}
})
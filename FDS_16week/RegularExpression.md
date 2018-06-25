# 정규 표현식

언어이고 표현방식이 다른 패턴

ex) 사용자가 이메일을 입력했을 때 이메일형식이 맞는가 휴대폰번호가 맞는가 검사할 때 사용한다.
내가 문자열안에서 어떤 문자를 찾고 싶을 떄 특정 패턴과 일치하는 정보를 찾고 싶을 때 혹은 치환하고 싶을 때(검사, 검색, 치환)

> python, ruby, java 등등 많은 곳에서 쓰인다.

RegExp (정규표현식)(regualar expressin)

```js
1. var re = /ab + 2/

2. var re = new RegExp("ab+2")

웬만하면 1번 사용!
```

## 단순 패턴 사용하기

숫자 혹은 영문으로만 구성된 정규표현식. 문자열에 있는 그대로 대응시키고자 할 때 사용된다.

```js
"hi, do you know your abc's?".match(/your/);
"hi, do you know your abc's?".search(/abc's/); // index 출력해줌
"hi, do you know your abc's?".split(/abc's/);
"hi, do you know your abc's?".replace(/abc's/, "dongwon");
```

```js
// * 사용해보기
"abc".match(/ab*c/);
"1234 abc".search(/ab*c/);
"1234 abc".split(/ab*c/);
"1234 abc".replace(/ab*c/, "d");
"1234 abc".replace(/ab*c/, "{$&}");
```

> 2 만개 이메일에 괄호 치는 경우
> => 정확히 일치하지 않아도 규칙만 있다면 계산이 가능하다.

## \

특수무자가 아닌 문자 앞에서 사용되는 백슬래시는 "해당 문자는 특별하고 문자그대로 해석하면안된다!" 라는 뜻을 가짐.

특수문자 앞에 위치한 백슬래시는 "다음 문자는 특별하지않고, 문자 그대로 해석되어야 한다."

## {n} : 앞 표현식이 n 번 나타나는 부분에 대응됩니다. N 은 반드시 양의 정수여야 합니다.

예를 들어, /a{2}/는 "candy,"의 'a'에는 대응되지 않지만, "caandy,"의 모든 a 와, "caaandy."의 첫 두 a 에는 대응됩니다.

## {n,m} 에서 1,3 이라면 3 번이상에 초점을 맞춘다.(굉장히 탐욕적임

## [xyz]

문자셋(Character set) 입니다. 이 패턴 타입은 괄호 안의 어떤 문자(이스케이프 시퀀스까지 포함)와도 대응됩니다. 점(.) 이나 별표 (\*) 같은 특수 문자는 문자셋 내부에서는 특수 문자가 아닙니다. 따라서 이스케이프시킬 필요가 없습니다. 하이픈을 이용하여 문자의 범위를 지정해줄 수 있습니다.

예를 들어, 패턴 [a-d] 는 패턴 [abcd] 와 똑같이 동작하며, "brisket"의 'b' 에 일치하고, "city"의 'c' 에 일치합니다. 패턴 /[a-z.]+/ 와 /[\w.]+/ 는 "test.i.ng" 전체 문자열이 일치합니다.)

## 플래그를 사용한 고급검색

i : insensetive => 대소문자 구분없음
g : global => 전역검색

## 정규식 실행결과

// 문자열 래퍼 객체의 match, search, split, replace 메소드가 정규 표현식을 지원
// 래퍼객체 순간적으로 객체로 됨

```js
"abc".match(/ab*c/);
"1234 abc".search(/ab*c/);
"1234 abc".split(/ab*c/);
"1234 abc".replace(/ab*c/, "{$&}"); // 매칭된 부분을 괄호로 싸겠다.

// 숫자 문자와 일치하는 패턴
"1".match(/\d/); // [..]
"hello".match(/\d/); // null

"hello*".match(/\*/);
"an A".match(/^A/);
"Aan A".match(/^A/);
"Aan A".match(/A$/);

"angel".match(/e?le?/);

"123abc".match(/\d+/);

"1  jasdf".match(/./);
// 여느 꺽쇠 괄호 뒤에 1개 이상의 문자가 오고, 그 다음에 닫는 꺽쇠 괄호가 나오는 패턴
// 사이에 들어오는ㄴ  문자는 무엇이든 상관없지만 가능한 적게 찾기 위해선 ? 추가햇!
"<hello>worldd".match(/\<.+\>/);
"<hello>worldd <java>script".match(/\<.+?\>/);
"<1234>worldd".match(/\<\d+\>/);

"foo foo".match(/(foo) \1/);
"foooo foooo".match(/(fo+) \1/); // [...]
"foooo foo".match(/(fo+) \1/); // null '\' backraference

"foo bar foo bar".match(/(foo) (bar) \1 \2/);
"foo bar foo bar".match(/(foo) (bar)/);

// email 주소를 가리고 싶다 나누고 싶다

"dongwon@likelion.org".match(/(.+?)@(.+)/);
"dongwon@likelion.org".replace(/(.+?)@(.+)/, "id: $1, domain: $2"); // 순서대로 대입된 값을 가져올 수 있다. 찾아 바꾸기 할때 포획가로 굉장히 유효하다.

// 포획괄호 2가지 역할 부분 표현식을 하나의 묶음 으로 취급 + 대응된 문자열을 기억하는 기능

"foofoofoo".match(/(foo)+/);
"foofoofoo".match(/(foo)*/); // 포획괄호
"foofoofoo".match(/(?:foo)*/); // 비포획 괄호

// ?:이 나오면 겁먹지 말자 그냥 "기억하지 않겠다라는 뜻"

// 탐욕자의 욕심 줄이기
"caaaaandy".match(/a{1,3}/);
"caaaaandy".match(/a{1,3}?/);

// 같은 의미
"caaaaandy".match(/a{1,}?/);
"caaaaandy".match(/a+/);

"caaaaandy".match(/a?/);
"caaaaandy".match(/a{0,1}/);

// a 또는 b 또는 c와 일치하는 하나의 문자와 대응하는 패턴
"abcabcabcabcdef".match(/[abc]/);

// 대괄호 안에 있는 문자는 특별한 의믜없이 문자 그대로 사용된다.
"hello******world".match(/[*]+/);

// 연속된 소문자 알파벳 찾아내기 같음

"hello world".match(/[a-z]/);
"hello world".match(/[abcdefghijklmnopqrstuvwxyz]/);

"hello 안녕하세요".match(/[가-힣]+/);
"1284092318".match(/[0-9]+/);

"hello WORLD".match(/[^a-z]/);

// 공백 모두 제거하기
//g global 의 g 로써 모두 적용하겠다.
"hello      world      java   script".replace(/\s+/g, "");

//단어를 골라내고 싶다
"hello      world      java   script".match(/\w+/g);

// 대소문자구분없이
"HELLO WORLD".match(/[a-z]+/i);

// 여러 줄이 잇는 문자열
// m : 플래그를 붙였을 때
// ^ : 줄의 첫 부분에 대응
`Hello
World
Java
Script`.match(/^\w+/gm);

"010-4879-6131".match(/^01[0179]-\d{3,4}-\d{4}$/);
```

vscode 에서 ""를 ''로 바꾸기

```js
"(.+?)";
"$1";
```

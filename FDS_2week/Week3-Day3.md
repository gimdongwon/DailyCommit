# 4/4(수)

## Today I learned


---
### slogan
### 구조 선택자 structure selector
- :nth-child(*): *번째의 자식 요소를 선택함. (0부터가 아니라 1부터 시작함)
- w3cshool selector reference 
```css
.favorite-site-list {
  overflow: hidden;
}
.favorite-site-list li:nth-child(1)::before {
  content: '1';
}
.favorite-site-list li:nth-child(2)::before {
  content: '2';
}
.favorite-site-list li:nth-child(3)::before {
  content: '3';
}
.favorite-site-list li:nth-child(4)::before {
  content: '4';
}
```
### Image Replace trick
####  padding
```
overflow: hidden;
box-sizing: border-box;
padding-top: (height amount);
```
####  position
```
(self) :after {
  content: ""
  background-image: (image)
  position: absolute
  top: 0;
  left: 0;
}
(self) { position : absolute;
  top: 0;
  left: 0;
  line-height: (height amount);
  text-align: center;
}
(parent) {
  position: relative;
}
```
### 인용문
+ `<q>`: 인라인 인용구 (브라우저에서 겹따옴표 기본으로 렌더링해줌)
+ `<blockquote>`: 블록 인용구
문장 전체를 가져온 것이 아니라서 `q`로 마크업  
인용한 데이터를 명시하는 속성(`cite`)
- `cite`를 통한 출처에서 책은 ISBN 명시할 것
- 아티클에 숨긴 footer를 활용해서 출처를 마크업. main은 한번만, header, footer 는 여러번 쓸 수 있다.
```html
<p>
  <q cite="[출처 URL]">
    인용문장
  </q>  
</p>
<footer class="a11y-hidden">
  출처: ....
</footer>
```
---
### footer

> #small tag

> small print; small 요소는 작은 프린트와 같은 사이드 커멘트를 나타냅니다. 작은 프린트는 보통 부정, 경고, 법적 제약, 저작권과 같은 것을 포함합니다. 작은 프린트는 또한 이따금씩 법적인 귀속, 혹은 라이센스 문제와 같은 용도로 사용됩니다. em 요소로 강조된 텍스트나 strong 요소로 중요하다고 표시된 텍스트에 대해서 강조를 취소하거나 중요성을 낮추는 용도로 사용면 안 됩니다.

> Entity tag: HTML 예약 문자나 특수문자를 쓸때 사용하는 코드.

>ex)&nbsp; &amp; ...
'<'나 '&'와 같은 특수문자들은 html태그로도 사용되기 때문에 브라우저가 혼란을 격는 경우가 많습니다.


> 일반적으로 웹 페이지 하단에 보면 사이트를 알리는 주소와 연락처, Copyright 등이 들어갑니다. 아래 그림처럼 티스토리에는 메뉴도 들어가 있습니다. 이렇게 하단에 표시되는 정보를 표기할 때 사용되는 <address> 태그가 있습니다. 폰트는 기본 크기이며 자동으로 이텔릭체와 텍스트 기울기가 적용됩니다. 좀더 세심하게 변경하고 싶다면 CSS 로 적용하면 되겠지만 <address> 태그만으로도 정보 표현이 가능하기 때문에 많이 이용합니다.


* :nth-child(8)

```
li:nth-child(8) span {
    background-color: #298EB2;
    box-shadow: -3px -3px 10px rgba(0, 0, 0, 0.4), inset 0 0 10px black;
}
````

![img-1](/image/img-1.png)

> GENERIC CHILD RANGES

* nth-child(n+4):nth-child(-n+8)

```
li:nth-child(n+4):nth-child(-n+8) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
```
![img-2](/image/img-2.png)

* nth-child(n+2):nth-child(odd):nth-child(-n+9)
```
li:nth-child(n+2):nth-child(odd):nth-child(-n+9) span {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}
```
![img-3](/image/img-3.png)
## USING THE :NTH-OF-TYPE
>:NTH-OF-TYPE

* :nth-of-type(3)
```
/* these are represented with blue circles */
span:nth-of-type(3) {
    background-color: #298EB2;
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black;
}

/* these are represented with orange squares */
div:nth-of-type(4) {
    background-color: #E17149:
    box-shadow: inset -3px -3px 10px rgba(0, 0, 0, 0.4), 0 0 10px black; 
}
```
![img-4](/image/img-4.png)
---
---
## WAI-ARIA
WCAG - 웹 콘텐츠 접근성 가이드라인
1.1 -> 2.0 -> 2.1(recommendation)
KWCAG - 한국형 웹 콘텐츠 접근성 지침(완화된 버전)
신기술을 고려한 형태로 발전되었지만 문제 해결을 위한 기술, 지침이 부족함
- RIA의 동적
- Ajax를 통한 실시간 변경 콘텐츠 - 주식같은 갱신되는 정보가 반영되지 않음 
- 변경된 부분만 읽어주는 기능이 없음
- 저시력 장애자들은 가시영역 밖의 콘텐츠를 파악하기 어려움 (가로스크롤 비권장)
### ARIA 목적
마크업 역할 부여, 상태, 속성반영을 상호 운영성 보장.  
보다 나은 사용자 경험
스크린리더가 이해할 수 있도록 중간에서 만들어주는게 WAI ARIA API
#### 스크린리더 호환성
JAWS 비싼 스크린리더(백만원....)(미국에서 가장많이 쓰임) - 호환성이 79%
NVDA 무료 스크린리더인데 치고 올라오는 중(음성 엔진만 유료로 구매하면 됨) - 윈도우 지원
VOICE OVER - 맥, 아이폰의 ‘손쉬운 사용’ - 호환성이 좀 떨어짐(특정 기능으로 따지면 맥이 더 떨어짐...)
네이티브 방식을 우선하고 쓸 수 없을 경우 보조하는 역할로 쓰자
### ARIA 역할, 속성, 상태
1. 역할(role)
 부여한다고 해서 동적으로 변경할 수 없음(정적으로 부여하는 기능) - 원래 의미를 변경할 수 없음
 역할모델이 다양하니 찾아보자.
 role=“button”을 부여하면 ‘~버튼’이라고 읽어준다.
2. 속성(Property)과 상태(State)
 aria-* 접두어를 가진다. 상태에 비해 속성은 자주 바뀌지 않는 요소에 적용한다.
- 속성:
 + 필수항목 속성(aria-required),
 + 추가 설명 속성(aria-describedby): 논리적인 순서에 맞추지 않아도 보조할 수 있다.(디자인에 맞추더라도)
 + 테이블 정보를 읽을 때 th에 id부여 td에 aria-describedby 연결해서 선언해서 해결한다.
 + alt 속성을 따로 쓰지 않고 본문의 내용을 연결해서 쓸 수 있다.
 + 배경 이미지를 썼을 때 대체 텍스트를 가질 수 있기 때문에 역할을 부여할 수 있다.
- 상태: 주로 Boolean 값을 가진다.
 + 접힘 펼침 상태 정보(aria-expanded): 탭패널의 내용을 미리 알려줄 수 있다.
 + 오류 상태(aria-invalid)
 + 토글 상태(aria-pressed): 토글 버튼의 현재 상태를 알려준다.
 + 웹폰트 아이콘에 지정된 클래스 중복 설명을 피하기 위해서도 쓰인다.
 +  modal을 만들 때 보통 단순한 레이어로 만들기 때문에 역할 부여해준다.
    `role="diallog"` dimmed된 영역에 역할 부여
    `role="alert"`
### ARIA 사용시 주의점
1. Aria role와 html5 시멘틱 요소를 중복해서 사용하지 않는다.
2. 레이블 제공: div로만 복잡하게 구조가 짜여져 있을 때 ARIA를 써서 개선할 수 있다. 원래 있던 요소의 역할을 바꾸는 것은 신중하게 하자.
3. 키보드 사용보장(tabindex=“0") + 스크립트를 통해 특정 키로 접근 가능하도록 추가적인 작업필요

---
## 2. Today I found out
> 눈에 보이지 않는 부분까지 고려하면서 정성들여 마크업한 결과가 스크린 리더로 읽혔을 때 소름 돋았다. 프론트엔드 개발을 통해 시각적인 불편을 획기적으로 개선시킬 수 있다는 것이 인상 깊었다 

> nth-child는 정말로 효율적인 선택자 인것 같다. 연마하여서 내것으로 만들어야 겠다.

>순서형 목록은 list-style을 none처리해서 보통 span 태그로 숫자를 다시 추가해서 스타일링 했었는데... counter-increment와 counter라는 걸로 웹접근성을 해치지 않으면서 커스텀 가능한 순서를 부여할 수 있다는 것을 알게되었다.

>HTML은 어렵다. 왜냐하면 '말하기'와 '쓰기'를 동시에 하는 것이기 때문이다. 경제성과 동시에 좋은 구조를 가져야 한다. 특히 이는 접근성을 위해 매우 중요하다.  거기다가 다양한 언어 (엔진, 기기, 대상, 사람 등)에 맞추어 작성해야 한다니. 제대로 된 HTML은 노벨문학상 줘야 한다.
---

## 3. 오늘 읽은 자료 (혹은 참고할 링크, 생략해도 됨)

+ 순서형 리스트 커스터마이징
  - [counter-increment](https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment)
  - [counter()](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)
+ [`<small>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small)
+ a태그 프로토콜
  - [a 태그의 전화번호 프로토콜](https://css-tricks.com/the-current-state-of-telephone-links/)
  - [a 태그의 메일 프로토콜](https://en.wikipedia.org/wiki/Mailto)
+ 구조선택자
  - [nth master](http://nthmaster.com/) - 구조선택자에대해 직관적으로 볼 수 있는 사이트
+ 엔티티코드
  - [엔티티코드 검색 가능한 사이트](http://www.amp-what.com/unicode/search/)
+ IR 기법
  - [스크린리더 사용자를 위한 IR(Image Replacement)기법과 추가 설명 제공하기](http://nuli.navercorp.com/sharing/blog/post/1132804)
  - [다룸의 IR 기법](http://ui.daum.net/convention/css/css_ir)
+ WAI-ARIA
  - [자료실 WAI-ARIA 사례집](http://www.wah.or.kr/board/boardList.asp?brd_sn=2)
  - [ARIA 적용 예제](https://github.com/niawa/ARIA)
  - [마크업 개발자의 WAI-ARIA적용기](https://github.com/niawa/AOA/tree/master/2018/03.09/Session_A)

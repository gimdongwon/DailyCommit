# react 시작!

## 1.1 React란 무엇인가

react는 UI컴포넌트 라이브러리이다. react UI컴포넌트는 다른 특별한 템플릿 언어가 아닌 javascript를 이용해서 만든다. 여러 컴포넌트로 UI를 구성하는 이런 방식은 react의 핵심 철학이다. <br>
react UI 컴포넌트는 매우 독립적이며 특정 관심사에 집중된 기능 블록이다. 예를 들어 날짜선택기, 챕차, 주소, 우편번호 요소를 위한 컴포넌트가 있다고 하자. 이런 컴포넌트는 시각적 표현과 동작을 구현하는 논리를 모두 담고 있다. 어떤 컴포넌트는 서버와 직접 통신하기도 한다. 예를 들어 자동완성 컴포넌트가 자동완성 목록을 서버에서 받아오는 경우이다.<Br>
컴포넌트 기반 아키택체(component based architecture, CBA)는 일반적으로 일체형 UI 에 비해 재사용과 유지보수, 확장이 용이하다. react는 순수한 자바스크립트를 기반으로 CBA를 구현하였고 컴포넌트 구성에 대한 새로운 시각을 창출해냈다.

## 1.2 React가 해결할 수 있는 문제

지난 몇년간 웹개발에 있어서 복잡한 웹 UI로 구성된 프론트엔드 어플리케이션을 개발하고 관리하는데 어려움이 있었다. 이 부분에서 React팀이 해결한 문제는 **"시간에 따라 변화하는 데이터를 다루는 거대한 어플리케이션의 개발"** 이다. 이 문제가 야기된 첫 이슈는 여러가지 데이터를 가져와서 입력 자동완성을 구현하는 일이었는데 데이터는 백엔드에서 비 동기적으로 가져왔다. 개발을 진행하면서 새로운 행을 추가할 지점을 향해 DOM 요소를 재 사용하는 것이 점점 복잡해 졌다. 결국 DOM요소를 매번 새롭게 생성하기로 했다. UI를 함수로 만든 것이다. 여기에 데이터를 전달하고 호출하여 뷰를 렌더링하므로 뷰를 예측할 수 있었다. 이런 과정을 거치면서 실제 DOM으로 렌더링하는 과정에서 병목이 발생한다는 점을 알게되었는데 이 부분을 해결할 수 있는 **알고리즘**이 개발 되었다. 이 덕분에 React의 속도를 높일 수 있었고 성능면에서도 이득이 있었다.

## 1.3 React의 장점

새로운 라이브러리나 프레임워크라면 무엇이든 이전 도구보다 낫다고 주장한다. React가 바꾸어 놓은 것은 대부분의 프론트엔드 프레임워크에서 중요한 개념으로 받아들였던 템플릿 엔진에 대한 부분이었다.

* 단순한 웹 개발 : React는 순수 자바스크립트로 만든 컴포넌트 기반 아키텍처이다. 선언형 스타일이며 강력하고 개발자 친화적인 DOM 추상화를 제공한다. React Native를 사용하면 DOM뿐만아니라 안드로이드나 iOS에서도 이런 이점을 얻을 수 있다.
* 빠른 UI : 뛰어난 성능을 제공하는데 이는 가상 DOM 채택과 DOM 의 변경사항을 비교할 때 사용하는 훌륭한 알고리즘 덕분이다.
* 코드량 감소 : React커뮤니티와 개발 생태계를 통해 수많은 라이브러리와 컴포넌트를 접할 수 있다.

### 1.3.1 간결성

컴퓨터 공학에서 간결성은 개발자와 사용자에게 중요한 가치다. 간결성은 편리하게 사용하는 것과 다르다. 간결하다 해도 구현하기 어려운 경우도 있지만 결과적으로는 그렇지 않은 경우보다 우아하며 효율적이다.
react를 간결하게 만드는 경우는 다음과 같다.

* 선언형 스타일 채택 : react는 뷰를 자동으로 갱신하는 선언형 스타일이다.
* 순수한 자바스크립트를 이용한 컴포넌트 기반 아키텍처 : 컴포넌트에 자바스크립트만 사용
* 강력한 추상화 : DOM을 쉽게 다룴 있고 크로스 브라우징을 위해 다르게 구현할 수 밖에 없었던 인터페이스나 이벤트 핸들링을 정규화했다.

### 선언형 스타일 채택

선언형으로 채택하면 개발자가 순서대로 무엇을 해야 할지를 작성하는 명령형 스타일과 달리 실행 결과가 어떻게 되어야 할 지를 코드로 작성한다. 선언형으로 작성하면 복잡도를 줄어줄 뿐만 아니라 코드에 대한 이해도와 가독성을 높일 수 있기 때문이다. 간단히 예제를 들어보자

```js
var arr = [1,2,3,4,5]
arr2 = []
for(var i =0; i<arr.length; i++){
  arr2[i]= arr[i]*2
}
console.log('a', arr2)
```

이것이 명령형 프로그래밍이다. 잘 작동한다. 그러나 코드의 복잡도가 높아져 제대로 작동하지 않는 시점이 오기 전까지의 이야기이다. 다행히도 map()을 이용하면 선언형 프로그래밍을 다시 작성할 수 있다.

```js
var arr = [1,2,3,4,5]
arr2 = arr.map(item=>item*2)
console.log('b',arr2)
```

콘솔에서는 위에 두 예제의 결과같이 동일하지만 아래 예제는 선언형으로된 예제이다. 아래 방식이 더 이해하기 쉽고 가독성도 뛰어나다. 또다른 예제를 보자
중첩된 객체 내부의 값을 가져오는 함수를 사용하는 예다. 이 함수는 account또는 account.number처럼 넘겨 받는 문자열에 따라 값을 반환한다.

```js
var profile = {accpimt:'47574416'}
var profileDeep = {account:{number:47574416}}
console.log(getNestedValueImperatively(profile, 'account')=== '47574416')
console.log(getNestedValueImperatively(profileDeep, 'account.number')===47574416)
```

명령형 스타일은 말 그대로 결괏값을 구하기 위해 해야할 과정을 코드로 옮겨 놓았다.

```js
var getNestedValueImperatively = function getNestedValueImperatively(object, propertyName){
  var currentObject = object
}
var propertyNamesList = propertyName.split('.')
var maxNestedLevel = propertyNamesList.length
var currentNestedLevel

for(currentNestedLevel = 0; currentNestedLevel < maxNestedLevel; currentNestedLevel++){
  if(!currentObject || typeof currentObject === 'undefined') return undefined
  currentObject = currentObject[propertyNamesList[currentNestedLevel]]
}
return currentObject
}
```

명령형 스타일과 달리 선언형 스타일은 결괏값에 좀 더 집중한 것이 대조적이다. 지역변수가 줄어들고 논리가 단순해졌다.

```js
var getValue = function getvalue(object, propertyName){
  return typeof object === 'undefined' ? undefined : object[propertyName]
}

var getNestedValueDeclaratively = function getNestedValueImperatively(object, propertyName){
  return propertyName.split('.').reduce(getValue, object)
}
console.log(getNestedValueDeclaratively({bar: 'baz'}, 'bar')== 'baz')
console.log(getNestedValueDeclaratively({bar: {bar:1}}, 'bar.baz')=== 1)
```

대부분의 프로그래머들은 명령형 프로그래밍이 익숙하지만 선언형 프로그래밍이 훨씬 단순하다. 

여기까지는 간단한 자바스크립트를 살펴보았고 react도 마찬가지로 UI를 구성할 대 선언형 스타일로 작성한다. 개발자가 UI요소를 구성할 때 선언형으로 작성한다. 뷰를 갱신해야할 때가 바로 선언형 스타일이 빛을 발하는 순간이다. 이것을 내부상태 변화라고 부른다. react는 상태 변경에 따라 뷰를 갱신한다.

react는 내부적으로 가상 DOM을 사용하여 브라우저에 이미 반영된 뷰와 새로운 뷰의 차이점을 찾아낸다. 이 과정을 DOM비교 혹은 상태와 뷰으 ㅣ보정이라고 부른다. 따라서 개발자는 명시적으로 뷰를 변경하려고 노력할 필요가 없다. 상태를 갱시낳면 뷰는 이에 따라 자동으로 갱신된다.

그러나 jQuery는 이런 갱신과정을 명령형으로 작성해야한다. 개발자들은 전체 페이지를 다시 랜더링하는 대신 DOM을 조작해 필요한 부분만 변경한다. jQuery 메서드를 싱행한다는 것은 곧 DOM을 조작하는 것이라고 볼 수 있다.

AngularJS같은 프레임위크의 경우에는 자동으로 뷰를 갱신하기도 한다. **양방향 데이터 바인딩**을 이용하는데 이것은 말 그대로 뷰와 모델이 양방향으로 데이터를 통신하고 동기화 한다는 것을 의미한다.

jQuery나 Angular는 각각을 극단적인 선택이라고 생각할 수 있는데 jQuery는 거의 아무것도 하지않고, 개발자가 직접 ㅂ의 갱신과정을 하나하나 작성해야한다. 반대로 Angular는 프레임워크가 모든것을 처리한다.

jQuery는 실수가 잦아지고 더 많은 노력을 들여야 하며 Angular는 양방향 데이터 바인딩은 금세 통제하기 어려운 상태가 되므로 코드를 잘 설명하기 어렵다. jQuery에 비해 가독성이 낫고 직접장성해야하는 부분이 적기는 하지만 템플릿과 ng-if지시자처럼 도메인 특정 언어에 의존한다.

### 자바스크립트를 이용한 컴포넌트 기반 아키텍처

CBA는 장점이 많이 있는데 그중에서도 **코드 재사용이 쉬워서 코드를 줄일수 있다는 점**이 가장 대표적인 장점이다.
예전에는 자바스크립트가 글자를 반짝이게 하는 수준에 불과했지만 요즘은 SPA같은 경우 복잡한 사용자 입력을 처리하고 브라우저에서 렌더링을 수행한다. 즉, HTML과 자바스크립트가 기능적으로 밀접하게 결합되어있다. 따라서 프로젝트 하나 또는 컴포넌트 하나를 위한 작업이라면 HTMl과 자바스크립트를 분리하지 않는 방식이 개발자에게 더 합리적이다.

* Angular템플릿의 문제점
  * 개발자가 다른 언어를 배워야한다는 점이다.
  * 데이터에 관련된 로직과 데이터를 랜더린하는 방법이 서로 분리되어있다.

### 강력한 추상화

reac는 강력한 문서모델 추상화를 제공한다. 좀더 자세히 말하면 내부의 인터페이스는 숨기고, 대신에 정규화 과정을 거친 합성 메서드와 속성을 제공한다. 또한 react의 우수한 DOM 추상화를 증명하는 또다른 예는 서버 측 렌더링 기능이다. 서버측 렌더링은 검색엔진 최적화와 성능 개선에도 유용하다.


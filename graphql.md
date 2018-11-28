# GraphQL

페이스북에서 만든 레이어 쿼리 언어로써 기존의 웹 혹은 모바일 어플리케이션의 API를 구현할 때는, 통상적으로 REST API가 사용되는데 기존의 REST API를 사용하여 API를 구현한다면, 우리가 클라이언트 사이드에서 어떠한 기능이 필요할 때마다 그때그때 새로운 API를 만들어주어야 했다.

## Graphql은 왜 탄생하게 되었는가?

- Restful API에서는 다양한 기종에서 필요한 정보들을 일일이 구현하는 것이 힘들었다.
- 예로, ios와 android에서 필요한 정보들이 조금씩 달랐고, 그 다른 부분마다 API를 구현하는 것이 힘들었다.

## graphql 과 restful 의 차이점

1. 하나의 endpoint를 이용한다.
2. 요청할 때 사용한 query문에 따라 응답의 구조가 달라진다.

## graphql의 장점

1. HTTP요청의 횟수를 줄일 수 있다.

- Restful은 resource마다 endpoint가 있어 종류별로 요청을 해야하고, 따라서 요청 횟수가 필요한 Resource의 종류에 비례한다.

2. HTTP응답의 size를 줄일 수 있다.
   - Restful은 응답의 형태가 정해져있고 따라서 필요한 부분에 대한 부분적 요청이 불가하나, graphql은 원하는대로 요청하는 것이 가능하다.

## graphql의 단점

1. 파일 전송등 text만으로 하기 힘든 내용들을 처리하기 복잡하다.
2. 고정된 요청과 응답만 필요한 경우에는 Query로 인해 요청의 크기가 Rest API보다 더 커진다.
3. 재귀적인 Query가 불가능하다.(응답의 길이가 너무 깊으면 API를 만들 수 없다.)

## Graphql vs Restful API

- Graphql

  1. 서로 다른 모양의 다양한 요청들에 대해 응답할 때
  2. 대부분의 요청이 CRUD에 해당할 때

- Restful API
  1. HTTP, HTTPS에 의한 caching을 잘 사용하고 있을 때
  2. file전송등 단순한 text로 처리되지 않는 요청이 있을 때
  3. 요청의 구조가 정해져있을 때

=> 둥줄에 하나를 굳이 선택할 필요는 없다 적제 적소에 사용할 것

> 주의해야할 것은 하나의 목표를 위해 두 API structure 를 섞어놓는 것은 API 의 품질을 떨어트릴 수 있다는 점이다.

만약에 다음과 같이 클라이언트 측에서 쿼리를 만들어서 서버로 보내면 우리가 원하는대로 결과를 반환해주면 어떨까

```sql
query {
  account(id: "1") {
    username
    email
    fristName
    lastName
    friends {
      firstName
      username
    }
  }
}
```

```sql
{
  "data": {
    "account":{
        "username": "dongwon",
        "email": "ehddnjs8989@gmail.com",
        "firstName" : "Dongwon",
        "lastNmae" : "Kim",
        "frieds":[
          {
            "firstName": "DanBi",
            "lastName": "Lee"
            },
            {
            "fristName": "Juyoung",
            "lastName": "Byun"
            }
        ]
      }
  }
}

```

이렇게 깔끔하게 우리가 필요한 정보를 쿼리로 만들어서 서버에 전달해주면, 서버가 알아서 프로세싱을 하여 주어진 틀대로 데이터를 보여준다면, 굉장히 우아할 것이다.

쿼리를 토앟여 딱 필요한 데이터만 fetching을 하기 때문에 overfetch혹은 underfetch를 할 걱정은 할 필요가 없다.

심지어 GraphQL은 특정 언어에 제한된 것이 아니어서 Node.js, Ruby, PHP, Python, Golang등 여러 환경에서 사용할 수 있다. 심지어 HTTP 프로토콜에 제한되어 있지도 않아서, WebSocket이나 MQTT프로토콜 위에서 사용 할 수도 있다. 데이터베이스도 어떤 데이터베이스를 사용하던 상관이 없다.

따라서, 이미 구현된 시스템에 도입을 해도 기존에 있던 시스템이 무너지지 않기 때문에 부담없이 적용할 수 있다.

- 예제

```sql
mutation {
  createAccount(
    username: "testuser"
    email: "tester@email.com"
    firstName: "first"
    lastName: "last"
  ) {
    id
    username
  }
}
```

```sql
## 변환된 데이터
{
  "data": {
    "createAccount": {
      "id": "5",
      "username": "testuser"
    }
  }
}
```

graphQL을 사용하면 큰 노력을 들이지 않고도, 다양한 형태의 데이터를 fetching을 할 수 있는 시스템을 구현할 수 있다.

facebook에서는 만든 A query language for your API 로 공식 홈페이지에서 설명하고 있다.

여기서 API란 서버상에서 제공하는 API를 의미하며 이는 클라이언트와 서버의 통신언어로도 생각할 수 있다.

또한 GraphQL은 하나의 통신 규약이라고 볼 수 있으며 이를 여러 언어에서 구현한 코드는 [여기](https://graphql.org/code/#javascript)에서 볼 수 있다.

GraphQL의 장점은 다음과 같다.

- 요청 메시지가 값이 없는 JSON과 비슷하며 받는 데이터는 JSON형태이다.
  - 요청에 따른 응답데이터를 예측할 수 있다.
  - 직관적이다.
- 단일 요청으로 원하는 데이터를 한번에 가져올 수 있다.
  - REST API의 N+1 Problem을 해결 할 수 있다.
- GraphQL은 type system을 지원한다.
  - 개발 혹은 사용시 좀 더 명확한 오류 메시지를 제공한다.
- GraphQL등의 강력한 도구(통신 테스트 도구 등)을 사용할 수 있다.
- 확장이 용이하다.

단점은 다음과 같다.

- 러닝 커브가 조금 있다.
- GraphQL의 type을 정의한 코드, mutation을 정의한 코드가 추가되면서 단순한 App에서는 코드가 더 복잡해 진다.
- 캐싱 기능의 구현이 복잡하다.(하지만 대부분의 라이브러리가 지원한다.)
- 출시한지 얼마 안되어 안정성 문제가 생길 수 있다. (하지만 facebook과 github등에서 사용한다고 한다.)
- JSON이 선호되며 JSON을 사용하지 않으면 불편할 수 있다.

## 용어 정리

- Query : 읽기 작업을 하는 GraphQL문을 의미한다.
  - field : query에 있는 값(속성)
- Mutation : 데이터 수정 작업을 하는 GraphQL문을 의미한다.
- schema : Query와 Mutation의 return type과 arguments type및 custom type, custom interface, enum type등과 input value의 default값 등을 정의한 코드를 의미한다.
- resolver : schema에서 정의된 Query와 Mutation의 구조에 맞추어 return type과 arguments type에 맞추어 설정한 코드를 의미한다.

참고로 위 구성 요소중 resolver만 GraphQL를 구현한 Server Library에 의존되고 나머지는 GraphQL에 의존된다

`즉 Query, Mutation은 schema에서 구조가 정의되고 resolver에서 행동이 정의되며 schema에서 정의된 구조에 맞춰서, 클라이언트에서 Query, Mutation 문으로 request하고 서버에서 JSON으로 response한다.

## GraphQL의 query(읽기작업을 하는 GraphQL문)

### 개요

GraphQL에서 Query는 읽기 작업을 하는 GraphQL문을 의미합니다.

### Fields

GraphQL에서 Query의 기본적인 사용법은 다음과 같다.

#### Request GraphQL

```sql
{
  hero {
    name
  }
}
```

#### Response JSON

```sql
{
  "data":{
    "hero": {
      "name": "R2-D2"
    }
  }
}
```

앞의 예에서 hero의 이름을 요청하였지만, friends 즉, objecet를 요청할 수도 있다. 단, object자체만을 요청할 수는 없고 (object로 요청문이 끝날 수는 없다.) scalar 혹은 enum 타입으로 요청문이 끝나야한다.

#### Request GraphQL

```sql
{
  hero {
    name
    # 주석은 이렇게 쓴다
    friends {
      name # 이값의 타입은 scalar타입이므로 가능하다.
    }
  }
}
```

#### Response JSON

```sQL
{
  "data" :{
    "hero" :{
      "name": "R2-D2",
      "friends":[
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

즉 다음과 같은 형태의 GQL은 오류정보를 response한다.

#### Request GQL

```sql
{
  hero {
    name
    friends # friends는 scalar 타입이 아닙니다.
  }
}
```

schema문에서 query타입과 Character 인터페이스를 보시면 더 잘 알 수 있다. 아래는 schema문의 일부분을 가져온 것이다.

```sql
type Query {
  hero(episode: Episode): Character
}

interface Character {
  # The ID of the character
  id: ID!
  # The name of the character
  name: String!
  friends: [Character]
  # The friends of the character exposed as a connection with edges
  friendsConnection(first: Int, after: ID): FriendsConnection!
  # The movies this character appears in
  appearsIn: [Episode]!
}
```

Query 타입 필드의 hero를 보면 Character 인터페이스 형식이라는 것을 알 수 있고 Character 인터페이스의 friends를 보면 [Character] 즉, scalar 타입이 아닌 Character의 배열인 것을 알 수 있다. 그리고 Character 인터페이스의 name은 String으로 scalar타입인 것을 알수있다.

추가로 scalar타입은 int, float, String, Boolean, ID가 있다. [여기](https://facebook.github.io/graphql/#sec-Scalars)에서 좀 더 자세히 볼 수 있다 참고로 ID타입은 Cache작업에 주로 이용된다

### Arguments

schema 에서 작성이 되었다면 GraphQL에서도 인수를 전달할 수 있다.

```sql
{
  human(id:"1000"){
    name
    height
  }
}

Response JSON

{
  "data":{
    "human": {
      "name" : "Luke Skywalker",
      "height" : 1.72
    }
  }
}
```

scalar필드에도 인수를 전달하여 서버에서 데이터 변환을 구현할수도 있다. 물론 schema에 작성이 되어있어야 한다.

```sql
{
  # 전달하는 id값도 바꿔보았다.
  human(id:"1001"){
    name
    height(unit: FOOT)
  }
}

Response JSOn
{
  "data":{
    "human":{
      "name": "Darth Vader",
      "height": 6.6272968
    }
  }
}
```

여기서는 언급하지 않지만 schema 작성시 인수를 사용할 수 있도록 정의할 때 기본값, 필수값, 선택값등을 설정할 수도 있다.

### Aliases

별칭을 사용하여 결과값의 이름(key)을 바꿀 수 있다.

이 기능을 이용하여 동일한 field에 다른 인수를 사용하여 이름에 대한 충돌이 없이 response를 받을 수 있다.

```sql
{
  empireHero: hero(episode: EMPIRE){
    name
  }
  jediHero: hero(episode: JEDI){
    name
  }
}

# Response JSON

{
  "data": {
    "empireHero":{
      "name": "Luke Skywalker"
    },
    "jediHero":{
      "name":"R2-D2"
    }
  }
}
```

### Operation name & Variables

이제까지 query의 이름을 생략하여 사용하였지만 생략하지 않고 사용한다면 다음과 같은 이점이 있다

- Operation name을 정의하여 모호하지 않은 코드를 작성할 수 있다.
- 디버깅 할 때 Operation name이 들어간 로그등을 참고하면 코드의 추적이 더 쉬워진다.
- Variable 기능을 활용할 수 있다.

GraphQL은 클라이언트에서 인수를 정의하여 query문에서 사용할 수 있는 Variable기능을 제공한다.

```sql
query HeroNameAndFriends($episode: Episode){
  hero(episode: $episode){
    name
    friends{
      name
    }
  }
}

# Input variables
{
  "episode": "JEDI"
}

# Response JSON
{
  "data":{
    "hero":{
      "name": "R2-D2",
      "friends":[
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

위와 같이 Variable기능을 활용한 구문은 재사용성이 높아서 다른곳에서도 유연하게 사용이 가능하다.

참고로 위 Episode type은 enum이다.

### Default variables

다음과 같이 기본 값을 설정할 수도 있다.

```sql
query HeroNameAndFriends($episode: Episode = "JEDI"){
  hero(episode: $episode){
    name
    friends{
      name
    }
  }
}
```

Required variables

`\$name: type!`를 사용하여 필수 값을 설정할 수도 있다.

가장 처음 Variables예시는 !를 쓰지 않았기 때문에 필수값이 아니라서 NULL이 허용된다.

```sql
# Request GraphQL
query HeroNameAndFriends($episode: Episode!){
  hero(episode: $episode){
    name
    friends{
      name
    }
  }
}
```

### Available types for variables

variables에 사용 가능한 Type는 scalar, enum, input object type이 있습니다.

여기서 input object type은 schema에서 정의하는 Type으로 예시는 다음과 같다.

schema에 다음과 같이 input object type인 ReviewInput가 정의되어 있고

```sql
input ReviewInput{
  stars: Int!
  commentary: String
}
```

ReviewInput 을 사용하는 createReview이라는 mutation이 다음과 같이 schema에 정의되어 있다면

```sql
type Mutation{
  createReview(episode: Episode, review: ReviewInput!):Review
}
```

input object type을 variables기능에서 mutation과 함께 다음과 같이 사용이 가능하다.

## 참고자료

velopert, [vomvoru blog](https://vomvoru.github.io/blog/about-GraphQL/)

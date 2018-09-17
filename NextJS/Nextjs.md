# Next js

정적 및 서버 렌더링 응용 프로그램을 위한 간단한 프레임 워크.

대표 기능

- 간단한 클라이언트 사이드 라우팅
- Hot Module Replacement 를 지원하는 Webpack 기반 작업환경
- Express 나 그 어떤 Node.js 서버와 함께 사용 가능
- Babel / Webpack 환경설정 커스터마이징 가능

## purple works 과제 느낀 점들과 공부한점 정리

### How to use

1. install
1. npm install --save next react react-dom
1. and add a script to your package.json like this;

```json
{
  "script": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

and then just run npm run dev and go to http://localhost:3000. To use another port, you can run `npm run dev -- -p <your port here>.`

### head

react 헬멧을 사용할 필요없이 head<title 을 바꾸어 주면된다.

여기서 antd 나 bootstrap 등 같은 여러 프레임워크를 사용할 시 cdn 설정을 여기서 해준다. => 이 부분떄문에 굉장히 많은 시간을 뺴앗김 ㅠㅠ 초기 설정 까먹지 말고 잘하자.

```js
<Head>
  <title>Dongwon's Recomand store</title>
  <meta
    name="viewport"
    content="initial-scale=1.0, width=device-width"
    key="viewport"
  />
  <link
    rel="stylesheet"
    href="//cdnjs.cloudflare.com/ajax/libs/antd/3.2.0/antd.min.css"
  />
</Head>
```

### style jsx

굉장히 직관적으로 사용하능한 css 스타일링을 할수 있다. 부트스트랩이나 antd 등 css 프레임워크등을 사용하기 편하지만 결국엔 디테일한 디자인하기 위해서 익히도록 할 필요성이 강하다.(당연한 애기 아닌지.. 갑자기 이애기가왜..?) return 안에 넣어주며 div 등 감싸주는 태그 안에 넣어주어서 활용한다.

```js
const Layout = ({ children, title }) => (
  <div className="container">
    <style jsx>{`
      @media (max-width: 600px) {
        div {
          background: blue;
        }
      }
      .container {
        width: 960px;
        margin: 0 auto;
        text-align: center;
      }
    `}</style>
    <style global jsx>{`
      img {
        border-radius: 7px;
      }
    `}</style>
    <Header />
    <hr />
    {children}
    <hr />
    <Footer />
  </div>
```

### Link

react-router 의 기능으로 간단하게 사용 가능하다.

```js
import Link from "next/link";

const Index = () => (
  <div>
    <h1>안녕, Next.js</h1>
    <h2>
      <Link href="/about">
        <a>소개</a>
      </Link>
    </h2>
  </div>
);
```

react-router 에선 to 를 사용했지만 href 라는 점과, 이 컴포넌트 내부에 문자열이 아닌 컴포넌트 혹은 엘리먼트가 있어야 한다.

### 외부 데이터 가져오기

getInitialProps 를 활용한다.

```js
class SSRTest extends React.Component {
  static async getInitialProps({ req }) {
    return req
      ? { from: "server" } // 서버에서 실행 할 시
      : { from: "client " }; // 클라이언트에서 실행 할 시
  }

  render() {
    return <Layout>{this.props.from} 에서 실행이 되었어요.</Layout>;
  }
}
```

```js
class SSRTest extends React.Component {
  static async getInitialProps({ req }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return {
      users: response.data
    };
  }

  render() {
    const { users } = this.props;

    const userList = users.map(user => <li key={user.id}>{user.username}</li>);

    return (
      <Layout>
        <ul>{userList}</ul>
      </Layout>
    );
  }
}
```

prefetching 기능 활용 : 데이터를 먼저 불러온 다음에 라우팅을 시작함

### 설정 custom

webpack 및 babel 을 바꿀수 있다.

next.config.js 파일을 만들어 설정하면 된다.

## reperence

[Next github](https://github.com/zeit/next.js/)

[velopert nextjs](https://velopert.com/3293)

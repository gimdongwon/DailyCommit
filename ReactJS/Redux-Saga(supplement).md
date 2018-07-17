# Redux-saga (supplement)

redux-saga는 데이터를 fetching하거나 브라우저 캐시와 같이 순수하지 않은 것들을 처리하는 것과 같은 비동기 통신들을 하는 side effects들을 조금더 쉽게 이끌고 조금더 효율적으로 처리하고 더 쉽게 테스트하고 실패를 다루기 위해 초점이 맞추어진 라이브러리이다.

정신적 모델은 너의 app에서 홀로 side effects를 위해 책임감 있게 사용하는 분리된 thread와 같다.
redux-saga는 미들웨어로써 보통 redux 액션과 함께 중앙 어플리케이션으로 부터 쓰레드를 시작할수 있고, 멈출수 있으며, 취소할 수도있다. 이것은 전체 redux 어플리케이션 state을 다루는 과정이고 이것은 redux 액션을 더 잘 dispatch할 수 있다.

그것은 비동기 흐름을 쉽게 읽고 쓰고, 테스트하게 할수 있는Generators ES6특징을 사용한다. (만약 너가 익숙하지 않다면 [여기](https://redux-saga.js.org/docs/ExternalResources.html)를 읽어라) 그렇게 함으로써 이 비동기 흐름은 너의 동기적 자바스크립트 code처럼 보인다. (async, await와 같은 종류의, 그러나 generators는 우리가 필요로 하는 더 많은 놀라운 특징들을 갖는다.)

## Getting started

### Install

`npm install --save redux-saga` // --save 붙이는 이유

```md
## Note

--save 또는 -S를 하면 dependencies에 (npm5부터는 --save옵션이 기본적으로 설정이 되어있다.)

save-dev 또는 -D 하면 devDependencies에 추가된다. devDependencies는 좀더 디테일한 기능들 사용을 위해 시멘틱함을 키워주고 남들이 다운 받아서 진행할때 설치가 되지 않는다. 그리고 -g를 하면 글로벌 패키지에 추가된다. 글로벌 패키지에 추가하면 이 프로젝트뿐만 아니라 다른 프로젝트도 해당 패키지를 사용할 수 있다.

npm update 설치한 패키지를 업데이트하는 명령어

npm dedupe npm 의 중복된 패키지들을 정리할 때 사용한다.

npm docs는 패키지에 대한 설명이나 그냥 홈페이지 가서 보는게 정신건강에 이롭다.(실제로 해보니깐 인제 홈페이지를 로딩해준다.)
```

## UsageExample

우리는 버튼이 클릭되었을 때 remote 서버로 부터 몇몇의 사용자 데이터를 fetch하는 UI를 가지고 있다고 가정해 보자. 간단히 설명하기 위해 triggering code 액션을 보여주겠다.

```js
clas UserComponent extends React.Component{
  ...
  onSomeButtonClicked(){
  const {userId, dispatch} = this.props
  dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId})
  }...
}
```

구성요소 스토어에 일반 객체 액션을 보낸다. 우리는 모든 USER_FETCH_REQUESTE 액션과 유저 데이터를 가져오기 위한 API호출을 불러 일으키는 saga를 만들수 있다.

### sagas.js

```js
import {call, put, tateEvery, tateLatest} from 'redux-saga/dffects'
import Api from '...'

//worker Saga: USER_FETCH_REQUESTED actions 발동시 헤제될 것이다.
function* fetchUser(action){
  try {
    const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  } catch(e){
    yield put({type: "USER_FETCH_FAILED", mesasage: e.message});
  }
}

/*
  fetchUser가 USER_FETCH_REQUESTED액션으로 각각 보내어 진다.
  동시에 보내는 것을 허락한다
  Start fetchUser on each dispatched 'USER_FETCH_REQUESTED' action.
  Allows concurrent fetches of user.
*/
function* mySaga(){
  yield tateEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may user takeLatest.
  대신에 가장 최근에 얻은 것을 사용할수있다
  사용자들를 동시에 가져올 수 없다. 만약 UFR이 표시된다면 이미 보류중인 fetch를 가져온다면 보류중인 fetch는 취어지고 최신의 버전만 실행된다.
  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets dispatched while a fetch is already pending, that pending fetch is cancelled and only the latest one will be run.
*/

function* mySaga(){
  yield takeLastest("USER_FETCH_REQUESTED", fetchUser);
}
export default mySaga;
```

우리 Saga를 돌리기 위해서 우리는 redux-saga 미들웨어를 이용하기 위한 Redux Store에 연결해야만 한다.

### main.js

```js
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySage from './sagas'

// create the saga middleware
const sagaMiddleware = createSageMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sageMiddleware)
)
// then run the sate
sagaMiddleware.run(mySage)

// render the application
```
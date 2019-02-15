# Redux-Thunk vs Redux-Saga

[이글은 Decembersoft 페이지글은 번역한 글입니다.](https://decembersoft.com/posts/redux-thunk-vs-redux-saga/)

당신은 Redux tutorials를 이미 끝냄으로써, 당신만의 Redux code를 테스트할 준비가 되었다고 느낄 것입니다.

피와 땀, 눈물을 흘린 후에 당신은 reducer와 몇 가지 action들을 구현했습니다. 당신은 점점 발전하고 있습니다. 그것들이 작동하는 것을 보며 당신은 마침내 채득하였다고 느낄 것입니다. 인제 그것을 React와 연결해봅시다.

그러나 쿵! 하고 당신은 벽을 칠 것입니다. 당신은 component에 대한 데이터를 가지고 있지 않기 때문에 아직 당신의 컴포넌트를 볼 수 없기 때문입니다.

```
You : 움.. 알겠어, Redux. 어떻게 데이터를 불러올 수 있을까?
Redux : 신경 쓰지 마
You : 덧붙일 게 있어. 그렇지 React?
React : 내 문제는 아니야.
```

불운하게도 당신에게 있어 ¯\_(ツ)\_/¯는 답이 아닙니다.

그래서 당신은 더 많은 blog을 읽고, 커뮤니티들에게 질문해보지만 끝내 원하는 대답보다는 더욱 많은 질문만 생길 것입니다. 당신이 말할 수 있는 건 절반의 커뮤니티들은 thunks를 사용하고 나머지 절반은 sagas를 사용한다는 것입니다. 누가 옳은 걸까요?

thunks와 sagas는 어떻게 다를까요?

## Thunks versus Sagas

구현의 측면에서는, Redux-Thunk 와 Redux-Saga는 많이 다릅니다. 하지만 당신이 그들을 다루는 부분에서는... 음 그들은 상당히 흡사합니다. 그러나 같지는 않죠. 이들이 다른 몇 가지 중요한 점을 살펴보죠.

일단 배경을 살펴보면

Redux-thunk와 Redux-saga는 둘 다 Redux의 미들웨어 라이브러리입니다. Redux 미들웨어는 dispatch()메소드를 통해 store로 가고 있는 액션을 가로채는 코드입니다.

action은 literally하게 될 수 있습니다.

그러나 만약 당신이 최적의 관습을 따른다면, 액션은 타입 필드를 가지고 있는 일반적인 Javascript 객체입니다. 선택적으로 payload와 meta, error 필드를 가질 수 있습니다. 예를 들면

```js
const loginRequest = {
  type: "LOGIN_REQUEST",
  payload: {
    name: "admin",
    password: "123"
  }
};
```

(그러나 이 구조는 Flux 표준 액션입니다.)

이것은 TypeScript처럼 보이는 시그니처 타입입니다.

```js
type Action = {
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean
};
```

## Redux-Thunk

추가적으로 표준 액션들을 디스패치할 때, Redux-Thunk 미들웨어는 당신이 thunks라고 불리는 특별한 함수를 디스패치하는 것을 허락합니다. Thunks(in Redux)는 일반적으로 다음 구조를 가집니다.

```js
export const thunkName = parameters => (dispatch, getState) => {
  // 당신의 어플리케이션 로직을 여기에 적으세요
};
```

thunk는 (선택적으로) 몇 가지의 parameters를 인수로 취하고 또 다른 함수를 return하는 함수입니다. 내부 함수는 dispatch 함수와 getState함수를 사용합니다. 두 함수다 Redux-Thunk 미들웨어에서 제공받습니다.

우리는 사용자의 이름과 비밀번호를 사용하는 login API를 호출하는 thunk 예제를 보겠습니다. 일단 thunk는 시작을 나타내는 request를 가리키는 액션을 디스패치합니다. 그러고 thunk는 call을 만들고 마침내 API call이 성공 여부에 따라 success 액션이든 failure 액션이든 전달합니다.

```js
import * as api from 'api';
import {loginRequest, loginSuccess, loginFailure} from "./loginActions';

export const loginThunk =
  (name: string, password: string)=>
    (dispatch: Function)=>{
        dispatch(loginRequest());
        try{
          api.login(name, passwrod);
        }
        catch(err){
          dispatch(loginFailure(err));
          return;
        }
        dispatch(loginSuccess();)
    };
```

당신이 당신의 thunk를 디스패치 했을 때, 예를 들어 `dispatch(loginThunk('admin', 'secret'));` 같은 Redux-Thunk는 본질적으로 내부 함수를 호출합니다.

```js
(dispatch: Function) => {
  dispatch(loginRequest());
  try {
    api.login("admin", "secret");
  } catch (err) {
    dispatch(loginFailure(err));
    return;
  }
  dispatch(loginsuccess());
};
```

지금까지 우리는 Redux-thunk의 기본을 보았고, 이제부터는 Redux-saga를 살펴봅시다!

## Redux-Saga

Redux-Saga 미들웨어는 당신이 sagas라고 불리는 순수함수로 복잡한 어플리케이션 로직을 표현할 수 있게 해줍니다. 순수 함수는 테스트 관점에서 바람직합니다. 왜냐하면, 상대적으로 테스트가 쉽고 반복적이고 예측가능하기 때문입니다.

Sagas는 generator라고 불리는 특별한 함수로 구성되어져 있습니다. ES6의 새로운 특징인 generator함수는 기본적으로, yield구문을 본 때마다 안팎을 점프하며 실행됩니다. yield구문을 generatort가 멈추는 것과 yielded 된 value를 return 하는 것을 유발합니다. 후에 호출자는 yield를 따르는 구문에 generator를 재개할 수 있습니다.

generator 함수는 이렇게 정의 됩니다. function 키워드 뒤에 별표가 붙습니다.

```js
function* mySaga() {
  //...
}
```

우리는 login 함수를 saga로 다시 쓸 수 있습니다.

```js
import * as api from "api";
import { LoginRequestAction, loginSuccess, loginFailure } from "./loginActions";

function* loginSaga() {
  const action: LoginRequestAction = yield take("LOGIN_REQUEST");
  const { name, password } = aciton.payload;
  try {
    yield call(api.login, name, password);
  } catch (err) {
    yield put(loginFailure(err));
    return;
  }
  yield put(loginSuccess());
}
```

loginSaga는 Redux-Saga에 의해 등록되고 그것은 즉각적으로 실행될 것입니다. 그러나 yield는 'LOGIN_REQUEST'가 store에 디스패처 되기 전까지 첫벉재 행에서 처리된 yield는 멈춰질 것입니다. 그 이후 실행이 계속됩니다.

## 가장 큰 차이점

당신은 아마도 두 방식의 가장 큰 차이점을 문장 구조라고 생각을 할 것입니다. 그것이 가장 사실이지만 더 큰 차이점이 존재하는데, Thunks는 절대로 action에 응답을 줄 수 없습니다. 반면 Redux-Saga는 store를 구독하고 특정 작업이 디스패치 될 때 saga가 실행되도록 유발할 수 있습니다.

## ps

관리하기 쉽고, 테스트하기 쉽고, 적당한 패턴으로 서비스로직을 쉽게 만들 수 있습니다.

Action creator의 반환은 Action object!

[redux-saga-fe-conf-2018](https://drive.google.com/file/d/1ttAVFSIo_2VANI-KIJIn0Sv2NUOKJI4m/view)

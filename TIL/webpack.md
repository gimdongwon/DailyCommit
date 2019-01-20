# Webpack

![webpack image](https://kdydesign.github.io/2017/07/27/webpack/cover.png)

Webpack은 JavaScript 애플리케이션을 위한 Package Bundler이고 목적은 종속성을 가진 애플리케이션 모듈을 정적인 소스들로 생산하는 것이다. 애플리케이션을 처리할 때 필요한 모든 모듈을 종속성 그래프로 반복적으로 작성한 다음 모든 모듈ㅇ르 브라우저에서 로드 할 수 있는 하나의 Bundle로 패키지화한다. 이 외의 특징은 다음과 같다.

- Loader을 통해 JavaScript, Image file, Font, CSS, SCSS 등과 같은 자산을 하나의 모듈로 취급
- Entry별로 Bundle생성 가능
- Bundle에 대한 압축 및 난독화, 소스 맵에 대한 옵션을 제공
- Plug-in 사용을 통한 사용자 정의 기능 수행
- 비동기 I/O와 다중 캐시 레벨을 사용하기 때문에 컴파일 속도가 매우 바름
- CommonJS와 AMD 스펙 지원

## Webpack의 구성요소

- Entry : Webpack은 모든 애플리케이션에 대한 종속성 그래프를 작성하고 이 그래프의 시작점을 Entry Point라고 한다. 이 Entry Point를 통해 모듈이 어디서부터 시작하는 지를 명세하는 애플리케이션을 시작하는 첫 번째 파일로 나타낼 수 있다.
- Output : Output은 모든 애플리케이션의 자산(resuources or assets)을 하나의 Bundle로 묶었으면 해당 Bundle을 처리하는 방법을 명세한다.
- Loader : Loader는 사전에 처리할 작업을 나타내며 css, html, jpg, scss 등의 자산을 하나의 모듈로 취급하며 이러한 파일들을 종속성 그래프에 추가할 때 모듈로 변환한다.
- Plug-in : plug-in은 일반적인 Compile 또는 모듈 처리에 필요한 작업 및 사용자 정의 기능을 수행하는데 사용한다.

=> 장점이 굉장히 많다 단점을 꼽자면 초기 구축시 시간이 오래 걸리고 러닝 커브가 높다.

## Gulp

Task Runner이며, Work Flow 를 자동화 및 향상할 수 있는 도구이다. 개발 Work Flow에서 번거로운 작업들이나 시간적인 소모가 많이 들어가는 작업을 자동화하여 쉽게 처리할 수 있다.

- 반복 가능한 작업을 자동화
- JavaScript 테스트 실행 및 파일 병합
- js, css, html등의 자산 파일을 압축
- Node stream 기반으로 빠른 빌드 속도를 제공
- 작업을 정의하고 실행하는 것이 수월

Gulp는 Webpack 에 비하여 러닝커브가 낮아서 사용하기 쉽다. 코드에 대한 가독성이 좋으나 Webpack같이 모든 모듈에 대한 종속성 관리가 이루어지지 않기에 규모가 큰 프로젝트에서 패키지화 하기가 쉽지 않다.

# webpack개념잡기

https://kdydesign.github.io/2017/07/27/webpack/

web front-end build tool에는 여러 가지가 있다. 이러한 build tool은 단순히 소스를 묶고 컴파이랗고 압축하는 단순한 형태에서 벗어나 하나의 기술로 자리잡았다. 이 build tool 들을 활용함으로써 우리가 진행하는 프로젝트에 엄청난 시너지를 안겨줄수 있다. 그중 떠오르는 툴 중 webpack에 대한 소개와 프로젝트를 진행하면서 왜 Build Tool이 필요한지 알아보자

## Build Tools

Build는 서버사이드에서만 사용하는 것이 아니라 Web Front-End 에서도 필수적이다. JavaScript와 CSS를 축소하고 단위테스트도 수행하며 프로젝트에 필요한 자산들을 효율적으로 관리할 수 있을 뿐만 아니라 패키지화ㅏㄲ지도 진행할 수 있다. 이러한 사항들로 인해 결국 해당 프로젝트의 성능과 개발의 편의 그리고 개발 속도가 향상될 수 있다. 물론 build를 실행하지 않고 직접적으로 시스템 파일을 Linking하여 사용할 수도 있겠지만 우리는 언제나 Performance 대립하게 되었다. 그럼 Front-End의 build tool에는 어떤 것이 있을 까?

- Jake
- Brunch
- Grunt
- Gulp
- Webpack
- brocoli
- Cha

이 많은 build tool중 가장 많이 사용하는 것은 Gulp, Grunt, Webpack이다. 이 세가지를 모두 비교할수 없을 정도로 훌륭한 시스템인데 단지 NPMCOMPARE에서 Gulp, Grunt를 비교해보았을 때 Gulp가 좀더 활성화가 되어있다.

## Webpack vs Gulp

사실 Webpack, Gulp은 다르게 볼 수 있다. Webpack은 Package Bundler이며, Gulp는 Task Runber이다. 크게 다르다고는 할 수 없지만 이 이유가 Webpack을 포스티하는 이유이다. 그럼 tastk Runnber와 Package Bundler는 무슨 차이일까

- Package Bundler : 종속성을 가진 애플리케이션 모듈을 정적인 소스로 재생산
- Task Runner : 반복 가능한 특정 작업을 자동화

쉽게 말하면 Task Runner는 그저 미리 정의해 놓은 어떤 작업을 실행하는 것이고 Package Bundler는 말 그대로 어떤 소스들을 하나의 패키지화 하는 것이다.

구글 트렌드를 통해 Gulp와 Webpack의 검색 추이를 보게 되면 처음에는 Gulp가 우세한 면을 보이지만 최근들어 Webpack이 Gulp를 넘어서 우세한 것으로 볼 수 있다.

이는 프로젝트 규모와 그리고 Tast Runnber로는 진행할 수 없는 Webpack만의 중요한 종속성 관리에 따라 변화된 것으로 보인다. 이러한 종속성 관리는 프로젝트 규모가 클수록 더 빛을 발하며 그리고 날이 갈수록 SPA의 확산에 따라 중요도가 커지고 있다. 지금도 Webpack과 Gulp를 같이 사용하는 개발자도 있다. jsHint나 jsLint등의 코드 검사 도구 또는 mocha나 jasmine과 같은 테스트 도구를 Gulp를 통해 실행하고 이후 프로젝트의 패키징은 Webpack으로 사용하는 것처럼 보인다. `하지만 Webpack에서도 Gulp와 마찬가지로 전처리 작업을 지원하면서 Webpack이 더욱 상승세를 보인다.`

Webpack 과 Gulp의 NPM COMPARE를 보게 되면 Gulp가 종속된 모듈수가 적고 발생 이슈가 낮지만, 전체적인 면에서 보면 현재로서는 Webpack이 좀더 활성화가 된 것을 볼수 있다.

## Webpack

Webpack은 JS어플리케이션을 위한 Package Bundler이고 목적은 종속성을 가진 애플리케이션을 모듈을 정적인 소스들로 생산하는 것이다. 애플리케이션을 처리할 때 필요한 모든 모듈을 종속성 그래프로 반복적으로 작성한 다음 모든 모듈을 브라우저에서 로드 할 수 있는 하나의 Bundle로 패키지화한다. 이 외의 특징은 다음과 같다.

- Loader를 통해 JS, Image file, Font, CSS, SCSS 등과 같은 자산을 하나의 모듈로 취급
- Entry 별로 Bundle 생성 가능
- Bundle에 대한 압축 및 난독화, 소스 맵에 대한 옵션을 제공
- Plug-in 사용을 통한 사용자 정의 기능 수행
- 비동기 I/O 와 다중 캐시 레벨을 사용하기 때문에 컴파일 속도가 매우 빠름
- CommonJS와 AMD 스펙 지원

Webpack은 크게 Entry, Output, Loader, Plug-In 이 4가지로 나눌 수 있다.

위에 참조

음~

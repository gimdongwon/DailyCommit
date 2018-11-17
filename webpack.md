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

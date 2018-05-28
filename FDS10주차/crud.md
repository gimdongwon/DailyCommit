# 게시판 만들기

2가지를 만들거다 금요일 까지

게시판 예제 보여주심

JSON서버와 통신중

수 게시판

목 할일관리 리스트

금 개발하면서 필요한 요소들

bare 작업 이력만 남아있는 저장소를 받는것 작업을 할수는 없고 이력만 저장할 수 잇따

pacel bundler 사용하고 sass도 사용되고 잇다.

## JSON 서버와 연결하여 화면을 그리기

  1. npm start끄고 npm install --save-dev fds-json-server
    pakege.json에 설치됨. 개발에 필요한 서버는 개발할때만 필요하다.
    save-dev 로 설치한 놈들은 dependencese에 나와있는 애들에 포함이 안되 설치가 안된다.(따로 설치해줘야된다)
  2. db.json, auth.config.js 이 두개가 필요하다. (npmjs 사이트가서 db, auth 실시)
  3. 환경 변수 설정하기 .env파일 만들고 JWT넣기
  4. npx fds-json-server --watch db.json 잘 동작하는 지 확인
  5. pakege.json 에 `"server": "fds-json-server --watch db.json"` 추가하고 터미널에 npm run server
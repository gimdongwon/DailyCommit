# git, Software Engineering

## 최우영 강사님

> nodejs 는 재단이 불안하다 iosjs 로 갈라진적도 있고 현재 또 갈라짐.

> 앱은 웹처럼, 웹은 앱처럼 하려고 한다.

> jameline 의 경우가 있다. 링크드인 데이터를 쓰고 싶었음.

## PWA(Programs Web App)

> google.io 여기서 웹의 최신 동향을 알 수 있다. 계속 최신 동향을 따라가야된다. Q) 최신 사이트 추천 좀 받자.

형상관리 안에는 스택관리, 소스관리, 리눅스 만든 사람이 만듬

remote repo 르 만들 수 있는 경우의 수 github, gitlab, bigberket(빅버킷)

```git
git remote add cat https://github.com/gimdongwon/empty-repo.git

git remote get-url cat
```

untracked file 깃이 여지것 보지 못했던 파일임

" 안치고 엔터치면 그다음은 내용이된다.

rebase, reset

commit 메시지는 웬만하면 영어로 하세요!! 라고 하셧지만 한글이 가독성이 높으므로 일단 readme 에 가독성때문에 한글 사용했다고 명시해주자

react 는 레고

vue 는 건담 설명서 읽고 끼워맞추면됨

angular 는 찰흙 typescript 를 사용함

fast-forward 한시점 뒤쳐짐(마스터 입장) 강제로 떙겨서 붙여줌

절대로 마스터 위에서 일하면 안된다 develop 에서 일하기!

## Trend of Software Engineering

> 코딩만 할줄 아는 사람을 코더 알고리즘 짤줄아는 사람 전반적으로 다룰 수 있는 사람 개발자

> 기능과 이 기능을 구현하기 위해서 repo 는 어디서 출발해서 나왔을 까 라고 생각해보기

> 리뷰 로그인 회원가입 기능 명쇄 (해야한다. 하면 안된다.)

## Git flow

기본 브랜치는 5 가지로 나뉜다. feature > develop > release > hotfix > master 브랜치가 존재하면, 머지 순서는 앞에서 뒤로 진행된다. release 브랜치와 hotfix 브랜치의 경우, develop 브랜치의 오른쪽에 존재하기에 모두 develop 브랜치도 머지를 하도록 구성되어있다.

![gitFlow_img](http://nvie.com/img/git-model@2x.png)

가장 중심이 되는 브랜치는 master 와 develop 브랜치이며, 이 두개의 브랜치는 무조건 있어야된다. 이름은 바뀔 수 있지만 웬만해서는 변경하지 않고 진행하도록 한다. 머지된 feature, hotfix, release 는 삭제하도록한다.

- Feature 브랜치
  - 브랜치가 나오는 곳: develop
  - 브랜치가 들어가는 곳 : develop
  - 이름 지정: master, develop, release-_, hotfix-_ 를 제외한 어떤 것이든 가능

새로운 기능을 추가하는 브랜치이다.

feature 브랜치는 origin 에는 반영하지 않고, 개발자의 repo 에만 존재한다.

- Release 브랜치
  - 브랜치가 나오는 곳 : develop
  - 브랜치가 들어가는 곳 : develop, master
  - 이름 지정 : release-\*

새로운 Production 릴리즈를 위한 브랜치다. release 브랜치에서는 버그픽스에 대한 부분만 커밋하게 되고, 릴리즈가 준비되었다고 생각하면 master 로 머지를 진행한다. 이때도 --no-ff 옵션을 이용하여 merge 기록을 남겨둔다.

- Hotfix 브랜치
  - 브랜치가 나오는 곳 : master
  - 브랜치가 들어가는 곳 : develop, master
  - 이름 지정 : hotfix-\*

Production 에서 발생한 버그들은 전부 여기로 .. 수정끄탄면, develop, master 브랜치에 반영하고, master 에 대가는 tag 를 추가해 준다. 만약 release 브랜치가 존재한다면, release 브랜치에 hotfix 브랜치를 머지하여 릴리즈될때 반영이 될 수 있다.

release branch 는 베포를 준비하는 branch 이다 develop branch 에서 작업하던 코드를 release 하기에 앞서 버전 넘버 부여, 버그 수정, 검증 등 제품 release 전에 해야할 활동들을 하는 branch 이다.

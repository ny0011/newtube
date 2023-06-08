## node.js

- javascript가 웹 브라우저 말고도 실행할 수 있게 해주는 v8 기반 runtime
- JavaScript runtime built on Chrome's V8 JavaScript engine
  - v8 : Google open source javascript and webassembly engine, C++로 작성됨

## npm

- node package manager
- node.js에서 사용할 수 있는 패키지를 다운로드 할 수 있는 곳

## babel

- javascript compiler, toolchain
- ECMAScript 2015+ 최신 코드를 예전 코드로 바꿔줌
- 웹 브라우저 호환성을 높여줌

## express

- node.js의 간단한 web app framework

## Request/Response

- 서버와 주고 받는 것.
- request : 서버에게 요청
- response : 서버가 응답을 보냄
- app.get에서 함수를 추가하면 그 함수의 매개변수로 req, res가 되는데 서버는 res를 클라이언트에게 전달함
  - req : 클라이언트가 보낸 정보(클라이언트가 서버에 요청한 정보. url, method, route 등..)
  - res : 클라이언트에게 전달해줄 정보

## middleware

- 서버와 통신을 주고받을 때 중간처리를 하는 곳
- request header, response 로그를 찍거나 response를 다른 곳으로 전달하는 용도

## router

- 컨트롤러와 URL의 관리를 쉽게 함
- '데이터'를 먼저 생각해보자. 이 데이터를 분류하는 게 결국 라우터를 구분하는게 됨
- 데이터를 어떤 기능으로 다루게 될까?

  - home, join(가입), login(로그인), search(검색), 프로필 수정, 프로필 삭제, 비디오 보기, 비디오 수정, 비디오 삭제
  - home, join(가입), login(로그인), search(검색) 같은 단독 행위를 제외하고는 프로필, 비디오로 분류할 수 있음
  - 이 프로젝트는 동영상과 사용자가 가장 큰 데이터 분류가 됨
    - 이 두 개가 프로젝트의 도메인이 됨
  - /도메인/행동 이렇게 구조를 만들면 분류나 관리가 쉬워짐

- router를 사용하면 어떤 기능을 하는 곳으로 이동하게 됨

### Router 사용법

- 선언 및 url 설정

  - `/user`으로 들어오는 요청은 모두 userRouter로 이동

    ```
      const userRouter = express.Router();

      app.use("/user", userRouter);
    ```

- router 내부 route 설정

  - userRouter에서 `/edit`을 GET으로 받으면 handleEditUser을 실행
  - 사용자가 `/user/edit` GET 요청을 했을 때 이 handleEditUser가 실행됨

    ```
      cconst handleEditUser = (req, res) => res.send("Edit User");
      userRouter.get("/edit", handleEditUser);

    ```

### Router 내부 분리

- 각 Router 내부에서 내부 route의 행동까지(handle ...) 정의해두면 코드가 복잡해보임
- handle 함수들을 controller라고 하는데 router에서 controller를 분리하자
- routers의 역할은 URL을 깔끔하게 보이게 분류하는 역할
- **controller**의 역할은 URL 요청이 왔을 때 어떤 걸 실행하도록 하는 역할

### Router의 내부 URL 계획 세우기

- README.md 의 내용대로 어떤 기능과 이 기능에 해당하는 URL은 어떻게 이름 지을지 계획 세우기
- 계획한대로 Router의 내부 route 구성

### Router의 URL에서 정규식 사용

- `/:id` 의 경우 id에 해당하는 곳에 숫자가 아니라 문자가 와도 이걸 id로 인식하게 됨
- 숫자만 와야할 경우 정규식을 사용해서 필터링 할 수 있다
  ```
    videoRouter.get("/:id(\\d+)", see);
  ```
- 앞에 있는 id는 파라미터의 이름이 됨

## Template - pug

- 날것의 html을 사용하기엔 귀찮음
- pug 같은 간단한 template 을 사용하면 편함
- express에서 템플릿 렌더링을 지원함 : https://expressjs.com/ko/guide/using-template-engines.html
- 디렉토리 및 엔진 지정
  ```
    app.set("view engine", "pug");
    app.set("views", process.cwd() + "/src/views");
  ```
- 다른 곳의 pug 파일을 가져오기
  ```
    include partials/footer.pug
  ```
- 내용은 다르고 UI가 같을 때 중복을 제거하기 위해 같은 형식은 base.pug 에 저장하고 다른 곳에서 그 형식을 불러올 때 extends로 가져옴

  - block에 해당하는 부분은 extends로 상속받는 쪽의 내용으로 변경됨

  ```
    extends base.pug

    block head
    title Edit | Wetube
  ```

- controller에서 pug로 변수 전달하기

  - render의 매개변수로 pug 파일 이름 다음에 object 형태로 변수를 설정하면 됨

  ```
    export const trending = (req, res) => res.render("home", { pageTitle: "Home" });
  ```

  - pug에서는 `#{pageTitle}` 이렇게 변수에 접근가능함

- pug에서 조건문 사용하기
  - js처럼 if, else if, else를 사용함.
  - tag에서 사용할 때는 `{}`를 붙이지만 조건문 내에서는 안써도 됨
    ```
      if fakeUser.loggedIn
          li
              a(href="/logout") Log out
      else
          li
              a(href="/login") Login
    ```
- pug에서 반복문 사용하기
  - for 대신 each in 을 사용함
  - 반복문으로 돌릴 변수 안에 아무것도 없으면 else로 보여줄 내용 적을 수 있음
    ```
        each video in videos
            li=video
        else
            li Sorry nothing found.
    ```
- mixins

  - 재사용 가능한 block을 만들 때 사용함
  - ul, li 같은 태그들 반복하기 귀찮으니..
  - mixin 생성
    ```
      mixin video(info)
      div
          h4=info.title
          ul
              li #{info.rating}/5.
              li #{info.comments} comments.
              li Posted #{info.createdAt}.
              li #{info.views} views.
    ```
  - mixin 사용

    ```
    include mixins/video

      +video(potato)
    ```

## DB

- DB없이 controller에 임의로 videos 변수를 만들어서 이것저것 해보자
- video watch 페이지와 edit 페이지를 바꿔보자
  - Controller
    - URL의 params를 보면 id 값을 알 수 있음
    - id 값으로 원하는 video를 찾을 수 있음
    - video 값을 pug 페이지로 보내줌
      ```
        export const getEdit = (req, res) => {
        const { id } = req.params;
        const video = videos[id - 1];
        return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
      };
      ```
  - Views
    - edit 화면에서 제목을 바꿔보자
    - form 태그에서 save를 누를 때 POST로 요청을 보내기
      ```
        form(method="POST")
          input(name="title", placeholder="Video Title", value=video.title, required)
          input(value="Save",type="submit")
      ```
  - Router
    - videoRouter에서 edit의 GET 요청과 POST 요청을 모두 받기
      ```
        videoRouter.get("/:id(\\d+)/edit", getEdit);
        videoRouter.post("/:id(\\d+)/edit", postEdit);
      ```
- edit에서 POST 요청 보내기
  - Router
    - 같은 URL에 get, post 요청만 다르니 이걸 한 줄로 줄일 수 있음
      ```
        videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
      ```
  - Controller
    - POST 요청을 보낸 후 다른 곳으로 URL을 변경하지 않으면 계속 이 페이지를 루프 돌게 됨
    - redirect()나 end()로 POST 요청을 끝내줘야 함
      ```
        const { id } = req.params;
        return res.redirect(`/videos/${id}`);
      ```
    - POST 요청을 보냈을 때 form의 내용을 얻으려면 req.body로 확인할 수 있지만 설정을 추가로 하지 않으면 볼 수 없음
      - express 내장 메소드를 사용해보자
        ```
          app.use(express.urlencoded({ extended: true }));
        ```

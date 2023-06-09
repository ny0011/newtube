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
- video Upload GET, POST 요청 만들기
  - Controller 생성
  - upload.pug UI 생성
    - 만약 다른 URL로 보낸다면 form의 action 속성을 사용해 URL을 변경해줘야 함
      ```
        form(method="POST", action="/videos/otherurl")
      ```
  - Router 등록

### mongoDB

- document-based DB
  - 개발자는 object 단위로 생각함. mongoDB도 그렇다~
  - JSON과 비슷하게 저장함!
- 설치
  - windows : https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows-unattended/
- 설정 : https://dangphongvanthanh.wordpress.com/2017/06/12/add-mongos-bin-folder-to-the-path-environment-variable/
- mongosh
  - 설치 : https://www.mongodb.com/try/download/shell
  - 설정 : 압축 파일 다운로드 -> 압축 풀기 -> bin/mongosh.exe 경로 복사해서 환경 변수 path에 추가
  - 실행 : mongosh

### mongoose

- js와 mongoDB 간 상호작용을 도와주는 라이브러리
- db 생성 및 연결

  ```
    import mongoose from "mongoose";

    mongoose.connect("mongodb://127.0.0.1:27017/wetube");
  ```

- 서버가 실행될 때 db도 실행되려면 그냥 위의 파일을 import 하면 됨
  - 서버 실행 후 DB가 실행됨. DB가 실행될 때 좀 느린 편
  ```
    import "./db";
  ```
- db와 연결하기위해 `connection`을 사용

  - connection.on이나 once로 연결 관련 이벤트 리스너 등록
  - 나중에 `connection`을 사용해 CRUD 작업 수행

  ```
    // 연결된 connection 객체 가져오기
    const db = mongoose.connection;

    const handleOpen = () => console.log("✅ Connected to DB");
    db.on("error", (error) => console.log(error)); // 이 이벤트가 여러번 발생할 수 있음
    db.once("open", handleOpen);

  ```

### CRUD

- mongoose로 CRUD를 해보자
- 그 전에 데이터의 모습을 mongoose에게 알려주기 위해서 model을 만들어보자

  - 데이터의 타입을 알려주기
  - 데이터 타입을 정의하는 걸 스키마라고 함
  - 스키마 작성

    - `{ type: String }`와 `String`은 같은 의미. 옵션을 더 추가하지 않으면 타입만 적어도 됨

    ```
      import mongoose from "mongoose";

      const videoSchema = new mongoose.Schema({
        title: String,
        description: String,
        createdAt: Date,
        hashtags: [{ type: String }],
      });

    ```

  - 위의 스키마에 해당되는 video 값의 예시
    ```
      const video = {
        title: "HEI"
        description: "aaa"
        createdAt: 1231234,
        hashtag:[
          "#hi",
          "#mongo"
        ]
      }
    ```

- 모델 생성

  - 모델의 이름을 생성하고 모델에 연결된 스키마 이름을 적기

    - 보통 모델의 이름 첫글자를 대문자로 적는듯

    ```
      const Video = mongoose.model("Video", videoSchema);
      export default Video;
    ```

- 모델을 사용하기 위해 가져오기
  - server 파일에 db를 import 한 것처럼 video.js를 가져오면 됨
  - 위에서 default Video라고 했으니 아래처럼만 적어도 Video 모델을 가져온게 됨
    ```
      import "./models/Video";
    ```
- server에 import 하는 파일들이 많아져서 초기화 하는 파일을 따로 만들어주자

  - init.js : server와 db 실행
    - package.json 실행 명령어를 init.js로 바꾸기
  - server.js : 미들웨어와 라우팅 관련 설정
  - db.js : db 설정

- 모델을 사용해보자

  - DB에 접근하는 방법 : 쿼리(query) 사용
    - https://mongoosejs.com/docs/queries.html
  - mongoose의 쿼리는 두가지 방법으로 실행됨

    - 1. `callback 함수`로 전달하면 mongoose는 쿼리를 비동기적으로 실행하고 결과값을 `callback`에게 전달함
      - 근데 `Model.find()`는 callback을 받지 않는다는 에러 발생
      - https://stackoverflow.com/questions/75586474/mongoose-stopped-accepting-callbacks-for-some-of-its-functions
    - 2. 쿼리는 `.then()` 함수도 갖고 있는데 이건 promise로 실행해야 함
    - 어쨌든 쿼리는 응답을 기다리는 형태임

    - 1. 의 방식으로 쿼리 보내기

      - `{}`는 filter라고 부름. 이렇게 비어있으면 모든 데이터를 찾는 것.
      - 두번째는 callback 함수인데 처음 변수는 error, 두번째 변수는 결과값

      ```
        import Video from "../models/Video";

        Video.find({}, (error, videos) => {});
      ```

    - 2. 의 방식으로 쿼리 보내기
      - `async/await` 를 사용해서 값을 받음
      - await에서 응답을 받을 때까지 다음 코드를 실행하지 않음
      - 만약 await 코드에서 에러가 발생하면 다음 코드를 실행하지 않고 catch문을 실행함
      ```
        try {
          const videos = await Video.find({});
          return res.render("home", { pageTitle: "Home", videos: [] });
        } catch (error) {
          return res.send(`server-error: ${error}`);
        }
      ```

- video를 DB 에 추가해보자!

  - UI
    - 사용자의 입력을 받는 Form 작성
    - input에 name 속성 필수로 적어줘야 req.body에서 불러올 수 있다
  - Controller

    - video 모델에 맞는 데이터 형식을 만들어 줘야 함
    - mongoDB에 저장될 수 있는 데이터를 document 라고 함
      - model은 document의 subclass라서 model 객체를 만들면 document 객체를 만든 것과 같음
    - document를 만들고 DB에 저장해보자

      - document 생성 : Video 객체를 만들어준다
        ```
          const video = new Video({
            title: title,
            description: description,
            hashtags: hashtags.split(",").map((word) => `#${word}`),
            createdAt: Date.now(),
            meta: {
              views: 0,
              rating: 0,
            },
          });
        ```
        - video를 출력하면 \_id라는게 추가됨
          - mongoose가 이 \_id를 랜덤하게 만들어줌
            ```
            {
              title: 'ff',
              description: 'ee',
              createdAt: 2023-06-09T08:25:32.714Z,
              hashtags: [ '#gg', '#www', '#gge' ],
              meta: { views: 0, rating: 0 },
              _id: new ObjectId("6482e1fc21503576bbf5492e")
            }
            ```
        - 만약 video에 원래 지정한 데이터 타입이 아니라 다른 타입으로 입력하면?
          - `1` -> `"1"` 이렇게 타입 변환이 되는 건 해주지만 `lwkefjl` 같은 문자를 숫자로 변환할 수 없으면?
          - mongoose는 그 데이터를 저장하지 않음
          - 잘못된 정보를 보냈기 때문
      - document를 DB에 저장
        ```
          await video.save();
        ```
      - document 생성과 DB 저장을 동시에
        ```
          await Video.create({
              title,
              description,
              hashtags: hashtags.split(",").map((word) => `#${word}`),
              createdAt: Date.now(),
              meta: {
                views: 0,
                rating: 0,
              },
            });
        ```
      - mongosh에서 확인해보기

        - mongoDB에는 document의 묶음을 collections로 인식함
        - document의 이름이 Video면 mongoDB의 collection은 소문자 + 마지막 s 붙여서 videos로 이름이 붙여짐

        ```
          test> show dbs
            admin    40.00 KiB
            config  108.00 KiB
            local    72.00 KiB
            wetube   72.00 KiB

          test> use wetube
          switched to db wetube
          wetube> show collections
          videos
          wetube> db.videos.find()
          [
            {
              _id: ObjectId("6482e4539682b69d30d394af"),
              title: '111',
              description: 'lwiejfli',
              createdAt: ISODate("2023-06-09T08:35:31.899Z"),
              hashtags: [ '#aa', '#bb', '#cccc' ],
              meta: { views: 0, rating: 0 },
              __v: 0
            },
            {
              _id: ObjectId("6482e4689682b69d30d394b2"),
              title: '222',
              description: 'wfjliwejf',
              createdAt: ISODate("2023-06-09T08:35:52.479Z"),
              hashtags: [ '#aa', '#bb', '#c' ],
              meta: { views: 0, rating: 0 },
              __v: 0
            }
          ]
        ```

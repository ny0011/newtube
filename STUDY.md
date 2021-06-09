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
- 작은 "앱"
- router를 사용하면 어떤 기능을 하는 곳으로 이동하게 됨



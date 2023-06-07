# Wetube Reloaded

- 데이터 범위 정하기

  - user : 프로필, 로그인
  - video : 영상

- 라우터 구성하기

```
- Global router
/         Homepage
/join     Join
/login    Login
/search   Search

- User router
/users/:id        See user
/users/logout     Log out
/users/edit       Edit my profile
/users/delete     Delete my profile

- Video router
/videos/:id                 Watch Video
/videos/:id/edit            Edit Video
/videos/:id/delete          Edit Video

/videos/upload              Upload Video
```

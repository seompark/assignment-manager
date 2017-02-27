# 온라인 과제 제출 서비스

## 설치 방법

Required :
* Node.js LTS
* Git

```
git clone https://github.com/110EIm/Online-Assignment-Manager
cd Online-Assignment-Manager
npm install
```

## 사용 방법

1. config.js 파일 수정

```
module.exports = {
	secret: 'SECRET', // 쿠키 변조방지. 반드시 수정하셔야 합니다.
	name:`온라인 과제 제출 서비스`,
	devPort: 3000, // 개발용 포트
	port: 80, // production 포트
	dataFolder: 'database/' // 데이터를 저장할 폴더
};
```

2. 실행

```
npm start
```

유저 데이터는 database/user 폴더에, 업로드한 파일 데이터는 database/file 폴더에 저장됩니다.

## 업데이트

실행 시 업데이트를 자동으로 수행합니다.
module.exports = {
	secret: 'SECRET', // 쿠키 변조방지
	name:`온라인 과제 제출 서비스`,
	maxNumber: 40, // 학생 번호 최대 크기 (X학년 X반 maxNumber번까지만 회원가입 가능)
	devPort: 3000, // 개발용 포트
	port: 80, // production 포트
	dataFolder: 'database/' // 데이터를 저장할 폴더
};

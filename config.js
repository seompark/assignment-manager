module.exports = {
	secret: 'SECRET', // 쿠키 변조방지
    name: "춘천중학교 과제 제출 서비스",
	idLengthLimit: { // 학번 길이 제한
		'1': 4,	// 1학년
		'2': 4, // 2학년
		'3': 4	// 3학년
	},
    maxNumber: 40, // 학생 번호 최대 크기 (X학년 X반 maxNumber번까지만 회원가입 가능)
	port: 3000 //웹서버 포트
};

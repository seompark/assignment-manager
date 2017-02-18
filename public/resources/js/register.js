$(document).ready(function() {
	$('.ui.form').form({
		fields: {
			id: {
				identifier: 'id',
				rules: [
					{
						type: 'regExp',
						value: /^\d{4,5}$/g,
						prompt: '올바른 학번을 입력해주세요.'
					},
				]
			},
			name: {
				identifier: 'name',
				rules: [
					{
						type: 'empty',
						prompt: '이름을 입력해주세요.'
					}
				]
			}, 
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'empty',
						prompt: '비밀번호를 입력해주세요'
					},
					{
						type: 'regExp',
						value: /^[^ \t\r\n\v\f]{4,20}$/g,
						prompt: '비밀번호는 공백 포함 X, 4글자 이상 20글자 미만'
					}
				]
			},
			repassword: {
				identifier: 'repassword',
				rules: [
					{
						type: 'match[password]',
						prompt: '비밀번호가 일치하지 않습니다.'
					}
				]
			}
		}
	});
});

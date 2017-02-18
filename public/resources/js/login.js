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
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'empty',
						prompt: '비밀번호를 입력해주세요'
					}
				]
			}
		}
	});
});

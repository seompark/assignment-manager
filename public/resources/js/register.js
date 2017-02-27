$(document).ready(function() {	
	$('.ui.form').api({
		action: 'register',
		method: 'POST',
		beforeSend: function(setting) {
			removeErrorMessages();
			setting.data = $('.ui.form').form('get values');
			var errors = validate(setting.data);
			if(errors.length !== 0) {
				errors.forEach((v) => {
					writeError(v);
				});
				return false;
			}
			return setting;
		},
		onResponse: function(res) {
			removeErrorMessages();
			var form = document.querySelector('form.ui.large.form');
			if(res.success) {
				form.className = form.className.replace(' error', '');
				window.location = '/login';
			}
			else {
				writeError(res.error);
			}
			return res;
		}
	});

	function validate(data) {
		var error = [];
		validateId(data.id, error);
		validateName(data.name, error);
		validatePassword(data.password, data.repassword, error);
		return error;
	}

	function validateId(id, error) {
		if(!id)
			error.push({input: 'id', message: '학번을 입력해주세요.'});
		else if(!id.match(/^\d{4,5}$/g))
			error.push({input: 'id', message: '유효하지 않은 학번입니다.'});
	}

	function validateName(name, error) {
		if(!name)
			error.push({input: 'name', message: '이름을 입력해주세요.'});
	}

	function validatePassword(password, repassword, error) {
		if(!password)
			error.push({input: 'password', message: '비밀번호를 입력해주세요.'});
		else if(!password.match(/^[^ \t\r\n\v\f]{4,20}$/g))
			error.push({input: 'password', message: '비밀번호는 공백 포함 X, 4글자 이상 20글지 이하.'});
		if(password !== repassword)
			error.push({input: 'repassword', message: '비밀번호가 일치하지 않습니다.'});
	}

	function writeError(error) {
		var input = document.querySelector('.field#input-' + error.input),
			message = error.message,
			elMessage = document.querySelector('.ui.error.message'),
			form = document.querySelector('form.ui.large.form'),
			li = document.createElement('li'),
			ul = document.querySelector('ul.list') || document.createElement('ul');
		ul.className = 'list';
		li.textContent = message;
		ul.appendChild(li);
		elMessage.appendChild(ul);
		setElementError([form, input]);
	}

	function setElementError(arr) {
		arr.forEach(function(v) {
			addErrorClass(v);
		});
	}

	function addErrorClass(el) {
		if(el && !el.className.match('error'))
			el.className += ' error';
	}

	function removeErrorMessages() {
		var ul = document.querySelector('ul.list'),
			inputs = document.getElementsByClassName('field');
		if(ul)
			ul.parentNode.removeChild(ul);
		for(var i = 0; i < inputs.length; i++)
			inputs[i].className = inputs[i].className.replace(' error', '');
	}
});
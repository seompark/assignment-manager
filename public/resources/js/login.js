$(document).ready(function() {
	$('.ui.form').api({
		action: 'login',
		method: 'POST',
		beforeSend: function(setting) {
			removeErrorMessages();
			setting.data = $('.ui.form').form('get values');
			//TODO validate
			return setting;
		},
		onResponse: function(res) {
			removeErrorMessages();
			if(res.success) {
				window.location = '/';
			} else {
				writeError('비밀번호가 일치하지 않습니다.');
			}
		}
	});

	function writeError(message) {
		var elMessage = document.querySelector('.ui.error.message'),
			form = document.querySelector('form.ui.large.form'),
			li = document.createElement('li'),
			ul = document.querySelector('ul.list') || document.createElement('ul');
		ul.className = 'list';
		li.textContent = message;
		ul.appendChild(li);
		elMessage.appendChild(ul);
		setElementError([form]);
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
		var ul = document.querySelector('ul.list');
		if(ul)
			ul.parentNode.removeChild(ul);
	}
});

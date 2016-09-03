var Validator = require('./Validator');

module.exports = (studentNumber, password, callback) {
	let validator = new Validator(studentNumber);
	if(!validator.isAuthenticId()) {
		callback(new Error('유효하지 않은 학번입니다.'));
	} else if(!validator.isAlreadyRegistered()) {
		callback(new Error('이미 존재하는 학번입니다.'));
	} else {
		global.students[studentNumber] = {
			
		};
	}
}

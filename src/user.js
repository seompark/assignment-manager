const path = require('path');
const config = require('../config');

class User {
	constructor(id = '', password = '', name = '') {
		this.store = require('./store').getInstance();
		this._id = this.canonicalizeId(id);
		this._password = password;
		this.name = name;
	}

	static login(id, password) {
		let user = this.store.get(id);
		let loginUser = new User(id, password);
		return user.compare(loginUser);
	}

	register() {
		return new Promise((resolve, reject) => {
			if(this.isRegistered())
				return reject({input:'id', message: '이미 회원가입한 사용자입니다.'});
			if(!this.verifyId())
				return reject({input: 'id', message: '유효하지 않은 학번입니다.'});
			if(!this.verifyPassword())
				return reject({input: 'password', message: '유효하지 않은 비밀번호입니다.'});
			resolve(this.store.set(this.getFullId(), this));
		});
	}

	canonicalizeId(id) {
		return id.length === 4 ? id[0] + '0' + id.slice(1, 4) : id;
	}

	verifyId() {
		return !!this._id.match(/^\d{4,5}$/g); // 정수 4-5자리
	}

	verifyPassword() {
		return this._password.match(/^[^ \t\r\n\v\f]{4,20}$/g); // 공백 미포함 4글자 이상
	}

	getGrade() {
		return this._id[0];
	}

	getClass() {
		return this._id[1] + this._id[2];
	}

	getNumber() {
		return this._id[3] + this._id[4];
	}

	getFullId() {
		return this._id;
	}

	getPassword() {
		return this._password;
	}

	getName() {
		return this.name;
	}

	isRegistered() {
		return !!this.store.get(this._id);
	}

	compare(user) {
		return user.isRegistered() && user.getFullId() === this.getFullId() && user.getPassword() === this.getPassword();
	}

	getData() {
		return {
			'이름': this.name,
			'비밀번호': this.getPassword()
		};
	}

	getFilePath() {
		return path.resolve(__dirname, '..', config.dataFolder, 'file', this.getGrade(), this.getClass(), this.getName());
	}
}

module.exports = User;
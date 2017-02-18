const store = require('./store').getInstance();

class User {
	constructor(id = '', password = '', name = '') {
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
				return reject(new Error('이미 회원가입한 사용자입니다.'));
			if(!this.verifyId())
				return reject(new Error('유효하지 않은 학번입니다.'));
			if(!this.verifyPassword())
				return reject(new Error('유효하지 않은 비밀번호입니다.'));
			resolve(store.set(this.getFullId(), this));
		});
	}

	canonicalizeId(id) {
		return id.length === 4 ? id[0] + '0' + id.slice(1, 4) : id;
	}

	verifyId() {
		return !!this._id.match(/^\d{4,5}$/g);
	}

	verifyPassword() {
		return this._password.match(/^[^ \t\r\n\v\f]{4,20}$/g); // 공백 미포함 4글자 이상
	}

	getGrade() {
		return this._id[0];
	}

	getClass() {
		return this.id[1] + this.id[2];
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
		return !!store.get(this._id);
	}

	compare(user) {
		return user.isRegistered() && user.getFullId() === this.getFullId() && user.getPassword() === this.getPassword();
	}
}

module.exports = User;
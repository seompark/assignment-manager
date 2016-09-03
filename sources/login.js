module.exports = (studentNumber, password) => {
	if(global.students['studentNumber'].password === password) {
		return true;
	} else {
		return false;
	}
}

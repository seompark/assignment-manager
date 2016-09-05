var Validator = require('./Validator');
var save = require('./save');

/**
 * @callback registerCallback
 * @type {?Error}
 */
/**
 * @description 회원가입 함수입니다. 에러시 callback으로 에러를 넘깁니다.
 * @param {string} studentNumber
 * @param {string} name
 * @param {string} password
 * @param {registerCallback} callback
 */
module.exports = (studentNumber, name, password, callback) {
    let validator = new Validator(studentNumber);
    if (!validator.isAllowedLength()) {
        callback(new Error('학번 길이가 올바르지 않습니다.'));
    } else if (!validator.isAlreadyRegistered()) {
        callback(new Error('이미 존재하는 학번입니다.'));
    } else {
        global.students[studentNumber] = {
            name: name,
            password: password
        };
        save.saveStudent();
        callback(null);
    }
};
